package start

import (
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
	s.route = routes.RegisterRoutingApp()
}

func (s *Server) Start() <-chan os.Signal {
	s.setup()
	InitAppGin()
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		s.route.Run(":9090")
	}()
	return quit
}
