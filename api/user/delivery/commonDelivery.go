package delivery

import (
	"crypto/tls"
	"net/http"
)

var Tr = &http.Transport{
	TLSClientConfig: &tls.Config{
		Renegotiation:      tls.RenegotiateOnceAsClient,
		InsecureSkipVerify: true,
	},
}

type requestGraph struct {}

type DataToken struct {
	AccessToken string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
}

type HTTPClient struct {
	client   *http.Client
}

func InitHttp() *HTTPClient {
	apiClient := &HTTPClient{}
	apiClient.client = http.DefaultClient
	apiClient.client.Transport = Tr

	return apiClient
}