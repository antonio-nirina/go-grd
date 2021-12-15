package entity

import (
	tournament "github.com/thoussei/antonio/api/tournament/entity"
	wagger "github.com/thoussei/antonio/api/wagger/entity"

	// league "github.com/thoussei/antonio/api/league/entity"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Next add League,Tournament,Wager .....

type Participate struct {
	Uid        primitive.ObjectID    `bson:"uid"`
	Date       string                `json:"date"`
	User       string             `json:"user,omitempty"`
	Team       string           `json:"team,omitempty"`
	Tournament tournament.Tournament `json:"tournament,omitempty"`
	Wagger     wagger.Wagger         `json:"wagger,omitempty"`
	// League 		league.League 		`json:"league,omitempty"`
	IsWin               bool `json:"isWin"`
	IsTournament        bool `json:"isTournament"`
	IsWager             bool `json:"isWager"`
	NumberPartConfirmed bool `json:"numberPartConfirmed"`
}
