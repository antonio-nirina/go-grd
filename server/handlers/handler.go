package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func MethodHandler(ctx *gin.Context) {
	ctx.String(http.StatusOK, "Hello")
}
