package entity

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type TwitchGame struct {
	Uid       primitive.ObjectID `bson:"uid"`
	Id        string             `json:"id"`
	Name      string             `json:"name"`
	BoxArtUrl string             `json:"box_art_url"`
}
