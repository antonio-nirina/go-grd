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
	IsBanned      bool                 `json:"is_banned"`
	Avatar        string               `json:"avatar"`
	Language      string               `json:"language"`
	IdGameAccount []entity.AccountGame `json:"id_gameAccount"`
	Point         int                  `json:"point"`
}
