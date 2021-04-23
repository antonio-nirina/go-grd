package entity

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// primitive.NewObjectID()
type Game struct {
	Uid         primitive.ObjectID `bson:"uid"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

type GamePlatform struct {
	Uid         primitive.ObjectID `bson:"uid"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

type AccountGame struct {
	Uid       primitive.ObjectID `bson:"uid"`
	Name      string       `json:"name"`
	Logo      string       `json:"logo"`
	Game      Game         `json:"game"`
	Plateform GamePlatform `json:"plateform"`
}

type GameSchema struct {
	Uid         primitive.ObjectID
	Name        string
	Description string
}

type GamePlatformSchema struct {
	Uid         primitive.ObjectID
	Name        string
	Description string
}

type AccountGameSchema struct {
	Uid       primitive.ObjectID
	Name      string
	Logo      string
	Game      GameSchema
	Plateform GamePlatformSchema
}

type GameAccount struct {
	Uid       primitive.ObjectID
	IdAccount string
	Account   AccountGameSchema
}
