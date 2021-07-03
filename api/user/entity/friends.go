package entity

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Friends struct {
	Uid  primitive.ObjectID `bson:"uid"`
	Request 		User 			`json:"request"`
	Sender 			User 			`json:"sender"`
	Statut 			bool 			`json:"statut"`
}