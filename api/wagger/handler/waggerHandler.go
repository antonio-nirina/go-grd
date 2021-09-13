package handler

import (
	"github.com/thoussei/antonio/api/wagger/entity"
	"github.com/thoussei/antonio/api/wagger/repository"
	tournament "github.com/thoussei/antonio/api/tournament/handler"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UsecaseWagger interface {
	SavedWaggerHandle(wagger *entity.Wagger) (interface{}, error)
	FindWaggerHandler(idQuery string) (WaggerViewModel, error)
	FindAllWaggerHandler(pageNumber int64, limit int64) ([]WaggerViewModel, error)
	UpdatedWaggerHandler(wagger *entity.Wagger) (interface{}, error)
	FindOneWaggerHandler(idQuery string) (entity.Wagger, error)
}

type WaggerViewModel struct {
	Uid              string  `json:"uid"`
	Date             string  `json:"date"`
	Title            string  `json:"title"`
	Description      string  `json:"description"`
	Price            float64 `json:"price"`
	DeadlineDate     string  `json:"deadlineDate"`
	GameWay          string  `json:"gameWay"`
	PriceParticipate float64 `json:"priceParticipate"`
	Game 			 tournament.GameViewModel `json:"game"`
	Plateform  		 tournament.PlateformViewModel `json:"plateform"`
	Format           string  `json:"format"`
	IsPublic         bool    `json:"IsPublic"`
	Statut           bool    `json:"statut"`
	Records          int     `json:"records"`
	Participant      int     `json:"participant"`
}

type waggerUsecase struct {
	waggerRepository repository.RepositoryWagger
}

func NewUsecaseWagger(w repository.RepositoryWagger) UsecaseWagger {
	return &waggerUsecase{
		waggerRepository: w,
	}
}

func (w *waggerUsecase) SavedWaggerHandle(wagger *entity.Wagger) (interface{}, error) {
	_, err := w.waggerRepository.SavedWaggerRepo(wagger)

	if err != nil {
		return 0, err
	}

	return "Ok", nil
}

func (w *waggerUsecase) FindWaggerHandler(idQuery string) (WaggerViewModel, error) {
	objectId, err := primitive.ObjectIDFromHex(idQuery)

	if err != nil {
		return WaggerViewModel{}, err
	}

	result, err := w.waggerRepository.FindWaggerRepo(objectId)

	if err != nil {
		return WaggerViewModel{}, err
	}

	waggerViewModel := WaggerViewModel{
		Uid:              result.Uid.Hex(),
		Date:             result.Date,
		Title:            result.Title,
		Description:      result.Description,
		Price:            result.Price,
		DeadlineDate:     result.DeadlineDate,
		GameWay:          result.GameWay,
		PriceParticipate: result.PriceParticipate,
		Game:tournament.GameViewModel{result.Game.Uid.Hex(),result.Game.Name,result.Game.Image,result.Game.Logo,result.Game.Slug},				
		Plateform:tournament.PlateformViewModel{result.Plateform.Uid.Hex(),result.Plateform.Name,result.Plateform.Description},
		Format:           result.Format,
		IsPublic:         result.IsPublic,
		Statut:           result.Statut,
		Participant:      result.Participant,
	}

	return waggerViewModel, nil
}

func (w *waggerUsecase) FindAllWaggerHandler(pageNumber int64, limit int64) ([]WaggerViewModel, error) {
	results, err := w.waggerRepository.FindAllWaggerRepo(pageNumber, limit)

	if err != nil {
		return []WaggerViewModel{}, err
	}

	records, err := w.waggerRepository.CountWaggerRepository()

	if err != nil {
		return []WaggerViewModel{}, err
	}

	var res []WaggerViewModel

	for _, result := range results {
		waggerViewModel := WaggerViewModel{
			Uid:              result.Uid.Hex(),
			Date:             result.Date,
			Title:            result.Title,
			Description:      result.Description,
			Price:            result.Price,
			DeadlineDate:     result.DeadlineDate,
			GameWay:          result.GameWay,
			PriceParticipate: result.PriceParticipate,
			Game:tournament.GameViewModel{result.Game.Uid.Hex(),result.Game.Name,result.Game.Image,result.Game.Logo,result.Game.Slug},				
			Plateform:tournament.PlateformViewModel{result.Plateform.Uid.Hex(),result.Plateform.Name,result.Plateform.Description},
			Format:           result.Format,
			IsPublic:         result.IsPublic,
			Statut:           result.Statut,
			Records:          records,
			Participant:      result.Participant,
		}

		res = append(res, waggerViewModel)
	}

	return res, nil
}

func (w *waggerUsecase) UpdatedWaggerHandler(wagger *entity.Wagger) (interface{}, error) {
	result, err := w.waggerRepository.UpdatedWagger(wagger)

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (w *waggerUsecase) FindOneWaggerHandler(idQuery string) (entity.Wagger, error) {
	objectId, err := primitive.ObjectIDFromHex(idQuery)

	if err != nil {
		return entity.Wagger{}, err
	}

	result, err := w.waggerRepository.FindWaggerRepo(objectId)

	if err != nil {
		return entity.Wagger{}, err
	}

	return result, nil
}
