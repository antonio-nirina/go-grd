package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/thoussei/antonio/server/handlers"
)

func RegisterRoutingApp() *gin.Engine {
	router := gin.Default()
	router.GET("/code", handlers.CheckAndGetTokenDiscord)
	// Group route /api
	api := router.Group("/api")
	api.GET("/", handlers.MethodHandler)
	api.GET("/tournament", handlers.GetListTournamentActif)

	return router
}
