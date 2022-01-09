package external

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"time"
)

func ClientHttpWs(jsonData map[string]string) {
	uri := os.Getenv("URI_SUBSCRIPTION")
	jsonValue, _ := json.Marshal(jsonData)
	request, err := http.NewRequest("POST", uri, bytes.NewBuffer(jsonValue))
	request.Header.Set("Content-Type", "application/json")
	client := &http.Client{Timeout: time.Second * 10}
	resp, err := client.Do(request)

	if err != nil {
		Logger(fmt.Sprintf("%v", err))
	}

	defer resp.Body.Close()
	data, _ := ioutil.ReadAll(resp.Body)

	fmt.Println(string(data))
}
