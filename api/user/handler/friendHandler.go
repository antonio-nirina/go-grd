package handler

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"time"

	"github.com/joho/godotenv"
	"github.com/thoussei/antonio/front-office/api/user/entity"
)

func (u *userUsecase)AddFriend(req *entity.Friends) (interface{}, error) {
	result, err := u.userRepository.AddFriend(req)

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (u *userUsecase)NotifUserSender(user *entity.User) (interface{}, error) {
	err := godotenv.Load()
	if err != nil {
		return nil,err
	}

	queryStr := `
	{ 
		NotifiUser(user:{id:"",email:"%s",username:"%s"}) {
			email,
		}
	}
	`
	queryN := fmt.Sprintf(queryStr,user.Email,user.Username)
	jsonData := map[string]string{
		"query":queryN,
	}

	uri := os.Getenv("URI_SUBSCRIPTION")
	jsonValue, _ := json.Marshal(jsonData)
    request, err := http.NewRequest("POST",uri, bytes.NewBuffer(jsonValue))
	request.Header.Set("Content-Type", "application/json")
    client := &http.Client{Timeout: time.Second * 10}
    resp, err := client.Do(request)
	
	if err != nil {
		fmt.Println("errr",err)
        return nil,err
    }

    defer resp.Body.Close()
	fmt.Println("cde", resp.StatusCode)
    data, _ := ioutil.ReadAll(resp.Body)
    fmt.Println("data",string(data))

	return "",nil
}