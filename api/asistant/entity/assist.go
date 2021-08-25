package entity

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Asistant struct {
	Uid       primitive.ObjectID `bson:"uid"`
	Title     Subject             `json:"title"`
	Location  string             `json:"location"`
	Content   string             `json:"content"`
	UnderTitle   string           `json:"underTitle"`
	Statut   bool           	 `json:"statut"`
}

type Subject struct {
	Uid       primitive.ObjectID 	`bson:"uid"`
	Title     string             	`json:"title"`
	Description  string             `json:"description"`
	Statut     bool           	 	`json:"statut"`
	Tag 		string 				`json:"tag"`
}