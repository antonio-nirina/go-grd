package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/thoussei/antonio/server/handlers"
)

func RegisterRoutingApp()  *gin.RouterGroup{
	router := gin.Default()
	api := router.Group("/api")
	api.GET("/", handlers.MethodHandler(*gin.Context))
	
	return api
}