package main

import (
	"log"

	"github.com/thoussei/antonio/server/start"
)


func main() {
	svr := &start.Server{
		route: start.InitAppGin,
	}

	waitforShutdownInterrupt := svr.Start()
	<-waitforShutdownInterrupt

	log.Println("Shutting Down Server..")
}