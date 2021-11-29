package entity

import (
	"go.mongodb.org/mongo-driver/bson/primitive"

	"github.com/thoussei/antonio/api/user/entity"
)

type Group struct {
	Uid       primitive.ObjectID `bson:"uid"`
	Lead      entity.User         `json:"lead"`
	Users     []string      `json:"users"`
	Subject   string             `json:"subject"`
}