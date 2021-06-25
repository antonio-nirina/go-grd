package external

import (
	"sync"

	// "time"

	"github.com/gorilla/websocket"
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
