package handler

import (
	"github.com/thoussei/antonio/api/home/entity"
	"github.com/thoussei/antonio/api/home/repository"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UsecaseHome interface {
	SavedHomeandler(asist *entity.Home) (interface{}, error)
	FindHomeHandler(idQuery string) (HomeViewModel, error)
	FindAllHomeHandler(pageNumber int64,limit int64) ([]HomeViewModel, error)
	RemovedHomeHandler(idQuery string) (interface{}, error)
}

type HomeViewModel struct {
	Uid        string 						`json:"uid"`
	Name      string             			`json:"name"`
	Content    []entity.HomeContent       `json:"content"`
	Records    int            				`json:"records"`
}

type homeUsecase struct {
	homeRepository repository.RepositoryHome
}

func NewUsecaseHome(a repository.RepositoryHome) UsecaseHome {
	return &homeUsecase{
		homeRepository: a,
	}
}

func (a *homeUsecase) SavedHomeandler(asist *entity.Home) (interface{}, error){
	_,err := a.homeRepository.SavedRepoHome(asist)

	if err != nil {
		return 0, err
	}

	return "Ok",nil
}

func (a *homeUsecase) FindHomeHandler(idQuery string) (HomeViewModel, error){
	objectId, err := primitive.ObjectIDFromHex(idQuery)
	
	if err != nil {
		return HomeViewModel{}, err
	}

	result, err := a.homeRepository.FindHomeRepo(objectId)

	if err != nil {
		return HomeViewModel{}, err
	}

	homeViewModel := HomeViewModel{
		Uid:result.Uid.Hex(),
		Name:result.Name,
		Content:result.Content,    			
	}

	return homeViewModel,nil
}

func (a *homeUsecase) FindAllHomeHandler(pageNumber int64,limit int64) ([]HomeViewModel, error){
	result, err := a.homeRepository.FindAllHomeRepo(pageNumber,limit)

	if err != nil {
		return []HomeViewModel{}, err
	}

	records,err := a.homeRepository.CountHomeRepository()

	if err != nil {
		return []HomeViewModel{}, err
	}

	var res []HomeViewModel

	for _,val := range result {
		homeViewModel := HomeViewModel{
			Uid:val.Uid.Hex(),
			Name:val.Name,
			Content:val.Content,
			Records:records,     			
		}

		res = append(res, homeViewModel)
	}

	return res,nil
}

func (a *homeUsecase) RemovedHomeHandler(idQuery string) (interface{}, error){
	objectId, err := primitive.ObjectIDFromHex(idQuery)
	_,err = a.homeRepository.RemovedRepoHome(objectId)

	if err != nil {
		return 0, err
	}

	return "Ok",nil
}

