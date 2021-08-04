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
	Notes      int                `json:"notes"`
	Slug       string             `json:"slug"`
}

func (g *gameUsecase) SavedGameHandle(game *entity.Game) (string, error) {
	_, err := g.gameRepository.SavedGameRepository(game)

	if err != nil {
		return "", err
	}

	return "Ok", nil
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
			Notes:val.Notes,
			Slug:val.Slug,
		}

		res = append(res, game)
	}

	return res, nil
}

func (g *gameUsecase) FindOneGameByUidHandler(uid string) (entity.Game, error) {
	objectId, err := primitive.ObjectIDFromHex(uid)

	if err != nil {
		return entity.Game{}, err
	}
	
	game, err := g.gameRepository.FindOneGameByuidRepository(objectId)

	if err != nil {
		return entity.Game{}, err
	}

	return game, nil
}

func (g *gameUsecase) FindOneGameBySlugHandler(slug string) (entity.Game, error) {
	game, err := g.gameRepository.FindOneGameBySlugdRepository(slug)

	if err != nil {
		return entity.Game{}, err
	}

	return game, nil
}

func (g *gameUsecase) HandleFileGame(files string,typeFile string) (string,error) {
	err := godotenv.Load()
	
	if err != nil {
		return "",err
	}

	upl := &external.FileUpload{}
	path := fmt.Sprintf("%s%s", filepath.Dir(""), "/tmpFile")
	upl.Path = path

	if !upl.DirectoryExists() {
		err := upl.CreateDirectory()
		if err != nil {
			return "",err
		}
	}
	
	upl.Filename = (uuid.NewV4()).String()+"."+typeFile
	upl.Data = files
	
	upl.ApiKey = os.Getenv("BB_IMAGE_KEY")
	url,err := upl.SenderFile()

	if err != nil {
		return "",err
	}

	return url,nil
}

