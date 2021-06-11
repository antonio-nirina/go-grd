package main

import (
	"fmt"
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
	"github.com/graphql-go/graphql"
	"github.com/graphql-go/handler"
	"github.com/thoussei/antonio/main/front-office/api/external"
	"github.com/thoussei/antonio/main/front-office/api/graphql/mutation"
	"github.com/thoussei/antonio/main/front-office/api/graphql/queries"
)

type Post struct {
	ID    int `json:"id"`
	Likes int `json:"count"`
}

type counter struct {
	Key int
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

var CountType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Count",
	Fields: graphql.Fields{
		"key": &graphql.Field{
			Type: graphql.Int,
		},
	},
})

var subscribers sync.Map

func main() {
	/*var upgrader = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
		Subprotocols: []string{"graphql-ws"},
	}*/

	var count = &counter{}
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
                    Type: CountType,
                    Resolve: func(p graphql.ResolveParams) (interface{}, error) {
                    	fmt.Println(count)
						return count, nil
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
		Schema:     &schema,
		Pretty:     true,
		GraphiQL:   false,
		Playground: true,
		// FormatErrorFn: ,
	})

	http.Handle("/", external.Handle(httpHandler))
	http.HandleFunc("/subscriptions",func(w http.ResponseWriter, r *http.Request){
		external.WebsocketHandler(w,r,schema)
	}) 
	/*http.HandleFunc("/subscriptions", func(w http.ResponseWriter, r *http.Request) {
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
		go func() {
			for {
				_, p, err := conn.ReadMessage()
				if websocket.IsCloseError(err, websocket.CloseGoingAway) {
					return
				}
				if err != nil {
					log.Println("failed to read websocket message: %v", err)
					return
				}
				var msg ConnectionACKMessage
				if err := json.Unmarshal(p, &msg); err != nil {
					log.Printf("failed to unmarshal: %v", err)
					return
				}
				if msg.Type == "start" {
					length := 0
					subscribers.Range(func(key, value interface{}) bool {
						length++
						return true
					})
					var subscriber = Subscriber{
						ID:            length + 1,
						Conn:          conn,
						RequestString: msg.Payload.Query,
						OperationID:   msg.OperationID,
					}
					subscribers.Store(subscriber.ID, &subscriber)
				}
			}
		}()
	})
	go func() {
		for {
			time.Sleep(1 * time.Second)
			count.Key = count.Key + 1
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
	}()*/
	fmt.Println("ready: listening 4000")
	http.ListenAndServe(":4000", nil)
}
// http.HandleFunc("/subscriptions",func(w http.ResponseWriter, r *http.Request){
//		external.WebsocketHandler(w,r,schema)
//	}) 