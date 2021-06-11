package external

import (
	"encoding/json"
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/gorilla/websocket"
	"github.com/graphql-go/graphql"
)

type Subscriber struct {
	ID            int
	Conn          *websocket.Conn
	RequestString string
	OperationID   string
}

type ConnectionACKMessage struct {
	OperationID string `json:"id,omitempty"`
	Type        string `json:"type"`
	Payload     struct { Query string `json:"query"`} `json:"payload,omitempty"`
}



type Counter struct {
	Key int
}

var subscribers sync.Map
var count = &Counter{}

func WebsocketHandler(w http.ResponseWriter, r *http.Request,schema graphql.Schema){
	var upgrader = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
		Subprotocols: []string{"graphql-ws"},
	}
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
				log.Printf("failed to read websocket message: %v", err)
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
	}()
}