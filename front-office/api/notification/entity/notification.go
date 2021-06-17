package entity

import (
	user "github.com/thoussei/antonio/front-office/api/user/entity"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

const (
	TYPE_FRIENDS = 0
	TYPE_RATING  = 1
)
 
type Notification struct {
	Uid           primitive.ObjectID `bson:"uid"`
	Title     		string  `json:"title"`
	Type     		string  `json:"type"`
	Content      	string  `json:"content"`
	Statut 			bool `json:"statut"`
	User 			user.User `json:"user"`
}
