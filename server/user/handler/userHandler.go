package handler

import (
	"context"
	"fmt"

	"github.com/thoussei/antonio/front-office/server/user/entity"
	"github.com/thoussei/antonio/front-office/server/user/repository"
)

type userUseCase struct {
	userRepository repository.Repository
}

func GetByID(c context.Context, id string) (*entity.User, error) {
	fmt.Println(c)
}
