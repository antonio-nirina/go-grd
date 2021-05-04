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

type DataToken struct {
	AccessToken string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
	TokenUsers string `json:"token_users"`
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
		respToken, err := getTokenUser(resSuccess.AccessToken)
		
		if err != nil {
			external.Logger(fmt.Sprintf("%v", err))
		}

		token.AccessToken = resSuccess.AccessToken
		token.RefreshToken = resSuccess.RefreshToken
		token.TokenUsers = respToken
		// store in Redis
		// json,_ := json.Marshal(token)
		// external.SetDataRedis(KEY_ACCESS_TOKEN,string(json))

		return token,nil
	}
	
	return nil,err
}

func getTokenUser(accessToken string)(string,error) {
	pr := &properties{
		AuthMethod:"RPS",
		SiteName:"user.auth.xboxlive.com",
		RpsTicket:"d="+accessToken, //"d=EwAoA+pvBAAUKods63Ys1fGlwiccIFJ+qE1hANsAAepnxGGvhrADN72N0j5B5q56UeCA3uUGZoXKsseZ9A9eyDjIFH30NXmFJ0HRVuGtmSJ78IBxqNXVKj61r1xRP5TDkD/YNaU7k+2fZJMy7UMp6jyI18UsKl2dEf3oQs2SCwiTatYYKEdrYoNn7j49lWPx13ktALqJ1ozZdJ8n4yuzI0UnDqBRWHCFcLrwcorZNvNjz9qWk23FqSYh+wBpzTXpPvVKZxiSF+hy6ZgziJtra8jm9SIQnld7a5Iv1F83nuF6ETj/SNtz3KE83BPpmOtSZ5i7rmhE9v5QqccTb/2HXnzW8Sf2nmbDrMhy8C7YNgNg2B0MwmNvsYS7W4kY+H0DZgAACMzwc/odB7Xz+AFHY4NdvoGywMvaNFpMZF22ET3nUjltR3T7ATKAR3nIpp5vP5Rq9NpBen5iBIphed1H+Gu2Q7G2jnOvtw7KvT3CzhS9YRmVc5/W96/4IIX/UltGCd0sKikg985Btk3bp1hXgEqzYCSBcjCR5Zu+BjSWMkw8Of/4MG2HwXF8MRjemGzHQeK7tnBYNZRHzbLSzRVhE631GWHVMafK1U/NXnW1Txc8Z8Zv++WH5bt14r4beFdeEVc3q4pv88/iRnAxu3TRCyvXwQdW40jRzoB6gS1iHR+2WlVf7ltfIJ3F1ujljSuwzHwW/uZxzLcQoobI9isna6lDW2cxFBLOp/+2Aj/PlvCd+Y6lmnbaazSl2JDbJTS3+NptfwY4NKDX3p/L+GCS8TlGfv/v0iutBt4UUQS2E9CSE9mKsl5swWQio7BtKdmoXQevExbiuk1l8Ly8TeOI4iBWNLMKoaVAt87a7lN7DA1wn2K1wx4iKFXGsOjyV4Jh/jRR2igV3Q3E7iWXaMkr9b9iJBzvIsUkbe1HLq7oHxyJNkr1CvT/HHB6RRGbfMSaUJq0qpAYpDMhXLZ5DNc9VOb4+DGBDeOGf1E8GS6y8+ZIAdaPfLrhg6V/UUJ53N3kJVnptj70w74njbc84D5v6gR4i3ol6yiY3seDgXH1kWJyaDXojsEuAg==",
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

/*
	string to json
	str := `{"page": 1, "fruits": ["apple", "peach"]}`
    res := response2{}
    json.Unmarshal([]byte(str), &res)
    fmt.Println(res)

*/