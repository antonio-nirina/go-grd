package delivery

import (
	"errors"

	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/games/entity"
	"github.com/thoussei/antonio/api/games/handler"
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
	urlLogo, err := r.gameHandler.HandleFileGame(params.Args["logo"].(string), params.Args["typeLogo"].(string))
	urlImage, err := r.gameHandler.HandleFileGame(params.Args["image"].(string), params.Args["typeImage"].(string))

	if err != nil {
		return nil, err
	}

	gameSaved := &entity.Game{
		Uid:        primitive.NewObjectID(),
		Name:       params.Args["name"].(string),
		Image:      urlImage,
		Logo:       urlLogo,
		Notes:      params.Args["notes"].(int),
		Slug:       params.Args["slug"].(string),
		NameTWITCH: "",
		IdTWITCH:   "",
	}

	res, err := r.gameHandler.SavedGameHandle(gameSaved)

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

func (r *resolverGame) FindGameTwicthResolver(params graphql.ResolveParams) (interface{}, error) {
	name, _ := params.Args["nameGame"].(string)
	res, err := r.gameHandler.FindGameTwitchHandler(name)

	if err != nil {
		return nil, err
	}

	return res, nil
}
