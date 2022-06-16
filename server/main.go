package main

import (
	"log"

	"github.com/thoussei/antonio/server/client"
	"github.com/thoussei/antonio/server/middlewares"
	"github.com/thoussei/antonio/server/start"
)

func main() {
	client.SetDataRedis("key", "value")
	client.GetDataRedis("key")
	svr := start.Server{}
	middlewares.RegisterPrometheusMetrics()
	waitforShutdownInterrupt := svr.Start()
	<-waitforShutdownInterrupt

	log.Println("Shutting Down Server...")
}
