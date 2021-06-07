package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/gorilla/websocket"
	"github.com/graphql-go/graphql"
	"github.com/graphql-go/handler"
	"github.com/thoussei/antonio/main/front-office/api/external"
	"github.com/thoussei/antonio/main/front-office/api/graphql/mutation"
	"github.com/thoussei/antonio/main/front-office/api/graphql/queries"
)

var counter int

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
	Subprotocols: []string{"graphql-ws"},
}

type ConnectionACKMessage struct {
	OperationID string `json:"id,omitempty"`
	Type        string `json:"type"`
	Payload     struct {
		Query string `json:"query"`
	} `json:"payload,omitempty"`
}

type Subscriber struct {
	ID            int
	Conn          *websocket.Conn
	RequestString string
	OperationID   string
}

var subscribers sync.Map

func main() {
	schemaConfig := graphql.SchemaConfig{
		Query: graphql.NewObject(graphql.ObjectConfig{
			Name:   "Query",
			Fields: queries.GetRootFields(),
		}),
		Mutation: graphql.NewObject(graphql.ObjectConfig{
			Name:   "Mutation",
			Fields: mutation.GetRootFields(),
		}),
		Subscription: graphql.NewObject(graphql.ObjectConfig{
            Name: "Subscription",
            Fields: graphql.Fields{
                "subscribeCounter": &graphql.Field{
                    Type: graphql.Int,
                    Resolve: func(p graphql.ResolveParams) (interface{}, error) {
						return counter, nil
					},
                },
            },
        }),
	}
	schema, err := graphql.NewSchema(schemaConfig)

	if err != nil {
		message := fmt.Sprintf("Failed to create new schema, error: %v", err)
		external.Logger(message)
	}

	httpHandler := handler.New(&handler.Config{
		Schema:   &schema,
		Pretty:   true,
		GraphiQL: true,
		// FormatErrorFn: ,
	})

	http.Handle("/", external.Handle(httpHandler))
	http.HandleFunc("/subscriptions", func(w http.ResponseWriter, r *http.Request) {
		conn, err := upgrader.Upgrade(w, r, nil)
		if err != nil {
			log.Printf("failed to do websocket upgrade: %v", err)
			return
		}
		connectionACK, err := json.Marshal(map[string]string{
			"type": "connection_ack",
		})

		if err != nil {
			log.Printf("failed to marshal ws connection ack: %v", err)
		}
		if err := conn.WriteMessage(websocket.TextMessage, connectionACK); err != nil {
			log.Printf("failed to write to ws connection: %v", err)
			return
		}
	})
	go func() {
		for {
			time.Sleep(1 * time.Second)
			counter ++
			subscribers.Range(func(key, value interface{}) bool {
				subscriber, ok := value.(*Subscriber)
				if !ok {
					return true
				}
				payload := graphql.Do(graphql.Params{
					Schema:        schema,
					RequestString: subscriber.RequestString,
				})
				message, err := json.Marshal(map[string]interface{}{
					"type":    "data",
					"id":      subscriber.OperationID,
					"payload": payload,
				})
				if err != nil {
					log.Printf("failed to marshal message: %v", err)
					return true
				}
				if err := subscriber.Conn.WriteMessage(websocket.TextMessage, message); err != nil {
					if err == websocket.ErrCloseSent {
						subscribers.Delete(key)
						return true
					}
					log.Printf("failed to write to ws connection: %v", err)
					return true
				}
				return true
			})
		}
	}()
	fmt.Println("ready: listening 4000")
	http.ListenAndServe(":4000", nil)
}
