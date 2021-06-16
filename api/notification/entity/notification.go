package entity

import (
	user "github.com/thoussei/antonio/front-office/api/user/entity"
	"go.mongodb.org/mongo-driver/bson/primitive"
)


type Notification struct {
	Uid           primitive.ObjectID `bson:"uid"`
	Title     		string  `json:"title"`
	Content      	string  `json:"content"`
	Statut 			bool `json:"statut"`
	User 			user.User `json:"user"`
}
