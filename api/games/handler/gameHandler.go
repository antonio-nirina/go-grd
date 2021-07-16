package handler

import (

	"github.com/thoussei/antonio/api/games/entity"
	"github.com/thoussei/antonio/api/games/repository"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type gameUsecase struct {
	gameRepository repository.GameRepositoryInterface
}

func NewUsecaseGame(r repository.GameRepositoryInterface) UsecaseGameInterface {
	return &gameUsecase{
		gameRepository: r,
	}
}

func (g *gameUsecase) SavedGameRepository(game *entity.Game) (interface{}, error) {
	result, err := g.gameRepository.SavedGameRepository(game)

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (g *gameUsecase) FindOneGameRepository(idQuery string) (interface{}, error) {
	objectId, err := primitive.ObjectIDFromHex(idQuery)

	if err != nil {
		return nil, err
	}

	game, err := g.gameRepository.FindOneGameRepository(objectId)

	if err != nil {
		return nil, err
	}

	return game, nil
}

func (g *gameUsecase) FindAllGameRepository() (interface{}, error) {
	result, err := g.gameRepository.FindAllGameRepository()

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (g *gameUsecase) FindOneGameByUidHandler(uidQuery string) (entity.Game, error) {
	objectId, err := primitive.ObjectIDFromHex(uidQuery)

	if err != nil {
		return entity.Game{}, err
	}

	game, err := g.gameRepository.FindOneGameByuidRepository(objectId)

	if err != nil {
		return entity.Game{}, err
	}

	return game, nil
}

