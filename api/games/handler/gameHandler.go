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

type gameViewModel struct {
	Uid        string 			 `json:"uid"`
	Name 	   string             `json:"name"`
	Image      string             `json:"image,omitempty"`
	Logo       string             `json:"logo,omitempty"`
	Popularity int                `json:"popularity"`
	Notes      int                `json:"notes"`
	Slug       string             `json:"slug"`
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

	var res [] gameViewModel

	for _,val := range result {
		game := gameViewModel{
			Uid:val.Uid.Hex(),     
			Name:val.Name,
			Image:val.Image,
			Logo:val.Logo,
			Popularity:val.Popularity,
			Notes:val.Notes,
			Slug:val.Slug,
		}

		res = append(res, game)
	}

	return res, nil
}

func (g *gameUsecase) FindOneGameByUidHandler(slug string) (entity.Game, error) {
	game, err := g.gameRepository.FindOneGameBySlugdRepository(slug)

	if err != nil {
		return entity.Game{}, err
	}

	return game, nil
}

