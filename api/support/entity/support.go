package entity

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Support struct {
	Uid     primitive.ObjectID `bson:"uid"`
	Created string             `json:"created"`
	Updated string             `json:"updated"`
	User    string             `json:"user"`
	Content string             `json:"content"`
}
