package handler

/**
 * User usecase
**/

import (
	"context"

	"github.com/thoussei/antonio/front-office/server/user/entity"
	"github.com/thoussei/antonio/front-office/server/user/repository"
)

type UserUseCase struct {
	userRepository repository.NewUserRepository
}

func NewUserUsecase(userRepo repository.NewUserRepository) UserUseCase {
	return UserUseCase{
		userRepository: userRepo,
	}
}

func (u *UserUseCase) GetByIdUsecase(c context.Context, id string) (*entity.User, error) {
	result, err := u.userRepository.GetByIdRepository(id)

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (u *UserUseCase) SaveUseCase(c context.Context, user entity.User) (interface{}, error) {
	result, err := u.userRepository.SavedRepository(user)

	if err != nil {
		return nil, err
	}

	return result, nil
}
