package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/thoussei/antonio/server/handlers"
	"gorm.io/gorm"
)

func RegisterRoutingApp(database *gorm.DB) *gin.Engine {
	router := gin.Default()
	router.GET("/code", handlers.CheckAndGetTokenDiscord)
	// Group route /api
	api := router.Group("/api")
	api.GET("/", handlers.MethodHandler)
	api.GET("/tournament", handlers.GetListTournamentActif)
	api.POST("/tournament/subscribe", handlers.SuscribeTournament)
	api.POST("/tournament/notification", handlers.SendNotificationTournamentIncrease)
	api.POST("/tournament/match/counter", handlers.RunCounterMatch)
	api.POST("/tournament/participate/watcher", handlers.WatcherPartTournament)
	api.POST("/admin/tournament", handlers.CreateAdminTournament)

	return router
}
