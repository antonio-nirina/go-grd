package handlers

import (
	"github.com/thoussei/antonio/server/log"
)

// Response Type
type Response struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
	Data    interface{}
}

func ErrorResponse(code int, message string) Response {
	var response Response
	response.Code = code
	response.Message = message
	response.Data = []interface{}{}
	log.LogFormater(message)
	return response
}
