package handlers

import (
	"github.com/gin-gonic/gin"
)

func GetListTournamentActif(ctx *gin.Context) {
	response := SuccessResponse()

	ctx.JSON(response.Code, response.Data)
}
