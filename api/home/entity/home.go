package entity

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Home struct {
	Uid        primitive.ObjectID `bson:"uid"`
	Name      string             `json:"name"`
	ImageGame string             `json:"imageGame"`
	Image      string             `json:"image"`
	Content    []HomeContent     `json:"content"`
}

type HomeContent struct {
	Title      string             `json:"title"`
	TitleUnder string             `json:"titleUnder"`
	Incontent string              `json:"incontent"`
}