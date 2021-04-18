package handler

/**
 * User usecase
**/

import (
	"context"

	"github.com/thoussei/antonio/front-office/server/user/entity"
	"github.com/thoussei/antonio/front-office/server/user/repository"
)

type userUseCase struct {
	userRepository repository.Repository
}

func NewUserUsecase(userRepo repository.Repository) *userUseCase {
	return &userUseCase{
		userRepository: userRepo,
	}
}

func (u *userUseCase) GetByIdUsecase(c context.Context, id string) (*entity.User, error) {

	result, err := u.userRepository.GetByIdRepository(id)

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (u *userUseCase) SaveUseCase(c context.Context, user entity.User) (interface{}, error) {
	result, err := u.userRepository.SavedRepository(&user)

	if err != nil {
		return nil, err
	}

	return result, nil
}
