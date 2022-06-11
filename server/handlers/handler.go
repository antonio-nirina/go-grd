package handlers

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"net/url"
	"os"

	"github.com/gin-gonic/gin"
)

var response Response

func SuccessResponse() *Response {
	response.Code = http.StatusOK
	response.Message = "success"
	response.Data = []interface{}{}

	return &response
}

func MethodHandler(ctx *gin.Context) {
	var array = make(map[string]interface{})
	var data []map[string]interface{}
	array["1"] = "Text1"
	array["2"] = "Text2"
	array["3"] = "Text3"
	array["4"] = "Text4"
	data = append(data, array)
	response.Code = http.StatusOK
	response.Message = "success"
	response.Data = data //reflect.ValueOf(data).Interface().(reflect)

	ctx.JSON(response.Code, response)
}

func CheckAndGetTokenDiscord(ctx *gin.Context) {
	response := SuccessResponse()
	httpClient := AccessHttpClient()
	param := url.Values{}
	param.Set("client_id", os.Getenv("DISCORD_CLIENT_ID"))
	param.Add("client_secret", os.Getenv("DISCORD_KEY_SECRET"))
	param.Add("grant_type", "authorization_code")
	param.Add("redirect_uri", os.Getenv("REDIRECT_URI_DISCORD"))

	req, err := http.NewRequest("POST", URI_OAUTH_DISCORD+"oauth2/token", bytes.NewBufferString(param.Encode()))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded; param=value")

	if err != nil {
		response.Code = http.StatusBadRequest
		response.Message = "Error"
		ctx.JSON(response.Code, response)
	}

	resp, err := httpClient.client.Do(req)

	if err != nil {
		ctx.JSON(http.StatusOK, resp)
	}

	res := &OauthTokenDiscord{}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	var access = make(map[string]string)

	if err != nil {
		ErrorResponse(http.StatusInternalServerError, err.Error())
	}

	if resp.StatusCode == 200 {
		err = json.Unmarshal(body, res)
		if err != nil {
			ErrorResponse(http.StatusInternalServerError, err.Error())
		}
		response.Code = resp.StatusCode
		response.Message = "Success"
		access["accessToken"] = res.AccessToken
		response.Data = access
		ctx.JSON(http.StatusOK, response)
	}
	ErrorResponse(resp.StatusCode, "")

	ctx.JSON(http.StatusOK, resp)
}
