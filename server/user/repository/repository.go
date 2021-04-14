package repository

import (

	"github.com/thoussei/antonio/front-office/server/user/entity"
)

type Repository interface {
	GetById(ctx context.Context, id string)
	Save(ctx context.Context, *entity.User) error
}