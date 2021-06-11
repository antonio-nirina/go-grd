package controller

import (
	"fmt"
	"net/http"

	"github.com/go-redis/redis/v8"
	"github.com/gorilla/websocket"
)

type msg struct {
	Content string `json:"content,omitempty"`
	Channel string `json:"channel,omitempty"`
	Command int    `json:"command,omitempty"`
}


func NotificationCounter(w http.ResponseWriter, r *http.Request, rdb *redis.Client,conn *websocket.Conn) {
	msg := msg{
		Content: "test",
		Channel: "test",
	}

	if err := conn.WriteJSON(msg); err != nil {
		fmt.Println(err)
	}
}