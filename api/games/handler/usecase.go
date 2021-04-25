package handler

import (
	"github.com/thoussei/antonio/main/front-office/api/games/entity"
)

type UsecaseGameInterface  interface {
	SavedGameRepository(game *entity.Game) (interface{}, error)
	FindOneGameRepository(idQuery string) (interface{}, error)
	FindAllGameRepository() (interface{}, error)
}

type UsecasePlateformInterface interface {
	SavedPlateformRepository(plateform *entity.GamePlatform) (interface{}, error)
	FindOnePlateformRepository(idQuery string) (interface{}, error)
	FindAllPlateformRepository() (interface{}, error)
}

