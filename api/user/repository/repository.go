package repository

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"github.com/antonio-nirina/go-grd/api/user/entity"
)

type Repository interface {
	SavedUser(user *entity.User) (interface{}, error) 
	FindOneUser(objectId primitive.ObjectID) (interface{}, error)
	FindAllUser() (interface{}, error)
}