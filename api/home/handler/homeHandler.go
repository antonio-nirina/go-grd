package handler

import (
	"github.com/thoussei/antonio/api/home/entity"
	"github.com/thoussei/antonio/api/home/repository"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UsecaseHome interface {
	SavedHomeHandler(home *entity.Home) (interface{}, error)
	FindHomeHandler(idQuery string) (HomeViewModel, error)
	FindAllHomeHandler() ([]HomeViewModel, error)
	UpdatedHomeHandler(uid string) (interface{}, error)
}

type HomeViewModel struct {
	Uid       	string 			 	`json:"uid"`
	Title     	string             `json:"title"`
	Location  	string             `json:"location"`
	Content   	string             `json:"content"`
	UnderTitle  string           	`json:"underTitle"`
	Statut  	bool           		`json:"statut"`
}

type homeUsecase struct {
	homeRepository repository.RepositoryHome
}

func NewUsecaseHome(h repository.RepositoryHome) UsecaseHome {
	return &homeUsecase{
		homeRepository: h,
	}
}

func (h *homeUsecase) SavedHomeHandler(cmty *entity.Home) (interface{}, error) {

	_,err := h.homeRepository.SavedRepoHomeHandler(cmty)

	if err != nil {
		return 0, err
	}

	return "Ok",nil
}

func (h *homeUsecase) FindHomeHandler(idQuery string) (HomeViewModel, error) {
	objectId, err := primitive.ObjectIDFromHex(idQuery)
	
	if err != nil {
		return HomeViewModel{}, err
	}

	result, err := h.homeRepository.FindHomeRepo(objectId)

	if err != nil {
		return HomeViewModel{}, err
	}

	homeViewModel := HomeViewModel{
		Uid: result.Uid.Hex(),
		Title:result.Title,
		Location:result.Location,
		Content:result.Content,
		UnderTitle:result.UnderTitle,
		Statut:result.Statut,      			
	}

	return homeViewModel,nil
}

func (h *homeUsecase) FindAllHomeHandler() ([]HomeViewModel, error) {
	result, err := h.homeRepository.FindAllHomeRepo()

	if err != nil {
		return []HomeViewModel{}, err
	}

	var res []HomeViewModel

	for _,val := range result {
		homeViewModel := HomeViewModel{
			Uid: val.Uid.Hex(),
			Title:val.Title,
			Location:val.Location,
			Content:val.Content,
			UnderTitle:val.UnderTitle,
			Statut:val.Statut,   		
		}

		res = append(res, homeViewModel)
	}
	
	return res,nil
}

func (h *homeUsecase) UpdatedHomeHandler(uid string) (interface{}, error) {
	objectId, err := primitive.ObjectIDFromHex(uid)

	if err != nil {
		return nil, err
	}

	result, err := h.homeRepository.FindHomeRepo(objectId)

	if err != nil {
		return HomeViewModel{}, err
	}

	home := &entity.Home{
		Uid: result.Uid,
		Title:result.Title,
		Location:result.Location,
		Content:result.Content,
		UnderTitle:result.UnderTitle,
		Statut:result.Statut,   	     			
	}
	 
	_,err = h.homeRepository.UpdatedRepoHome(home)
	
	if err != nil {
		return nil, err
	}

	return "Ok",nil
}