package main

import (
	"fmt"
	"log"

	"github.com/thoussei/antonio/server/start"
)

func main() {
	svr := start.Server{}
	fmt.Println("Debug!!!!!!!!")
	waitforShutdownInterrupt := svr.Start()
	<-waitforShutdownInterrupt

	log.Println("Shutting Down Server..")
}
