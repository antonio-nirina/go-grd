package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/thoussei/antonio/server/handlers"
)

func RegisterRoutingApp() *gin.Engine {
	router := gin.Default()
	api := router.Group("/api")
	api.GET("/", handlers.MethodHandler)

	return router
}
