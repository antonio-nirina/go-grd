package handler

import (
	"github.com/thoussei/antonio/api/games/entity"
)

type UsecaseGameInterface  interface {
	SavedGameRepository(game *entity.Game) (interface{}, error)
	FindOneGameRepository(idQuery string) (interface{}, error)
	FindOneGameByUidHandler(idQuery string) (entity.Game, error)
	FindAllGameRepository() (interface{}, error)
	FindOneGameBySlugHandler(slug string) (entity.Game, error)
	HandleFileGame(files string,typeFile string) error
}

type UsecasePlateformInterface interface {
	SavedPlateformRepository(plateform *entity.GamePlatform) (interface{}, error)
	FindOnePlateformRepository(idQuery string) (interface{}, error)
	FindOnePlateformByUidHandler(idQuery string) (entity.GamePlatform, error)
	FindAllPlateformRepository() (interface{}, error)
}

