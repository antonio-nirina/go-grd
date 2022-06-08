package main

import (
	"log"

	"github.com/thoussei/antonio/server/middlewares"
	"github.com/thoussei/antonio/server/start"
)

func main() {
	svr := start.Server{}
	middlewares.RegisterPrometheusMetrics()
	waitforShutdownInterrupt := svr.Start()
	<-waitforShutdownInterrupt

	log.Println("Shutting Down Server..")
}
