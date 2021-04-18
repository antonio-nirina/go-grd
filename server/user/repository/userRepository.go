package repository

import (
	"context"

	"github.com/thoussei/antonio/front-office/server/user/entity"
	"go.mongodb.org/mongo-driver/bson"
)

type NewUserRepository struct{}

var usercollection = entity.UserCollection

func (repo *NewUserRepository) GetByIdRepository(id string) (*entity.User, error) {
	var result entity.User
	err := usercollection.FindOne(context.TODO(), bson.D{{"uid", id}}).Decode(&result)

	if err != nil {
		return nil, err
	}

	return &result, nil
}

func (repo *NewUserRepository) SavedRepository(user entity.User) (interface{}, error) {
	saveUser, err := usercollection.InsertOne(context.TODO(), user)

	if err != nil {
		return nil, err
	}

	return saveUser.InsertedID, nil
}
