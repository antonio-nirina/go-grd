package entity

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Home struct {
	Uid       primitive.ObjectID `bson:"uid"`
	Title     string             `json:"title"`
	Location  string             `json:"location"`
	Content   string             `json:"content"`
	UnderTitle   string           `json:"underTitle"`
	Statut   bool           	 `json:"statut"`
}