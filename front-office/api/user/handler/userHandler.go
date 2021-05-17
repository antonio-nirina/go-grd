package handler

/**
* Usecase
 */

import (
	"github.com/thoussei/antonio/main/front-office/api/user/entity"
	"github.com/thoussei/antonio/main/front-office/api/user/repository"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type userUsecase struct {
	userRepository repository.Repository
}

func NewUsecaseUser(r repository.Repository) Usecase {
	return &userUsecase{
		userRepository: r,
	}
}

func (u *userUsecase) SavedUser(user *entity.User) (interface{}, error) {
	result, err := u.userRepository.SavedUser(user)

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

	user, err := u.userRepository.FindOneUser(objectId)

	if err != nil {
		return nil, err
	}

	return user, nil
}

func (u *userUsecase) FindAllUser() (interface{}, error) {
	result, err := u.userRepository.FindAllUser()

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (u *userUsecase) FindUserByEmail(email string) (entity.User, error) {
	user, err := u.userRepository.FindUserByEmail(email)

	if err != nil {
		return entity.User{}, err
	}

	return user, nil
}

func (u *userUsecase) FindUserByUsername(email string) (entity.User, error) {
	user, err := u.userRepository.FindUserByUsername(email)

	if err != nil {
		return entity.User{}, err
	}

	return user, nil
}

func (u *userUsecase) UpdatedUser(user *entity.User) (interface{}, error) {
	result, err := u.userRepository.UpdatedUser(user)

	if err != nil {
		return nil, err
	}

	return result, nil
}


