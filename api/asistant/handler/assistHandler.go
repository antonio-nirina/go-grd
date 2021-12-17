package handler

import (
	"github.com/thoussei/antonio/api/asistant/entity"
	"github.com/thoussei/antonio/api/asistant/repository"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UsecaseAsist interface {
	SavedAsistHandler(home *entity.Asistant) (interface{}, error)
	FindAsistHandler(idQuery string) (AsistViewModel, error)
	FindAllAsistHandler() ([]AsistViewModel, error)
	UpdatedStatutAsistHandler(idQuery string,statut bool) (interface{}, error)
}

type SubjectAssistModel struct {
	Title  string `json:"title"`
	Assist []AsistViewModel `json:"assist"`
	Statut  	bool           		`json:"statut"`
}

type AsistViewModel struct {
	Uid       	string 			 	`json:"uid"`
	Title     	string     `json:"title"`
	UnderTitle []SubjectViewModel `json:"underTitle"`
	Statut  	bool           		`json:"statut"`
}

type SubjectViewModel struct {
	Title     	string             `json:"title"`
	Content  	string             `json:"content"`
	Tag 		string 				`json:"tag"`
}

type asistUsecase struct {
	asistRepository repository.RepositoryAsist
}

func NewUsecaseAsist(h repository.RepositoryAsist) UsecaseAsist {
	return &asistUsecase{
		asistRepository: h,
	}
}

func (h *asistUsecase) SavedAsistHandler(asist *entity.Asistant) (interface{}, error) {

	_,err := h.asistRepository.SavedRepoAsistRepo(asist)

	if err != nil {
		return 0, err
	}

	return "Ok",nil
}

func (h *asistUsecase) FindAsistHandler(idQuery string) (AsistViewModel, error) {
	objectId, err := primitive.ObjectIDFromHex(idQuery)
	
	if err != nil {
		return AsistViewModel{}, err
	}

	result, err := h.asistRepository.FindAsistRepo(objectId)

	if err != nil {
		return AsistViewModel{}, err
	}

	var subject []SubjectViewModel

	for _,val := range result.UnderTitle {
		under := SubjectViewModel {
			Title:val.Title,
			Content:val.Content,
			Tag: val.Tag,
		}
		subject = append(subject, under)
	}

	asistViewModel := AsistViewModel{
		Uid: result.Uid.Hex(),
		Title:result.Title,
		UnderTitle:subject,
		Statut:result.Statut,      			
	}

	return asistViewModel,nil
}


func (h *asistUsecase) FindAllAsistHandler() ([]AsistViewModel, error) {
	result, err := h.asistRepository.FindAllAsistRepo()

	if err != nil {
		return []AsistViewModel{}, err
	}

	var res []AsistViewModel
	var subject []SubjectViewModel

	for _,val := range result {
		for _,itemSubject := range val.UnderTitle {
			under := SubjectViewModel {
				Title:itemSubject.Title,
				Content:itemSubject.Content,
				Tag: itemSubject.Tag,
			}
			subject = append(subject, under)
		}
	
		asistViewModel := AsistViewModel{
			Uid: val.Uid.Hex(),
			Title:val.Title,
			UnderTitle:subject,
			Statut:val.Statut,    		
		}

		res = append(res, asistViewModel)
	}
	
	return res,nil
}

func (h *asistUsecase) UpdatedStatutAsistHandler(uid string,statut bool) (interface{}, error) {
	objectId, err := primitive.ObjectIDFromHex(uid)

	if err != nil {
		return nil, err
	}

	result, err := h.asistRepository.FindAsistRepo(objectId)

	if err != nil {
		return AsistViewModel{}, err
	}

	result.Statut = statut
	_,err = h.asistRepository.UpdatedRepoAsist(&result)
	
	if err != nil {
		return nil, err
	}

	return "Ok",nil
}