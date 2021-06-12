package routes

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/go-redis/redis/v8"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"

	"github.com/rs/cors"
	"github.com/thoussei/antonio/front-office/ws/user/controller"
)

func Route() {
	err := godotenv.Load()
	
	if err != nil {
		log.Fatal(err)
	}
	
	host := fmt.Sprintf("%s:%s",os.Getenv("HOST_REDIS"),os.Getenv("PORT_REDIS"))
	rdb := redis.NewClient(&redis.Options{Addr: host})
	
	r := mux.NewRouter()
	r.HandleFunc("/",func(w http.ResponseWriter, r *http.Request){
		fmt.Println("msg")
		controller.NotificationCounter(w,r,rdb)
	}).Methods("GET")

	c := cors.New(cors.Options{
        AllowedOrigins: []string{"*"},
        AllowCredentials: true,
    })

	handler := c.Handler(r)
    fmt.Println("ready: listening 8080")
	http.ListenAndServe(":8080", handler)
}