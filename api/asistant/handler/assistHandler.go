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
	FindAllAsistBySubjectHandler() ([]SubjectAssistModel, error)

	SavedSubjectHandler(subject *entity.Subject) (interface{}, error)
	FindSubjectHandler(idQuery string) (SubjectViewModel, error)
	FindAllSubjectHandler() ([]SubjectViewModel, error)
	// UpdatedAsistHandler(uid string) (interface{}, error)
}

type SubjectAssistModel struct {
	Title  string `json:"title"`
	Assist []AsistViewModel `json:"assist"`
}

type AsistViewModel struct {
	Uid       	string 			 	`json:"uid"`
	Title     	SubjectViewModel     `json:"title"`
	Location  	string             `json:"location"`
	Content   	string             `json:"content"`
	UnderTitle  string           	`json:"underTitle"`
	Statut  	bool           		`json:"statut"`
}

type SubjectViewModel struct {
	Uid       	string 			 	`json:"uid"`
	Title     	string             `json:"title"`
	Description  	string             `json:"description"`
	Statut  	bool           		`json:"statut"`
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

func (h *asistUsecase) SavedSubjectHandler(subject *entity.Subject) (interface{}, error) {

	_,err := h.asistRepository.SavedRepoSubjectRepo(subject)

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

	subject := SubjectViewModel{
		result.Title.Uid.Hex(),
		result.Title.Title,
		result.Title.Description,
		result.Title.Statut,
		result.Title.Tag,
	}

	asistViewModel := AsistViewModel{
		Uid: result.Uid.Hex(),
		Title:subject,
		Location:result.Location,
		Content:result.Content,
		UnderTitle:result.UnderTitle,
		Statut:result.Statut,      			
	}

	return asistViewModel,nil
}

func (h *asistUsecase) FindSubjectHandler(idQuery string) (SubjectViewModel, error) {
	objectId, err := primitive.ObjectIDFromHex(idQuery)
	
	if err != nil {
		return SubjectViewModel{}, err
	}

	result, err := h.asistRepository.FindSubjectRepo(objectId)

	if err != nil {
		return SubjectViewModel{}, err
	}

	subjViewModel := SubjectViewModel{
		Uid: result.Uid.Hex(),
		Title:result.Title,
		Description:result.Description,
		Statut:result.Statut,
		Tag:result.Tag,     			
	}

	return subjViewModel,nil
}

func (h *asistUsecase) FindAllAsistHandler() ([]AsistViewModel, error) {
	result, err := h.asistRepository.FindAllAsistRepo()

	if err != nil {
		return []AsistViewModel{}, err
	}

	var res []AsistViewModel

	for _,val := range result {
		subject := SubjectViewModel{
			val.Title.Uid.Hex(),
			val.Title.Title,
			val.Title.Description,
			val.Title.Statut,
			val.Title.Tag,
		}
		asistViewModel := AsistViewModel{
			Uid: val.Uid.Hex(),
			Title:subject,
			Location:val.Location,
			Content:val.Content,
			UnderTitle:val.UnderTitle,
			Statut:val.Statut,   		
		}

		res = append(res, asistViewModel)
	}
	
	return res,nil
}

func (h *asistUsecase) FindAllSubjectHandler() ([]SubjectViewModel, error) {
	result, err := h.asistRepository.FindAllSubjectRepo()
	if err != nil {
		return []SubjectViewModel{}, err
	}

	var res []SubjectViewModel

	for _,val := range result {
		subViewModel := SubjectViewModel{
			Uid: val.Uid.Hex(),
			Title:val.Title,
			Description:val.Description,
			Statut:val.Statut,
			Tag:val.Tag,  		
		}

		res = append(res, subViewModel)
	}
	
	return res,nil
}

func (h *asistUsecase) FindAllAsistBySubjectHandler() ([]SubjectAssistModel, error) {
	subjects, err := h.asistRepository.FindAllSubjectRepo()
	
	if err != nil {
		return []SubjectAssistModel{}, err
	}

	subAss := make(map[string][]AsistViewModel)

	for _,val := range subjects {
		result, err := h.asistRepository.FindAllAsistBySubjectRepo(val.Uid)
		
		if err != nil {
			return []SubjectAssistModel{}, err
		}
		var aRes []AsistViewModel

		for _,valAssist := range result {
			subject := SubjectViewModel{
				valAssist.Title.Uid.Hex(),
				valAssist.Title.Title,
				valAssist.Title.Description,
				valAssist.Title.Statut,
				valAssist.Title.Tag,
			}
			asistViewModel := AsistViewModel{
				Uid: valAssist.Uid.Hex(),
				Title:subject,
				Location:valAssist.Location,
				Content:valAssist.Content,
				UnderTitle:valAssist.UnderTitle,
				Statut:valAssist.Statut,   		
			}

			aRes = append(aRes, asistViewModel)
		}
		
		subAss[val.Title] = aRes
	}

	var arraySub []SubjectAssistModel

	for key,val := range subAss {
		resSub := SubjectAssistModel{
			Title:key,
			Assist:val,
		}
		arraySub = append(arraySub, resSub)
	}
	
	return arraySub,nil
}

/*func (h *asistUsecase) UpdatedAsistHandler(uid string) (interface{}, error) {
	objectId, err := primitive.ObjectIDFromHex(uid)

	if err != nil {
		return nil, err
	}

	result, err := h.asistRepository.FindAsistRepo(objectId)

	if err != nil {
		return AsistViewModel{}, err
	}

	home := &entity.Asistant{
		Uid: result.Uid,
		Title:result.Title,
		Location:result.Location,
		Content:result.Content,
		UnderTitle:result.UnderTitle,
		Statut:result.Statut,   	     			
	}
	 
	_,err = h.asistRepository.UpdatedRepoAsist(home)
	
	if err != nil {
		return nil, err
	}

	return "Ok",nil
}*/