package handler

/**
* Usecase
 */

import (
	"github.com/antonio-nirina/go-grd/api/user/entity"
	"github.com/antonio-nirina/go-grd/api/user/repository"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type userUsecase struct {
	userRepository repository.Repository
}

func NewUsecaseUser(r repository.Repository) *userUsecase {
	return &userUsecase{
		userRepository: r,
	}
}

func (u *userUsecase) SavedUser(user *entity.User) (interface{}, error) {
	result, err := u.SavedUser(user)

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (u *userUsecase) FindOneUser(idQuery string) (interface{}, error) {
	objectId, err := primitive.ObjectIDFromHex(idQuery)

	if err != nil {
		return nil, err
	}

	user, err := u.FindOneUser(objectId)

	if err != nil {
		return nil, err
	}

	return user, nil
}

func (u *userUsecase) FindAllUser() (interface{}, error) {
	result, err := u.FindAllUser()

	if err != nil {
		return nil, err
	}

	return result, nil
}
