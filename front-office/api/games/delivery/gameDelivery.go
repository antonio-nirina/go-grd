package delivery

import (
	"errors"

	"github.com/thoussei/antonio/main/front-office/api/games/entity"
	"github.com/thoussei/antonio/main/front-office/api/games/handler"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type resolverGame struct {
	gameHandler handler.UsecaseGameInterface
}

func NewResolverGame(gameUseCase handler.UsecaseGameInterface) ResolverGame {
	return &resolverGame{
		gameHandler: gameUseCase,
	}
}

func (r *resolverGame) SavedGameResolver(params graphql.ResolveParams) (interface{}, error) {
	gameSaved := &entity.Game{
		Uid:        primitive.NewObjectID(),
		Logo:       params.Args["logo"].(string),
		Popularity: params.Args["popularity"].(int),
		Notes:      params.Args["notes"].(int),
		Slug:       params.Args["slug"].(string),
	}

	res, err := r.gameHandler.SavedGameRepository(gameSaved)

	if err != nil {
		return nil, err
	}

	return res, nil
}

func (r *resolverGame) FindOneGameResolver(params graphql.ResolveParams) (interface{}, error) {
	idQuery, isOK := params.Args["id"].(string)

	if !isOK {
		return nil, errors.New("id not valid")
	}

	res, err := r.gameHandler.FindOneGameRepository(idQuery)

	if err != nil {
		return nil, err
	}

	return res, nil
}

func (r *resolverGame) FindAllGameResolver(params graphql.ResolveParams) (interface{}, error) {
	res, err := r.gameHandler.FindAllGameRepository()

	if err != nil {
		return nil, err
	}

	return res, nil
}
