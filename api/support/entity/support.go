package entity

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Support struct {
	Uid       primitive.ObjectID `bson:"uid"`
	Created   string             `json:"created"`
	Updated   string             `json:"updated"`
	FirstName string             `json:"firstName"`
	LastName  string             `json:"lastName"`
	Content   string             `json:"content"`
	Email     string             `json:"email"`
}
