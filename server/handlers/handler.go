package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	c *gin.Context
}

func MethodHandler(c *gin.Context) func(c *gin.Context)() {
	return c.String(http.StatusOK,"Hello")
}