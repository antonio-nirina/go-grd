package handler

import (
	"github.com/thoussei/antonio/api/wagger/entity"
	"github.com/thoussei/antonio/api/wagger/repository"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UsecaseWagger interface {
	SavedWaggerHandle(wagger *entity.Wagger) (interface{}, error)
	FindWaggerHandler(idQuery string) (WaggerViewModel, error)
	FindAllWaggerHandler(pageNumber int64,limit int64) ([]WaggerViewModel, error)
}

type WaggerViewModel struct {
	Uid           			string 	`json:"uid"`
	Date 					string `json:"date"`
	Title 					string `json:"title"`
	Description 			string `json:"description"`
	Price 					float64 `json:"price"`
	DeadlineDate 			string `json:"deadlineDate"`
	GameWay 				string `json:"gameWay"`
	Entry 					string `json:"entry"`
	PriceParticipate 		float64  `json:"priceParticipate"`
	Format 					string `json:"format"`
	IsPublic 				bool `json:"IsPublic"`
	Statut 		  			bool `json:"statut"`
}

type waggerUsecase struct {
	waggerRepository repository.RepositoryWagger
}

func NewUsecaseWagger(w repository.RepositoryWagger) UsecaseWagger {
	return &waggerUsecase{
		waggerRepository: w,
	}
}

func (w *waggerUsecase) SavedWaggerHandle(wagger *entity.Wagger) (interface{}, error){

}

func (w *waggerUsecase) FindWaggerHandler(idQuery string) (WaggerViewModel, error){

}

func (w *waggerUsecase) FindAllWaggerHandler(pageNumber int64,limit int64) ([]WaggerViewModel, error){

}
