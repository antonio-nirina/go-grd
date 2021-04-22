package handler

import (
	"github.com/antonio-nirina/go-grd/api/user/entity"
	"github.com/antonio-nirina/go-grd/api/user/repository"
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

}

func (u *userUsecase) FindOneUser(idQuery string) (interface{}, error) {

}