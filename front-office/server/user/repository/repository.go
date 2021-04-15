package repository

import (
	"github.com/thoussei/antonio/front-office/server/user/entity"
)

type Repository interface {
	GetByIdRepository(id string) (*entity.User, error)
	SavedRepository(u *entity.User) (interface{}, error)
}
