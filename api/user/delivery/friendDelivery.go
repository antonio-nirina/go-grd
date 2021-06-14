package delivery

import (
	"errors"

	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/front-office/api/user/entity"
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
	Count int 			`json:count`
}


func (r *resolver) RequestFriendResolver(params graphql.ResolveParams) (interface{}, error){
	idRequest, isOKReq := params.Args["idRequest"].(string)
	idSender, isOKSend := params.Args["idSender"].(string)

	if !isOKReq || !isOKSend {
		return nil, errors.New("id not valid")
	}

	resRequest, err := r.userHandler.FindOneUserById(idRequest)
	resSender, err := r.userHandler.FindOneUserById(idSender)

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

	_, err = r.userHandler.NotifUserSender(&resSender)

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
		res.Id = user.Uid.String()
		res.Count = 0
		res.Email = ""
		res.Firstname = ""
		res.Lastname = ""
		res.Username = ""
		res.Avatar = ""
		res.IsBanned = false
		result = append(result, *res)
	} else {
		for _,val := range user.Friends {
			res.Id = user.Uid.String()
			res.Count = len(user.Friends)
			res.Email = val.Email
			res.Firstname = val.FirstName
			res.Lastname = val.LastName
			res.Username = val.Username
			res.Avatar = val.Avatar
			res.IsBanned = val.IsBanned
			result = append(result, *res)
		} 
	}

	return result, nil
}