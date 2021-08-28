package entity

import (
	user "github.com/thoussei/antonio/api/user/entity"
	team "github.com/thoussei/antonio/api/team/entity"
	tournament "github.com/thoussei/antonio/api/tournament/entity"
	league "github.com/thoussei/antonio/api/league/entity"
	"go.mongodb.org/mongo-driver/bson/primitive"
)


// Next add League,Tournament,Wager .....

type Participate struct {
	Uid         primitive.ObjectID 		`bson:"uid"`
	Date 		string            		`json:"date"`
	User 		user.User 				`json:"user"`
	Team 		team.Team 				`json:"team"`
	Tournament  tournament.Tournament 	`json:"tournament"`
	League 		league.League 				`json:"league"`
	IsWin 		bool 					`json:"isWin"`
}