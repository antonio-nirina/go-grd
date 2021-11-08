package entity

import (
	game "github.com/thoussei/antonio/api/games/entity"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Wagger struct {
	Uid              primitive.ObjectID `bson:"uid"`
	Date             string             `json:"date"`
	Title            string             `json:"title"`
	Description      string             `json:"description"`
	Price            string             `json:"price"`
	DeadlineDate     string             `json:"deadlineDate"`
	Game             game.Game          `json:"game,omitempty"`
	Plateform         []game.GamePlatform `json:"plateform,omitempty"`
	GameWay          string             `json:"gameWay"`
	PriceParticipate string            `json:"priceParticipate"`
	Format           string             `json:"format"`
	IsPublic         bool               `json:"isPublic"`
	Statut           bool               `json:"statut"`
	Participant      int                `json:"participant"`
	Server            string              `json:"server,omitempty"`
	TchatVocal             bool              `json:"tchatVocal,omitempty"`
	Maps             string              `json:"maps,omitempty"`
	Region            string              `json:"region,omitempty"`
	Spectateur        string              `json:"spectateur,omitempty"`
	Rules            string             `json:"rules"`
}
