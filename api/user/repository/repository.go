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
	UpdatedUser(user *entity.User) (interface{}, error)
	// UpdateAccountGame(email string) (entity.User, error)
	UpdatedTokenUser(email string,token string) (interface{}, error)
	FindUserByToken(token string) (entity.User, error)
	FindOneUserById(objectId primitive.ObjectID) (entity.User, error)
	AddFriend(req *entity.Friends) (interface{}, error)
}
