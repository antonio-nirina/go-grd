package main

import (
	"fmt"
	"net/http"

	"github.com/thoussei/antonio/front-office/ws/interface/routes"
)


func main() {	
	routes.Route()

	fmt.Println("ready: listening 8080")
	http.ListenAndServe(":8080", nil)
}