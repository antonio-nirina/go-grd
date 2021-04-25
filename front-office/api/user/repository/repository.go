package repository

import (
	"github.com/thoussei/antonio/main/front-office/api/user/entity"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Repository interface {
	SavedUser(user *entity.User) (interface{}, error)
	FindOneUser(objectId primitive.ObjectID) (interface{}, error)
	FindUserByEmail(email string) (entity.User, error)
	FindUserByUsername(username string) (entity.User, error)
	FindAllUser() (interface{}, error)
	// UpdateAccountGame(email string) (entity.User, error)
}
