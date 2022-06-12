package handlers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/thoussei/antonio/server/models"
)

func CreateAdminTournament(ctx *gin.Context) {
	jsonData, _ := ioutil.ReadAll(ctx.Request.Body)
	fmt.Println("jsonData", string(jsonData))
	var tournament models.TournamentDto
	err := json.Unmarshal(jsonData, &tournament)
	if err != nil {
		ErrorResponse(http.StatusBadRequest, err.Error())
	}
	var array = make(map[string]interface{})
	var data []map[string]interface{}
	array["1"] = "Text1"
	array["2"] = "Text2"
	data = append(data, array)
	response.Code = http.StatusOK
	response.Message = "success"
	response.Data = data

	ctx.JSON(response.Code, response)
}
