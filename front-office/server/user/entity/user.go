package entity

import (
	"github.com/thoussei/antonio/front-office/server/config/ConfigMongo"
	"github.com/thoussei/antonio/front-office/server/games/entity/AccountGame"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

var userCollection = ConfigMongo().Database("grd_database").Collection("users")

type User struct {
	Uid           primitive.NewObjectID()       `json:"uid"`
	FirstName     string      					`json:"firstName"`
	LastName      string     					`json:"lastName"`
	Password      string      					`json:"password"`
	Username      string      					`json:"username"`
	IsBanned      bool        					`json:"is_banned"`
	Avatar        string      					`json:"avatar"`
	Language      string      					`json:"username"`
	IdGameAccount [] AccountGame 				`json:"id_gameAccount"`
	Point         int         					`json:"point"`
}

type UserEntity interface {
	CreatedUser() (User,error)
	FindOneUser()(User,error)
}