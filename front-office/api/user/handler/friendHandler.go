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

type query struct {
	Id string `json:"id"`
	Email string `json:"email"`
	Username string `json:"username"`
}

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
	
	// query := &query{user.Uid.String(),user.Email,user.Username}
	//req, _ := json.Marshal(query)
	// string(req)
	req := ":{NotifiUser(user:{"+user.Uid.String()+","+user.Email+","+user.Username+"}){username,email,id"
	jsonData := make(map[string]string)
	jsonData["query"] = req
	uri := os.Getenv("URI_SUBSCRIPTION")
    jsonValue, _ := json.Marshal(jsonData)
    request, err := http.NewRequest("POST",uri, bytes.NewBuffer(jsonValue))
    client := &http.Client{Timeout: time.Second * 10}
    resp, err := client.Do(request)
	
	if err != nil {
		fmt.Println(err)
        return nil,err
    }

    defer resp.Body.Close()
    data, _ := ioutil.ReadAll(resp.Body)
    fmt.Println(string(data))

	return "",nil
}