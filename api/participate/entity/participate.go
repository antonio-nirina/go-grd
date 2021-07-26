package entity

import (
	user "github.com/thoussei/antonio/api/user/entity"
	tournament "github.com/thoussei/antonio/api/tournament/entity"
	"go.mongodb.org/mongo-driver/bson/primitive"
)


// Next add League,Tournament,Wager .....

type Participate struct {
	Uid         primitive.ObjectID 		`bson:"uid"`
	Date 		string            		`json:"date"`
	User 		user.User 				`json:"user"`
	Tournament  tournament.Tournament 	`json:"tournament"`
}