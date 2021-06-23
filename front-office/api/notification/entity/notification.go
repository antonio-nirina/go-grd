package entity

import (
	user "github.com/thoussei/antonio/front-office/api/user/entity"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

const (
	TYPE_FRIENDS = 0
	TYPE_RATING  = 1
	TITLE_REQ_FRIEND = "ask_friend"
	CONTENT_REQ_FRIEND = "content_friend"
)
 
type Notification struct {
	Uid           primitive.ObjectID `bson:"uid"`
	Title     		string  `json:"title"`
	Type     		int  `json:"type"`
	Content      	string  `json:"content"`
	Statut 			bool `json:"statut"`
	UserRequest 	user.User `json:"userRequest"`
	User 			user.User `json:"user"`
}
