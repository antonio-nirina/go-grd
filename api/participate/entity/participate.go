package entity

import (
	team "github.com/thoussei/antonio/api/teams/entity"
	tournament "github.com/thoussei/antonio/api/tournament/entity"
	user "github.com/thoussei/antonio/api/user/entity"
	wagger "github.com/thoussei/antonio/api/wagger/entity"

	// league "github.com/thoussei/antonio/api/league/entity"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Next add League,Tournament,Wager .....

type Participate struct {
	Uid        primitive.ObjectID    `bson:"uid"`
	Date       string                `json:"date"`
	User       user.User             `json:"user,omitempty"`
	Team       []team.Team           `json:"team,omitempty"`
	Tournament tournament.Tournament `json:"tournament,omitempty"`
	Wagger     wagger.Wagger         `json:"wagger,omitempty"`
	// League 		league.League 		`json:"league,omitempty"`
	IsWin               bool `json:"isWin"`
	IsTournament        bool `json:"IsTournament"`
	IsWager             bool `json:"isWager"`
	NumberPartConfirmed bool `json:"numberPartConfirmed"`
}
