package entity

import (
	game "github.com/thoussei/antonio/api/games/entity"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Tournament struct {
	Uid               primitive.ObjectID  `bson:"uid"`
	Title             string              `json:"title"`
	DateStart         string              `json:"dateStart"`
	Game              game.Game           `json:"game,omitempty"`
	Plateform         []game.GamePlatform `json:"plateform,omitempty"`
	NumberParticipate int                 `json:"numberParticipate"`
	NumberTeam        int                 `json:"numberTeam"`
	Price             []string             `json:"price"`
	DeadlineDate      string              `json:"deadlineDate"`
	PriceParticipate  string              `json:"priceParticipate"`
	Statut            bool                `json:"statut"`
	Info              string              `json:"info"`
	Rules             string              `json:"rules"`
	IsTeam            bool                `json:"isTeam"`
	IsPublic          bool                `json:"isPublic"`
	Format            string              `json:"format,omitempty"`
	Server            string              `json:"server,omitempty"`
	Tchat             string              `json:"tchat,omitempty"`
	Winners           []string            `json:"winners,omitempty"`
	Maps             string              `json:"maps,omitempty"`
	Region            string              `json:"region,omitempty"`
	Spectateur        string              `json:"spectateur,omitempty"`
	Laps              []string            `json:"laps,omitempty"`
}
