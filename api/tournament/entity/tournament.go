package entity

import (
	game "github.com/thoussei/antonio/api/games/entity"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

const (
	TOURNAMENT_CREATED = "created"
	TOURNAMENT_PROGRESS = "inprogress"
	TOURNAMENT_END = "end"
) 

type Tournament struct {
	Uid               primitive.ObjectID  `bson:"uid"`
	Title             string              `json:"title"`
	DateStart         string              `json:"dateStart"`
	Game              game.Game           `json:"game,omitempty"`
	Plateform         []game.GamePlatform `json:"plateform,omitempty"`
	NumberParticipate int                 `json:"numberParticipate"`
	GameWay          string             `json:"gameWay"`
	Price             []string             `json:"price"`
	DeadlineDate      string              `json:"deadlineDate"`
	PriceParticipate  string              `json:"priceParticipate"`
	Statut            string                `json:"statut"`
	Info              string              `json:"info"`
	Rules             string              `json:"rules"`
	IsPublic          bool                `json:"isPublic"`
	IsTeam          bool                `json:"isTeam"`
	Format            string              `json:"format,omitempty"`
	Server            string              `json:"server,omitempty"`
	Tchat             string              `json:"tchat,omitempty"`
	Winners           []string            `json:"winners,omitempty"`
	Maps             string              `json:"maps,omitempty"`
	Region            string              `json:"region,omitempty"`
	Spectateur        string              `json:"spectateur,omitempty"`
	Laps              []string            `json:"laps,omitempty"`
}
