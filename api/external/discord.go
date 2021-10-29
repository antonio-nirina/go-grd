package external

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"os"
)

const URI_OAUTH_DISCORD = "https://discord.com/api/v8/"

type oauthTokenDiscord struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
	// TokenType    string `json:"token_type"`
	// Scope        string `json:"scope"`
	ExpiresIn int `json:"expires_in"`
}

type dataDiscord struct {
	ClientId     string `json:"client_id"`
	ClientSecret string `json:"client_secret"`
	GrantType    string `json:"grant_type"`
	Code         string `json:"code"`
	RedirectUri  string `json:"redirect_uri"`
}

type dataUserResponseDiscord struct {
	Id            string `json:"id"`
	Username      string `json:"username"`
	Discriminator string `json:"discriminator"`
	Avatar        string `json:"avatar"`
	Verified      string `json:"verified"`
	Email         string `json:"email"`
	Flags         int    `json:"flags"`
	Banner        string `json:"banner"`
	AccentColor   int    `json:"accent_color"`
	PremiumType   int    `json:"premium_type"`
	PublicFlags   int    `json:"public_flags"`
}

func GetAccessTokenAndRefreshDiscord(code string, refreshToken string, isRefressh bool) (*oauthTokenDiscord, error) {
	authorize := "authorization_code"
	if isRefressh {
		authorize = "refresh_token"
	}
	httpClient := AccesstHttp()
	data := url.Values{}
	data.Set("client_id", os.Getenv("DISCORD_CLIENT_ID"))
	data.Add("client_secret", os.Getenv("DISCORD_KEY_SECRET"))
	data.Add("grant_type", authorize)
	data.Add("redirect_uri", os.Getenv("REDIRECT_URI_DISCORD"))

	if isRefressh && refreshToken != "" {
		data.Add("refresh_token", refreshToken)
	} else {
		data.Add("code", code)
	}

	/*dataDiscordVal := dataDiscord{
		ClientId: os.Getenv("DISCORD_CLIENT_ID"),
		ClientSecret: os.Getenv("DISCORD_KEY_SECRET"),
		GrantType: "authorization_code",
		Code: params.Args["code"].(string),
		RedirectUri: os.Getenv("REDIRECT_URI_DISCORD"),
	}
	jsonData := map[string]string{
		"data": queryN,
	}*/

	req, err := http.NewRequest("POST", URI_OAUTH_DISCORD+"oauth2/authorize", bytes.NewBufferString(data.Encode()))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded; param=value")

	if err != nil {
		return nil, err
	}

	resp, err := httpClient.client.Do(req)

	if err != nil {
		return nil, err
	}

	res := &oauthTokenDiscord{}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)

	if resp.StatusCode == 200 {
		err = json.Unmarshal(body, res)
		if err != nil {
			Logger(fmt.Sprintf("%v", err))
		}

		return res, nil
	}

	return res, nil
}

func GetUserConnectedDiscord(accesToken string) (*dataUserResponseDiscord, error) {
	httpClient := AccesstHttp()
	req, err := http.NewRequest("GET", URI_OAUTH_DISCORD+"users/@me", nil)

	if err != nil {
		return nil, err
	}

	resp, err := httpClient.client.Do(req)

	if err != nil {
		return nil, err
	}

	res := &dataUserResponseDiscord{}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)

	if resp.StatusCode == 200 {
		err = json.Unmarshal(body, res)
		if err != nil {
			Logger(fmt.Sprintf("%v", err))
		}

		return res, nil
	}

	return res, nil
}
