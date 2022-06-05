package handlers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"os"
	"reflect"

	"github.com/gin-gonic/gin"
)

var response Response

func MethodHandler(ctx *gin.Context) {
	var array = make(map[string]interface{})
	var data []map[string]interface{}
	data = append(data, array)
	array["1"] = "Text1"
	array["2"] = "Text2"
	array["3"] = "Text3"
	array["4"] = "Text4"
	response.Code = http.StatusOK
	response.Message = "success"
	response.Data = reflect.ValueOf(data).Interface().(reflect)

	ctx.JSON(response.Code, response)
}

func CheckAndGetTokenDiscord(ctx *gin.Context) (*OauthTokenDiscord, error) {
	response.Code = http.StatusOK
	response.Message = "success"
	response.Data = []interface{}{}
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

	if resp.StatusCode == 200 {
		err = json.Unmarshal(body, res)
		if err != nil {
			Logger(fmt.Sprintf("%v", err))
		}

		ctx.JSON(http.StatusOK, resp)
	}

	ctx.JSON(http.StatusOK, resp)
}
