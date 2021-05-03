package delivery

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"
	"strings"

	"github.com/graphql-go/graphql"
	"github.com/joho/godotenv"
	"github.com/thoussei/antonio/main/front-office/api/external"
)

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
	RelyingParty string `json:"pelying_party"`
	TokenType string `json:"token_type"`
	Properties *properties `json:"properties"`
}
type properties struct {
	AuthMethod string `json:"auth_method"`
	SiteName string `json:"site_name"`
	RpsTicket string `json:"rps_ticket"`
}

type DataToken struct {
	AccessToken string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
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
	getTokenUser()
	if !strings.Contains(string(body), "error") { 
		err = json.Unmarshal(body, resSuccess)
		if err != nil {
			external.Logger(fmt.Sprintf("%v", err))
		}
		// getTokenUser(resSuccess.AccessToken)
		token.AccessToken = resSuccess.AccessToken
		token.RefreshToken = resSuccess.RefreshToken
		// store in Redis
		// json,_ := json.Marshal(token)
		// external.SetDataRedis(KEY_ACCESS_TOKEN,string(json))
	}
	
	return string(body),nil
}

func getTokenUser()(interface{},error) {

	pr := &properties{
		AuthMethod:"RPS",
		SiteName:"user.auth.xboxlive.com",
		RpsTicket:"EwAoA+pvBAAUKods63Ys1fGlwiccIFJ+qE1hANsAAfgG8tEuzbaOLqKES7RMvK0cxxhNnMAhGSiajIAeb22JWvDC9n4UAJjIFJdzzbMtIjioaVZNrO4KeGwbYe7n6Bxzk5ZkhIUA1/h3AK/xfjRahdIVuTpsoRnOoed+NCuiDnoR8Adqj03EHvXDMQl9JCynSXQ10PgTm2ET1mBFTBefeehMS4Q9q27pG0+mS3CVryjsIJwNQj774YhDVBNnbX7ZgTGzKaoOBxkSkhJECeAVmrKan++wXKsj+jLY6j9ieBfz1ER0czL8o2H81068lnkzimyKXWWguN2eN/bBqzZPnCuwyQ/0Q2y1vOh0/VrpvU4dNtEQnk7YfEplSvbUsE0DZgAACBJX9/QtfoAw+AEek1qz9L9jhM73jOSbCNIIwcBu+me9xOLcerpNqA3HAYkMWHLvzoKpfRCK72R17nI+t45eusXAwG3qiedfBlcykKYdJOdYm0e49vPIrcC+nZUC2Q5/i1hlfo35YxBaOXkOrFSqzl2JmgO1tdTgVDdGUy0dOf11HmUTgXCSIt7cXwKXuFjLDAF+VBcNjR/WnNizL6QzyJWF5mxwC3dA82f5k8SAD1AOGFxRYFCBtxrvmzPRWzB6/MgJ4NmJdC3fQxMcNCis1KSKevcbfX3ispEmDRIicWEEXm333y9a8Yx6FxffIo1ibRDJYHnOkOnpWsEel/dUL01oRmfLKG896g54oiq0kMDRFS+SD8fd6aTm2kMhLXS/osH2C8TLRNGJPW0kmrKo3wIpLCpEXeT0n91eypGFZ+PXtmEAhxGkeh8td5o9Qeq94+x9xIGuV/QiC+uFq/Fc/mTqcKckpq4N+a2yQO39r3HDoWMsrPq1i6fhai86PweEW3zgB9NaluHAYLJj3Ce7mOINDNelUbGVIID9Qw1evzGILDRZ6vRZYyAKAUcdGN/IBF4gjxuVomNbp9nPPcaoK/LyMOND4EmFguW5Np8h2BlElYKN/nUBo1Qj8bybHjRxgvF+gDgXgDPf+M2Uqbum8CDnqxtEUG44VcWqFh5HKYtW91UuAg==",
	}
	payload := &authenticate{
		RelyingParty:"http://auth.xboxlive.com",
		TokenType:"JWT",
		Properties: pr, 
	}
	reqBodyBytes := new(bytes.Buffer)
	json.NewEncoder(reqBodyBytes).Encode(payload)
	req, err := http.NewRequest("POST", XboxApi_URL, reqBodyBytes)

	if err != nil {
		return nil,err
	}
	
	resp, err := xboxClient.client.Do(req)
	if err != nil {
		fmt.Println(err)
	}
	defer resp.Body.Close()
	fmt.Println("rrrrrr", resp)
	body, err := ioutil.ReadAll(resp.Body)
	fmt.Println("token_user", string(body))

	return string(body),nil
}

/*
	string to json
	str := `{"page": 1, "fruits": ["apple", "peach"]}`
    res := response2{}
    json.Unmarshal([]byte(str), &res)
    fmt.Println(res)

*/