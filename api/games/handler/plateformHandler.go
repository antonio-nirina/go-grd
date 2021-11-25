package handler

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/joho/godotenv"
	uuid "github.com/satori/go.uuid"
	"github.com/thoussei/antonio/api/external"
	"github.com/thoussei/antonio/api/games/entity"
	"github.com/thoussei/antonio/api/games/repository"
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

type GamePlatformViewModel struct {
	Uid         string `json:"uid"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Logo        string `json:logo"`
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

	var res []GamePlatformViewModel

	for _, val := range result {
		plateform := GamePlatformViewModel{
			Uid:         val.Uid.Hex(),
			Name:        val.Name,
			Description: val.Description,
			Logo:        val.Logo,
		}

		res = append(res, plateform)
	}

	return res, nil
}

func (g *plateformUsecase) FindOnePlateformByUidHandler(uidQuery string) (entity.GamePlatform, error) {
	objectId, err := primitive.ObjectIDFromHex(uidQuery)

	if err != nil {
		return entity.GamePlatform{}, err
	}

	plateform, err := g.plateformRepository.FindOnePlateformByUidRepository(objectId)

	if err != nil {
		return entity.GamePlatform{}, err
	}

	return plateform, nil
}

func (g *plateformUsecase) HandleFilePlateform(files string, typeFile string) (string, error) {
	err := godotenv.Load()

	if err != nil {
		return "", err
	}

	upl := &external.FileUpload{}
	path := fmt.Sprintf("%s%s", filepath.Dir(""), "/tmpFile")
	upl.Path = path

	if !upl.DirectoryExists() {
		err := upl.CreateDirectory()
		if err != nil {
			return "", err
		}
	}

	upl.Filename = (uuid.NewV4()).String() + "." + typeFile
	upl.Data = files

	upl.ApiKey = os.Getenv("BB_IMAGE_KEY")
	url, err := upl.SenderFile()

	if err != nil {
		return "", err
	}

	return url, nil
}
