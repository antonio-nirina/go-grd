package handler

import "github.com/antonio-nirina/go-grd/api/user/entity"

type Usecase interface {
	SavedUser(user *entity.User) (interface{}, error)
	FindOneUser(idQuery string) (interface{}, error)
	FindAll() (interface{}, error)
}