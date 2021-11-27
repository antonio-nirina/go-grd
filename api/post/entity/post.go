package entity

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Post struct {
	Uid       primitive.ObjectID `bson:"uid"`
	Title     string             `json:"title"`
	User      string             `json:"user"`
	Content   string             `json:"Content"`
	ImageType   string             `json:"imageType"`
	Files   string             `json:"files"`
	Date       string                `json:"date"`
}