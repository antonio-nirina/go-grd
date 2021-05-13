/*
	CALL API GRAPH Microsoft
	https://docs.microsoft.com/en-us/graph/auth-v2-user?view=graph-rest-beta
*/

package delivery

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/thoussei/antonio/main/front-office/api/external"
)

type requestGraph struct {}

type ResponseUserApi struct {
	DataContext string `json:"@odata.context"`
	DisplayName string `json:"displayName,omitempty"`
	Surname string `json:"surname,omitempty"`
	GivenName string `json:"givenName,omitempty"`
	Id string `json:"id"`
	UserPrincipalName string `json:"userPrincipalName,omitempty"`
	BusinessPhones []string `json:"businessPhones,omitempty"`
	JobTitle string `json:"jobTitle,omitempty"`
	Mail string `json:"mail,omitempty"`
	MobilePhone string `json:"mobilePhone,omitempty"`
	OfficeLocation string `json:"officeLocation,omitempty"`
	PreferredLanguage string `json:"preferredLanguage,omitempty"`

}
var response = &ResponseUserApi{}
func GetUserConnectedXbox(accessToken string)(*ResponseUserApi,error) {
	payload := &requestGraph{}
	reqBodyBytes := new(bytes.Buffer)
	json.NewEncoder(reqBodyBytes).Encode(payload)
	req, err := http.NewRequest("GET", ME_URL, reqBodyBytes)
	req.Header.Set("Authorization",accessToken)
	req.Header.Set("Content-Type", "application/json")
	if err != nil {
		return nil,err
	}

	resp, err := xboxClient.client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)

	if resp.StatusCode == 200 {
		err = json.Unmarshal(body, response)
		if err != nil {
			external.Logger(fmt.Sprintf("%v", err))
		}
	}

	return response, nil
}



