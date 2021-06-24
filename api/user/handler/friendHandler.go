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

func (u *UserUsecase) UpdatedUserFriend(user entity.User,userReq entity.User) (interface{}, error) {
	var friend []entity.User
	friend = append(friend,userReq)
	userSender := &entity.User{
			Uid:           	user.Uid,
			FirstName:     	user.FirstName,
			LastName:      	user.LastName,
			Password:      	user.Password,
			Username:      	user.Username,
			Email:         	user.Email,
			IsBanned:      	user.IsBanned,
			Avatar:        	user.Avatar,
			Language:      	user.Language,
			Point:         	user.Point,
			IdGameAccount: 	user.IdGameAccount,
			Roles: 			user.Roles,
			TypeConnexion:	user.TypeConnexion,
			Created: 		user.Created,
			Friends:friend,		
		}
	result, err := u.userRepository.UpdatedUser(userSender)

	if err != nil {
		return nil, err
	}

	return result, nil
}

func NotifUserSender(user *entity.User,userReq *entity.User,count interface{}, wg *sync.WaitGroup)  {
	err := godotenv.Load()
	if err != nil {
		external.Logger("error load env")
	}

	queryStr := `
	{ 
		NotifiUser(user:{uid:"%s",avatar:"%s",email:"%s",username:"%s",count:%d}) {
			email,
		}
	}
	`
	queryN := fmt.Sprintf(queryStr,user.Uid.Hex(),userReq.Avatar,userReq.Email,userReq.Username,count)

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