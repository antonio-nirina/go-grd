package delivery

import (
	"bytes"
	"crypto/tls"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"

	"github.com/graphql-go/graphql"
	"github.com/joho/godotenv"
	"github.com/thoussei/antonio/main/front-office/api/external"
)

var tr = &http.Transport{
	TLSClientConfig: &tls.Config{
		Renegotiation:      tls.RenegotiateOnceAsClient,
		InsecureSkipVerify: true,
	},
}

type XboxClient struct {
	client   *http.Client
}
type oauthToken struct {
	TokenType string `json:"token_type"`
	ExpiresIn int `json:"expires_in"`
	Scope string `json:"scope"`
	AccessToken string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
	UserId string `json:"user_id"`
}

type authenticate struct {
	RelyingParty string `json:"RelyingParty"`
	TokenType string `json:"TokenType"`
	Properties *properties `json:"Properties"`
}
type properties struct {
	AuthMethod string `json:"AuthMethod"`
	SiteName string `json:"SiteName"`
	RpsTicket string `json:"RpsTicket"`
}

type authenticateXs struct {
	RelyingParty string `json:"RelyingParty"`
	TokenType string `json:"TokenType"`
	Properties *propertiesXs `json:"Properties"`
	SandboxId string `json:"SandboxId"`
}

type propertiesXs struct {
	UserTokens string `json:"UserTokens"`
	SandboxId string `json:"SandboxId"`
}
type DataToken struct {
	AccessToken string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
	UserId string `json:"user_id"`
	User *ResponseUser
}

type userToken struct {
	IssueInstant string `json:"IssueInstant"`
	NotAfter string `json:"NotAfter"`
	Token string `json:"Token"`
	DisplayClaims displayCl `json:"DisplayClaims"`
}
type displayCl struct {
	Xui []uhs  `json:"xui"`
}

type uhs struct {
	Uhs string `json:"uhs"`
}

var xboxClient = &XboxClient{}

func (r *resolver) GetAccessTokenXboxApi(params graphql.ResolveParams) (interface{}, error) {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	if err != nil {
		fmt.Println(err)
	}
	
	xboxClient.client = http.DefaultClient
	xboxClient.client.Transport = tr
	data := url.Values{}
	data.Set("client_id", os.Getenv("ID_CLIENT_XBOX"))
	data.Add("client_secret", os.Getenv("SECRET_XBOX"))
	data.Add("grant_type", "authorization_code")
	data.Add("redirect_uri", os.Getenv(("REDIRECT_URI")))
	data.Add("code", params.Args["code"].(string))

	req, err := http.NewRequest("POST", XboxApi_TOKEN, bytes.NewBufferString(data.Encode()))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded; param=value")

	if err != nil {
		return nil, err
	}

	resp, err := xboxClient.client.Do(req)

	if err != nil {
		return nil, err
	}

	resSuccess := &oauthToken{}
	token := &DataToken{}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	
	if resp.StatusCode == 200 { 
		err = json.Unmarshal(body, resSuccess)
		if err != nil {
			external.Logger(fmt.Sprintf("%v", err))
		}
		
		token.AccessToken 	= resSuccess.AccessToken
		token.RefreshToken 	= resSuccess.RefreshToken
		token.UserId 		= resSuccess.UserId
		fmt.Println("AccessToken", token.AccessToken)
		user,err := GetUserConnectedXbox(token.AccessToken)
		if err != nil {
			external.Logger(fmt.Sprintf("%v", err))
		}

		token.User = user
		// store in Redis
		// json,_ := json.Marshal(token)
		// external.SetDataRedis(KEY_ACCESS_TOKEN,string(json))

		return token,nil
	}
	
	return nil,err
}

func getUserMicrosoft(accessToken string) {
	
}

/*
	Use For Xbox Token
	TODO
*/
func getTokenUser(accessToken string)(string,error) {
	pr := &properties{
		AuthMethod:"RPS",
		SiteName:"user.auth.xboxlive.com",
		RpsTicket:"d="+accessToken,
	}
	payload := &authenticate{
		RelyingParty:"http://auth.xboxlive.com",
		TokenType:"JWT",
		Properties: pr, 
	}
	reqBodyBytes := new(bytes.Buffer)
	json.NewEncoder(reqBodyBytes).Encode(payload)
	req, err := http.NewRequest("POST", XboxApi_URL, reqBodyBytes)
	req.Header.Set("x-xbl-contract-version","1")
	req.Header.Set("Content-Type", "application/json")
	if err != nil {
		return "",err
	}

	resp, err := xboxClient.client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)

	if resp.StatusCode == 200 {
		uToken := &userToken{}
		err = json.Unmarshal(body, uToken)
		if err != nil {
			external.Logger(fmt.Sprintf("%v", err))
		}
		return uToken.Token, nil
	}
	
	return "", err
}

func getXsTokenXbox(tokenUser string)(string,error) {
	fmt.Println("tokenUser", tokenUser)
	prUser := &propertiesXs{
		UserTokens: tokenUser,
		SandboxId:"RETAIL",
	}
	payload := &authenticateXs{
		RelyingParty:"http://xboxlive.com",
		TokenType:"JWT",
		Properties: prUser, 
	}
	reqBodyBytes := new(bytes.Buffer)
	json.NewEncoder(reqBodyBytes).Encode(payload)
	req, err := http.NewRequest("POST", XboxApi_Xst, reqBodyBytes)
	req.Header.Set("x-xbl-contract-version","1")
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Accept", "application/json")

	if err != nil {
		return "",err
	}

	resp, err := xboxClient.client.Do(req)
	if err != nil {
		return "", err
	}

	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	fmt.Println("resp...", resp)
	fmt.Println(string(body))

	return "",nil
}

/*
	string to json
	str := `{"page": 1, "fruits": ["apple", "peach"]}`
    res := response2{}
    json.Unmarshal([]byte(str), &res)
    fmt.Println(res)

*/