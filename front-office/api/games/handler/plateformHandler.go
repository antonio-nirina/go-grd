package handler

import (

	"github.com/thoussei/antonio/main/front-office/api/games/entity"
	"github.com/thoussei/antonio/main/front-office/api/games/repository"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type plateformUsecase struct {
	plateformRepository repository.PlateformRepositoryInterface
}

func NewUsecasePlateform(r repository.PlateformRepositoryInterface) UsecasePlateformInterface {
	return &plateformUsecase{
		plateformRepository: r,
	}
}

func (g *plateformUsecase) SavedPlateformRepository(plateform *entity.GamePlatform) (interface{}, error) {
	result, err := g.plateformRepository.SavedPlateformRepository(plateform)

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (g *plateformUsecase) FindOnePlateformRepository(idQuery string) (interface{}, error) {
	objectId, err := primitive.ObjectIDFromHex(idQuery)

	if err != nil {
		return nil, err
	}

	user, err := g.plateformRepository.FindOnePlateformRepository(objectId)

	if err != nil {
		return nil, err
	}

	return user, nil
}

func (g *plateformUsecase) FindAllPlateformRepository() (interface{}, error) {
	result, err := g.plateformRepository.FindAllPlateformRepository()

	if err != nil {
		return nil, err
	}

	return result, nil
}