package handlers

import (
	"github.com/gin-gonic/gin"
)

func GetListTournamentActif(ctx *gin.Context) {
	response := SuccessResponse()
	ctx.JSON(response.Code, response.Data)
}

func SuscribeTournament(ctx *gin.Context) {
	response := SuccessResponse()

	ctx.JSON(response.Code, response.Data)
}

func SendNotificationTournamentIncrease(ctx *gin.Context) {
	response := SuccessResponse()

	ctx.JSON(response.Code, response.Data)
}

func RunCounterMatch(ctx *gin.Context) {
	response := SuccessResponse()

	ctx.JSON(response.Code, response.Data)
}

func WatcherPartTournament(ctx *gin.Context) {
	response := SuccessResponse()

	ctx.JSON(response.Code, response.Data)
}
