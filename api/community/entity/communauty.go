package entity

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	gameEntity "github.com/thoussei/antonio/api/games/entity"
)

type Communauty struct {
	Uid       primitive.ObjectID `bson:"uid"`
	Streaming     []string             `json:"streaming"`
	Game      gameEntity.Game             `json:"game"`
}