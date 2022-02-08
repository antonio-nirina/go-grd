package entity

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

const (
	RATE_STRONG = 500
	RATE_MEAN = 300
	RATE_WEAK = 200
)


type Rate struct {
	Uid      primitive.ObjectID `bson:"uid"`
	Created  string    `json:"created"`
	Updated  string    `json:"updated"`
	User  string    `json:"user"`
	Team  string    `json:"team"`
	Score  int    `json:"score"`
}