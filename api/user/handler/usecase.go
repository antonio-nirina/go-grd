package handler

import (
	"github.com/thoussei/antonio/main/front-office/api/user/entity"
)

type Usecase interface {
	SavedUser(user *entity.User) (interface{}, error)
	FindOneUser(idQuery string) (interface{}, error)
	FindUserByEmail(email string) (entity.User, error)
	FindUserByUsername(email string) (entity.User, error)
	// GetToken(user *entity.User) (interface{}, error)
	FindAllUser() (interface{}, error)
	UpdatedUser(user *entity.User) (interface{}, error)
	UpdatedTokenUser(email string,token string) (interface{}, error)
	FindUserByToken(token string) (entity.User, error)
}