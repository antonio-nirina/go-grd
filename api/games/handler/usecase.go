package handler

import (
	"github.com/thoussei/antonio/api/games/entity"
)

type UsecaseGameInterface interface {
	SavedGameHandle(game *entity.Game) (string, error)
	FindOneGameRepository(idQuery string) (interface{}, error)
	FindOneGameByUidHandler(idQuery string) (entity.Game, error)
	FindAllGameRepository() (interface{}, error)
	FindOneGameBySlugHandler(slug string) (entity.Game, error)
	HandleFileGame(files string, typeFile string) (string, error)
	FindGameTwitchHandler(nameGame string) (GameViewModel, error)
}

type UsecasePlateformInterface interface {
	SavedPlateformRepository(plateform *entity.GamePlatform) (interface{}, error)
	FindOnePlateformRepository(idQuery string) (interface{}, error)
	FindOnePlateformByUidHandler(idQuery string) (entity.GamePlatform, error)
	FindAllPlateformRepository() (interface{}, error)
	HandleFilePlateform(files string, typeFile string) (string, error)
}
