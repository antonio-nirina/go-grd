package repository

import (
	cmtyEntity "github.com/thoussei/antonio/api/community/entity"
	"github.com/thoussei/antonio/api/games/entity"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type PlateformRepositoryInterface interface {
	SavedPlateformRepository(plateform *entity.GamePlatform) (interface{}, error)
	FindOnePlateformRepository(objectId primitive.ObjectID) (interface{}, error)
	FindOnePlateformByUidRepository(objectId primitive.ObjectID) (entity.GamePlatform, error)
	FindAllPlateformRepository() ([]entity.GamePlatform, error)
}

type GameRepositoryInterface interface {
	SavedGameRepository(game *entity.Game) (interface{}, error)
	FindOneGameRepository(objectId primitive.ObjectID) (interface{}, error)
	FindOneGameByuidRepository(objectId primitive.ObjectID) (entity.Game, error)
	FindOneGameBySlugdRepository(slug string) (entity.Game, error)
	FindAllGameRepository() ([]entity.Game, error)
	FindGameTwitchRepository(nameGame string) (cmtyEntity.TwitchGame, error)
}
