package handler

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"sync"
	"time"

	"github.com/joho/godotenv"
	"github.com/thoussei/antonio/front-office/api/external"
	"github.com/thoussei/antonio/front-office/api/user/entity"
)

func (u *UserUsecase)AddFriend(req *entity.Friends) (interface{}, error) {
	result, err := u.userRepository.AddFriend(req)

	if err != nil {
		return nil, err
	}

	return result, nil
}

func NotifUserSender(user *entity.User,wg *sync.WaitGroup)  {
	err := godotenv.Load()
	if err != nil {
		external.Logger("error load env")
	}

	queryStr := `
	{ 
		NotifiUser(user:{avatar:"%s",email:"%s",username:"%s"}) {
			email,
		}
	}
	`
	queryN := fmt.Sprintf(queryStr,user.Avatar,user.Email,user.Username)
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
        external.Logger(fmt.Sprintf("%v", err))
    }

    defer resp.Body.Close()
    data, _ := ioutil.ReadAll(resp.Body)

	fmt.Println(string(data))
	wg.Done()
}