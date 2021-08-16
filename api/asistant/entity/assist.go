package entity

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Asistant struct {
	Uid        primitive.ObjectID `bson:"uid"`
	Name      string             `json:"name"`
	Content    []AssistContent     `json:"content"`
}

type AssistContent struct {
	Title      string             `json:"title"`
	TitleUnder string             `json:"titleUnder"`
	Incontent string              `json:"incontent"`
}