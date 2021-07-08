package delivery

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"os"

	"github.com/graphql-go/graphql"
	"github.com/joho/godotenv"
	"github.com/thoussei/antonio/api/external"
	"github.com/thoussei/antonio/api/user/entity"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type oauthTokenTwitch struct {
	TokenType string `json:"token_type"`
	ExpiresIn int `json:"expires_in"`
	Scope string `json:"scope"`
	AccessToken string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
}

type userTwitchApi struct {
	Id string `json:"_id"`
	Bio string `json:"bio"`
	CreatedAt string `json:"created_at"`
	DisplayName string `json:"display_name"`
	Email string `json:"email"`
	EmailVerified bool `json:"email_verified"`
	Logo string `json:"logo"`
	Name string `json:"name"`
	Notifications notificationTwitchApi
	Partnered string `json:"partnered"`
	TwitterConnected string `json:"twitter_connected"`
	Type string `json:"type"`
	UpdatedAt string `json:"updated_at"`
}

type notificationTwitchApi struct {
	Email bool `json:"email"`
	Push bool `json:"push"`
}


func (r *resolver) GetAccessTokenTwitchApi(params graphql.ResolveParams) (interface{}, error) {
	err := godotenv.Load()
	if err != nil {
		external.Logger("Error loading .env file")
	}

	// commonDelevery
	htppClient := InitHttp()
	data := url.Values{}
	data.Set("client_id", os.Getenv("CLIENT_ID_TWITCH"))
	data.Add("client_secret", os.Getenv("CLIENT_SECRET_TWITCH"))
	data.Add("grant_type", "authorization_code")
	data.Add("redirect_uri", os.Getenv(("REDIRECT_URI_TWITCH")))
	data.Add("code", params.Args["code"].(string))

	req, err := http.NewRequest("POST", TWITCH_TOKEN, bytes.NewBufferString(data.Encode()))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded; param=value")

	if err != nil {
		return nil, err
	}

	resp, err := htppClient.client.Do(req)

	if err != nil {
		return nil, err
	}

	resSuccess := &oauthTokenTwitch{}
	// commonDelevery
	token := &DataToken{}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	
	if resp.StatusCode == 200 { 
		userTwitch := &userTwitchApi{}
		err = json.Unmarshal(body, resSuccess)
		if err != nil {
			external.Logger(fmt.Sprintf("%v", err))
		}
		
		token.AccessToken 	= resSuccess.AccessToken
		token.RefreshToken 	= resSuccess.RefreshToken
		payload := &requestGraph{}
		reqBodyBytes := new(bytes.Buffer)
		json.NewEncoder(reqBodyBytes).Encode(payload)
		reqUser, err := http.NewRequest("GET", TWITCH_TOKEN_USER, reqBodyBytes)
		reqUser.Header.Set("Authorization","Bearer "+resSuccess.AccessToken)
		reqUser.Header.Set("Content-Type", "application/json")

		if err != nil {
			return nil,err
		}

		respUser, err := htppClient.client.Do(reqUser)

		if err != nil {
			return nil, err
		}

		defer respUser.Body.Close()
		twitchBody, err := ioutil.ReadAll(respUser.Body)
		err = json.Unmarshal(twitchBody, userTwitch)

		if err != nil {
			external.Logger(fmt.Sprintf("%v", err))
		}
		
		user, _ := r.userHandler.FindUserByEmail(params.Args["email"].(string))
		accounts := entity.Accounts{
			Uid:primitive.NewObjectID(),
			Id:userTwitch.Id,
			Name:"Twitch",
			Profil:userTwitch.DisplayName,
			Logo:userTwitch.Logo,
		}
		user.Accounts = append(user.Accounts, accounts)
		_, err = r.userHandler.UpdatedUser(&user)
	}

	return resSuccess,nil
}