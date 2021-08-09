package entity

import (
	"go.mongodb.org/mongo-driver/bson/primitive"

	"github.com/thoussei/antonio/api/user/entity"
	gameEntity "github.com/thoussei/antonio/api/games/entity"
)

type Communauty struct {
	Uid       primitive.ObjectID `bson:"uid"`
	Title     string             `json:"title"`
	User      entity.User             `json:"user"`
	Content   string             `json:"Content"`
	Game      gameEntity.Game             `json:"game"`
}