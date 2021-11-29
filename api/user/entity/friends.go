package entity

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Friends struct {
	Uid  primitive.ObjectID `bson:"uid"`
	Request 		string 			`json:"request"`
	Sender 			string 			`json:"sender"`
	Statut 			bool 			`json:"statut"`
}