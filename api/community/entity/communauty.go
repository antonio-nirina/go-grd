package entity

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Communauty struct {
	Uid       primitive.ObjectID `bson:"uid"`
	Streaming []string           `json:"streaming"`
	Game      TwitchGame         `json:"game"`
}
