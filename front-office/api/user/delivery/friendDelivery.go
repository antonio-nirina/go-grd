package delivery

import (
	"errors"

	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/main/front-office/api/user/entity"
	"go.mongodb.org/mongo-driver/bson/primitive"
)


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

	if err != nil {
		return nil, err
	}

	return "Ok", nil
}