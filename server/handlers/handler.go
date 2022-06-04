package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func MethodHandler(ctx *gin.Context) {
	var resp Response
	var array = make(map[string]interface{})
	var data []map[string]interface{}
	data = append(data, array)
	array["1"] = "Text1"
	array["2"] = "Text2"
	array["3"] = "Text3"
	array["4"] = "Text4"
	resp.Code = 200
	resp.Message = "success"
	resp.Data = data

	ctx.JSON(http.StatusOK, resp)
}
