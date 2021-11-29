package entity

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)


type Rate struct {
	Uid      primitive.ObjectID `bson:"uid"`
	Created  string    `json:"created"`
	Updated  string    `json:"updated"`
	User  string    `json:"user"`
	Score  int    `json:"score"`
}