package entity

import (
	"github.com/thoussei/antonio/front-office/server/config"
	"github.com/thoussei/antonio/front-office/server/games/entity"
)

var UserCollection = config.ConfigMongo().Database("grd_database").Collection("users")

//primitive.NewObjectID()
type User struct {
	Uid           string               `json:"uid"`
	FirstName     string               `json:"firstName"`
	LastName      string               `json:"lastName"`
	Password      string               `json:"password"`
	Username      string               `json:"username"`
	IsBanned      bool                 `json:"isBanned"`
	Avatar        string               `json:"avatar,omitempty"`
	Language      string               `json:"language"`
	IdGameAccount []entity.GameAccount `json:"gameAccount,omitempty"`
	Point         int                  `json:"point"`
}
