package entity

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Game struct {
	Uid          primitive.NewObjectID()    `json:"uid"`
	Name: 		 string      				`json:"name"`
    Description: string      				`json:"description"`
}

type GamePlatform struct {
    Uid          primitive.NewObjectID()    `json:"uid"`
    Name: 		 string      				`json:"name"`
    Description: string      				`json:"description"`
}

type  AccountGame struct {
	Uid          primitive.NewObjectID()    `json:"uid"`
	Name: 		 string      				`json:"name"`
	Logo: 		 string      				`json:"logo"`
	Game: 		 Game 						`json:"game"`
	Plateform:	 GamePlatform 				`json:"plateform"`
}