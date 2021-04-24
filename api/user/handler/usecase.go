package handler

import "github.com/antonio-nirina/go-grd/api/user/entity"

type Usecase interface {
	SavedUser(user *entity.User) (interface{}, error)
	FindOneUser(idQuery string) (interface{}, error)
	FindUserByEmail(email string) (entity.User, error)
	FindUserByUsername(email string) (entity.User, error)
	// GetToken(user *entity.User) (interface{}, error)
	FindAllUser() (interface{}, error)
}