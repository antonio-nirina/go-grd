package repository

import (
	"github.com/antonio-nirina/go-grd/api/user/entity"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Repository interface {
	SavedUser(user *entity.User) (interface{}, error)
	FindOneUser(objectId primitive.ObjectID) (interface{}, error)
	FindAllUser() (interface{}, error)
}
