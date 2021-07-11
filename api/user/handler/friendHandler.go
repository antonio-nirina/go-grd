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
	"github.com/thoussei/antonio/api/external"
	"github.com/thoussei/antonio/api/user/entity"
)

const (
	CONNECTED 	= "_connect"
	DISCONNECT  = "_disconnect"
)

type userFriends struct {
	Uid string
	Email string
	Avatar string
	Username string
}

func (u *UserUsecase)AddFriend(req *entity.Friends) (interface{}, error) {
	result, err := u.userRepository.AddFriend(req)

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (u *UserUsecase) UpdatedUserFriend(user entity.User,userReq entity.User) (interface{}, error) {
	var friend []entity.User
	var friendReq []entity.User
	friend = append(friend,userReq)
	friendReq = append(friendReq,user)
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

	userRq := &entity.User{
		Uid:           	userReq.Uid,
		FirstName:     	userReq.FirstName,
		LastName:      	userReq.LastName,
		Password:      	userReq.Password,
		Username:      	userReq.Username,
		Email:         	userReq.Email,
		IsBanned:      	userReq.IsBanned,
		Avatar:        	userReq.Avatar,
		Language:      	userReq.Language,
		Point:         	userReq.Point,
		IdGameAccount: 	userReq.IdGameAccount,
		Roles: 			userReq.Roles,
		TypeConnexion:	userReq.TypeConnexion,
		Created: 		userReq.Created,
		Friends:friendReq,		
	}

	result, err := u.userRepository.UpdatedUser(userSender)
	_, err = u.userRepository.UpdatedUser(userRq)

	if err != nil {
		return nil, err
	}

	return result, nil
}

func NotifUserSender(user *entity.User,userReq *entity.User,uid string,count interface{}, wg *sync.WaitGroup)  {
	err := godotenv.Load()
	if err != nil {
		external.Logger("error load env")
	}

	queryStr := `
	{ 
		NotifiUser(user:{uid:"%s",avatar:"%s",email:"%s",username:"%s",count:%d,uidNotif:"%s"}) {
			email,
		}
	}
	`
	queryN := fmt.Sprintf(queryStr,user.Uid.Hex(),userReq.Avatar,userReq.Email,userReq.Username,count,uid)

	jsonData := map[string]string{
		"query":queryN,
	}

	clientWsGraphql(jsonData)
	wg.Done()
}

func (u *UserUsecase) NotifConnected(user *entity.User, wg *sync.WaitGroup) {
	//var args = make(map[string]interface{})
	err := godotenv.Load()
	if err != nil {
		external.Logger("error load env")
	}

	queryStr := `
	{ 
		NotifUserConnected(user:{uid:"%s",avatar:"%s",email:"%s",username:"%s",count:%d}) {
			email,
		}
	}
	`
	queryN := fmt.Sprintf(queryStr,user.Uid.Hex(),user.Avatar,user.Email,user.Username,0)

	jsonData := map[string]string{
		"query":queryN,
	}

	userSend := userFriends{user.Uid.Hex(),user.Email,user.Avatar,user.Username}
	data,_:= json.Marshal(userSend)
 	// args[user.Uid.Hex()] = data
	external.SetHmsetRedis(CONNECTED,user.Uid.Hex(),data)
	clientWsGraphql(jsonData)
	wg.Done()
}

func (u *UserUsecase) NotifDisConnected(user *entity.User, wg *sync.WaitGroup) {
	err := godotenv.Load()
	if err != nil {
		external.Logger("error load env")
	}

	queryStr := `
	{ 
		NotifUserConnected(user:{uid:"%s",avatar:"%s",email:"%s",username:"%s",count:%d}) {
			email,
		}
	}
	`
	queryN := fmt.Sprintf(queryStr,user.Uid.Hex(),user.Avatar,user.Email,user.Username,0)
	jsonData := map[string]string{
		"query":queryN,
	}
	
	external.RemoveHmsetRedis(CONNECTED,user.Uid.Hex())
	clientWsGraphql(jsonData)
	wg.Done()
}


func clientWsGraphql(jsonData map[string]string) {
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
}