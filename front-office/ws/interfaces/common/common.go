package common

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/websocket"
)

type msgError struct {
	Err     string `json:"err,omitempty"`
}

func HandleWSError(err error, conn *websocket.Conn) {
	msg := msgError{}
	msg.Err = err.Error()
	_ = conn.WriteJSON(msg)
}

func SuccessJSon(w http.ResponseWriter, payload interface{}) {
	response, err := json.Marshal(payload)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(response))
}