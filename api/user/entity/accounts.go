package entity

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Accounts struct {
	Uid  primitive.ObjectID `bson:"uid"`
	Id 				string 	 `json:"id"`
	Name 			string 	 `json:"name"`
	Profil 			string 	 `json:"profil"` //display_name
	Logo 			string    `json:"logo"`
	AccessToken 	string     `json:"accessToken,omitempty"`
	RefreshToken 	string     `json:"refreshToken,omitempty"`
}