package start

import (
	"fmt"
	"os"
	"os/signal"
	"syscall"

	"github.com/gin-gonic/gin"
	"github.com/thoussei/antonio/server/routes"
)

type Server struct {
	route *gin.Engine
}

func (s *Server) setup() {
	InitAppGin()
	s.route = routes.RegisterRoutingApp()
}

func (s *Server) Start() <-chan os.Signal {
	s.setup()
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, syscall.SIGINT, syscall.SIGTERM)
	fmt.Println("eeeeeee")
	go func() {
		s.route.Run(":9090")
	}()
	return quit
}
