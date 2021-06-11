package routes

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/go-redis/redis/v8"
	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	"github.com/joho/godotenv"
	"github.com/thoussei/antonio/front-office/ws/user/controller"
)

func Route()  {
	err := godotenv.Load()
	
	if err != nil {
		log.Fatal(err)
	}
	
	host := fmt.Sprintf("%s:%s",os.Getenv("HOST_REDIS"),os.Getenv("PORT_REDIS"))
	rdb := redis.NewClient(&redis.Options{Addr: host})
	
	r := mux.NewRouter()
	r.Path("/counter").Methods("GET").HandlerFunc(func(w http.ResponseWriter, r *http.Request){
		controller.NotificationCounter(w,r,rdb)
	})
}