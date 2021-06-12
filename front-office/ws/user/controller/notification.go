package controller

import (
	"fmt"
	"net/http"
	"time"

	"github.com/go-redis/redis/v8"
	"github.com/gorilla/websocket"
	// "github.com/thoussei/antonio/front-office/ws/interfaces/common"
)

var upgrader websocket.Upgrader
type msg struct {
	Content string `json:"content,omitempty"`
	Channel string `json:"channel,omitempty"`
	Command int    `json:"command,omitempty"`
}

type counter struct {
	Key int `json:"key,omitempty"`
}
var count = counter{}

func NotificationCounter(w http.ResponseWriter, r *http.Request, rdb *redis.Client) {
	fmt.Println("msg",rdb)
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println("Error during message reading init:", err)
		return
	}
	key := 0 
	/*msg := msg{
		Content: "test",
		Channel: "test",
	}*/

	for {
		time.Sleep(1 * time.Second)
		count.Key = key +1 
		
		if err := conn.WriteJSON(count); err != nil {
			fmt.Println("Error during message reading sec:", err)
			return
		}
	}

	
}
/*
var count = &counter{}
for {
	time.Sleep(1 * time.Second)
	count.Key = count.Key + 1
}
*/