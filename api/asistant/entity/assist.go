package entity

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Assistant struct {
	Uid        primitive.ObjectID `bson:"uid"`
	Content    []assistContent     `json:"content"`
}

type assistContent struct {
	Title      string             `json:"title"`
	TitleUnder string             `json:"titleUnder"`
	Incontent string              `json:"incontent"`
}