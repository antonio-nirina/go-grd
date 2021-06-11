package common
 
import(
	"github.com/gorilla/websocket"
)


func HandleWSError(err error, conn *websocket.Conn) {
	_ = conn.WriteJSON(msg{Err: err.Error()})
}