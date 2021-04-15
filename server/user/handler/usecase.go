package handler

import (
	"context"

	"github.com/thoussei/antonio/front-office/server/user/entity"
)

type Usecase interface {
	GetByIdUsecase(ctx context.Context, id string) (*entity.User, error)
	SaveUseCase(ctx context.Context, u *entity.User) (interface{}, error)
}
