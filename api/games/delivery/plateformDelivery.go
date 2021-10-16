package delivery

import (
	"errors"

	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/games/entity"
	"github.com/thoussei/antonio/api/games/handler"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type resolverPlateform struct {
	plateformHandler handler.UsecasePlateformInterface
}

func NewResolverPlateform(plateformUseCase handler.UsecasePlateformInterface) ResolvePlateform {
	return &resolverPlateform{
		plateformHandler: plateformUseCase,
	}
}

// var gameEntity = entity.Game{}

func (r *resolverPlateform) SavedGamePlateformResolver(params graphql.ResolveParams) (interface{}, error) {
	urlLogo, _ := r.plateformHandler.HandleFilePlateform(params.Args["logo"].(string), params.Args["typeLogo"].(string))
	
	plateformSaved := &entity.GamePlatform{
		Uid:         primitive.NewObjectID(),
		Name:        params.Args["name"].(string),
		Description: params.Args["description"].(string),
		Logo: urlLogo,
	}

	res, err := r.plateformHandler.SavedPlateformRepository(plateformSaved)

	if err != nil {
		return nil, err
	}

	return res, nil
}

func (r *resolverPlateform) FindOneGamePlateformResolver(params graphql.ResolveParams) (interface{}, error) {
	idQuery, isOK := params.Args["id"].(string)

	if !isOK {
		return nil, errors.New("id not valid")
	}

	res, err := r.plateformHandler.FindOnePlateformRepository(idQuery)

	if err != nil {
		return nil, err
	}

	return res, nil
}

func (r *resolverPlateform) FindAllGamePlateformResolver(params graphql.ResolveParams) (interface{}, error) {
	res, err := r.plateformHandler.FindAllPlateformRepository()

	if err != nil {
		return nil, err
	}

	return res, nil
}
