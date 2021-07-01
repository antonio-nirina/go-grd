package delivery

import (
	"errors"

	"github.com/graphql-go/graphql"
	userNotif "github.com/thoussei/antonio/front-office/api/notification/entity"
	"github.com/thoussei/antonio/front-office/api/user/entity"
	"github.com/thoussei/antonio/front-office/api/external"
	"github.com/thoussei/antonio/front-office/api/user/common"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Friends struct {
	Id 		string 		`json:"id"`
	Username string 	`json:"username"`
	Firstname string 	`json:"firstname"`
	Lastname string 	`json:"lastname"`
	Email string 		`json:"email"`
	Avatar string 		`json:"avatar"`
	IsBanned bool 	`json:"isBanned"`
	Count int 			`json:"count"`
	isConnected bool `json:"connected"`
}


func (r *resolver) RequestFriendResolver(params graphql.ResolveParams) (interface{}, error){
	idRequest, isOKReq := params.Args["idRequest"].(string)
	idSender, isOKSend := params.Args["idSender"].(string)

	if !isOKReq || !isOKSend {
		return nil, errors.New("id not valid")
	}

	resRequest, err := r.userHandler.FindOneUserByUid(idRequest)
	resSender, err := r.userHandler.FindOneUserByUid(idSender)

	if err != nil {
		return nil, err
	}

	friend := &entity.Friends{
		Uid: primitive.NewObjectID(),
		Request:resRequest,
		Sender:resSender,
		Statut:false,
	}

	_, err = r.userHandler.AddFriend(friend)
	_,err = r.notifHandler.SavedNotifHandler(resSender,resRequest,userNotif.TITLE_REQ_FRIEND,userNotif.CONTENT_REQ_FRIEND,userNotif.TYPE_FRIENDS)
	
	if err != nil {
		return nil, err
	}
	
	return "Ok", nil
}

func (r *resolver) GetAllFriendsUser(params graphql.ResolveParams) (interface{}, error) {
	email, isOKReq := params.Args["email"].(string)

	if !isOKReq  {
		return nil, errors.New("email not valid")
	}

	user, err := r.userHandler.FindUserByEmail(email)

	if err != nil {
		return nil, err
	}

	result := []Friends{}
	res := &Friends{}

	if len(user.Friends) == 0 {
		res.Id = user.Uid.Hex()
		res.Count = 0
		res.Email = ""
		res.Firstname = ""
		res.Lastname = ""
		res.Username = ""
		res.Avatar = ""
		res.IsBanned = false
		res.Connected = false
		result = append(result, *res)
	} else {
		for _,val := range user.Friends {
			res.Id = user.Uid.Hex()
			res.Count = len(user.Friends)
			res.Email = val.Email
			res.Firstname = val.FirstName
			res.Lastname = val.LastName
			res.Username = val.Username
			res.Avatar = val.Avatar
			res.IsBanned = val.IsBanned
			isConnected := false
			cn,_ := external.GetHmsetRedis(common.CONNECTED,val.Uid.Hex())
			if cn != nil {
				isConnected = true
			}
			res.isConnected = isConnected
			result = append(result, *res)
		} 
	}

	return result, nil
}

func (r *resolver) AcceptedFriendResolver(params graphql.ResolveParams) (interface{}, error){
	idRequest, isOKReq := params.Args["idRequest"].(string)
	idSender, isOKSend := params.Args["idSender"].(string)

	if !isOKReq || !isOKSend {
		return "", errors.New("id request or sender not valid")
	}

	resRequest, err := r.userHandler.FindOneUserByUid(idRequest)
	resSender, err := r.userHandler.FindOneUserByUid(idSender)

	if err != nil {
		return "", err
	}

	_, err = r.userHandler.UpdatedUserFriend(resSender,resRequest)

	return "Accepted",nil
}