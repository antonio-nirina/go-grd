package repository

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"github.com/thoussei/antonio/front-office/api/games/entity"
)


type PlateformRepositoryInterface interface {
	SavedPlateformRepository(plateform *entity.GamePlatform) (interface{}, error)
	FindOnePlateformRepository(objectId primitive.ObjectID) (interface{}, error)
	FindAllPlateformRepository() (interface{}, error)
}

type GameRepositoryInterface interface {
	SavedGameRepository(game *entity.Game) (interface{}, error)
	FindOneGameRepository(objectId primitive.ObjectID) (interface{}, error)
	FindAllGameRepository() (interface{}, error)
}
