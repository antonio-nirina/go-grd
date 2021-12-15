package entity

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Asistant struct {
	Uid       primitive.ObjectID `bson:"uid"`
	Title     string             `json:"title"`
	UnderTitle []Subject           `json:"underTitle"`
	Statut   bool           	 `json:"statut"`
}

type Subject struct {
	Title     string             	`json:"title"`
	Content  string             `json:"description"`
	Tag 		string 				`json:"tag"`
}