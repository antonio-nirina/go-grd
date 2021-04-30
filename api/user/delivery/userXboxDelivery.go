package delivery

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/graphql-go/graphql"
)

// dwalsh83
const XboxApi_URL = "https://user.auth.xboxlive.com/user/authenticate"
const XboxApi_Xst = "https://xsts.auth.xboxlive.com/xsts/authorize"
const XboxApi_Profil = "https://profile.xboxlive.com/users/gamertag/profile/settings"

type XboxClient struct {
	client   *http.Client
	code 	string
}


func (r *resolver) GetAccessTokenXboxApi(params graphql.ResolveParams) (interface{}, error) {
	var payload interface{}
	xboxClient := &XboxClient{
		client: http.DefaultClient,
		code: params.Args["code"].(string),
	}
	reqBodyBytes := new(bytes.Buffer)
	json.NewEncoder(reqBodyBytes).Encode(payload)
	req, err := http.NewRequest("GET", XboxApi_URL, reqBodyBytes)

	if err != nil {
		return nil, err
	}

	req.Header.Set("Content-Type", "application/json")

	resp, err := xboxClient.client.Do(req)

	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	fmt.Println(body)
	
	return"",nil
}