package handler

import (
	"context"

	"github.com/thoussei/antonio/front-office/server/user/entity"
)

type Usecase interface {
	GetById(ctx context.Context, id string)
	Save(ctx context.Context, *entity.User) error
}
