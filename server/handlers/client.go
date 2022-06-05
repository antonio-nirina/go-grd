package handlers

import (
	"crypto/tls"
	"net/http"
)

var tr = &http.Transport{
	TLSClientConfig: &tls.Config{
		Renegotiation:      tls.RenegotiateOnceAsClient,
		InsecureSkipVerify: true,
	},
}

type HttpClient struct {
	client *http.Client
}

func AccessHttpClient() *HttpClient {
	apiClient := &HttpClient{}
	apiClient.client = http.DefaultClient
	apiClient.client.Transport = tr

	return apiClient
}
