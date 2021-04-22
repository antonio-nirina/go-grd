package repository

import "github.com/antonio-nirina/go-grd/api/user/entity"

type Repository interface {
	SavedUser(user *entity.User) (interface{}, error) 
	FindOneUser(idQuery string) (interface{}, error)
	FindAll() (interface{}, error)
}