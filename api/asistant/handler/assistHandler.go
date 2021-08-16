package handler

import (
	"github.com/thoussei/antonio/api/asistant/entity"
	"github.com/thoussei/antonio/api/asistant/repository"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UsecaseAsist interface {
	SavedAsistandler(asist *entity.Asistant) (interface{}, error)
	FindAsistHandler(idQuery string) (AsistViewModel, error)
	FindAllAsistHandler(pageNumber int64,limit int64) ([]AsistViewModel, error)
	RemovedAsistHandler(idQuery string) (interface{}, error)
}

type AsistViewModel struct {
	Uid        string 						`json:"uid"`
	Name      string             			`json:"name"`
	Content    []entity.AssistContent       `json:"content"`
	Records    int            				`json:"records"`
}

type asistUsecase struct {
	asistRepository repository.RepositoryAsist
}

func NewUsecaseAsist(a repository.RepositoryAsist) UsecaseAsist {
	return &asistUsecase{
		asistRepository: a,
	}
}

func (a *asistUsecase) SavedAsistandler(asist *entity.Asistant) (interface{}, error){
	_,err := a.asistRepository.SavedRepoAsist(asist)

	if err != nil {
		return 0, err
	}

	return "Ok",nil
}

func (a *asistUsecase) FindAsistHandler(idQuery string) (AsistViewModel, error){
	objectId, err := primitive.ObjectIDFromHex(idQuery)
	
	if err != nil {
		return AsistViewModel{}, err
	}

	result, err := a.asistRepository.FindAsistRepo(objectId)

	if err != nil {
		return AsistViewModel{}, err
	}

	asistViewModel := AsistViewModel{
		Uid:result.Uid.Hex(),
		Name:result.Name,
		Content:result.Content,    			
	}

	return asistViewModel,nil
}

func (a *asistUsecase) FindAllAsistHandler(pageNumber int64,limit int64) ([]AsistViewModel, error){
	result, err := a.asistRepository.FindAllAsistRepo(pageNumber,limit)

	if err != nil {
		return []AsistViewModel{}, err
	}

	records,err := a.asistRepository.CountAsistRepository()

	if err != nil {
		return []AsistViewModel{}, err
	}

	var res []AsistViewModel

	for _,val := range result {
		asistViewModel := AsistViewModel{
			Uid:val.Uid.Hex(),
			Name:val.Name,
			Content:val.Content,
			Records:records,     			
		}

		res = append(res, asistViewModel)
	}

	return res,nil
}

func (a *asistUsecase) RemovedAsistHandler(idQuery string) (interface{}, error){
	objectId, err := primitive.ObjectIDFromHex(idQuery)
	_,err = a.asistRepository.RemovedRepoAsist(objectId)

	if err != nil {
		return 0, err
	}

	return "Ok",nil
}

