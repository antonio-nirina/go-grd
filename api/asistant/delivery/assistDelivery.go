package delivery

import (
	"encoding/json"

	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/asistant/entity"
	"github.com/thoussei/antonio/api/asistant/handler"
	"go.mongodb.org/mongo-driver/bson/primitive"
)


type AsistResolver interface {
	SavedAsistResolver(params graphql.ResolveParams) (interface{}, error)
	FindAsistResolver(params graphql.ResolveParams) (interface{}, error)
	FindAllAsistResolver(params graphql.ResolveParams) (interface{}, error)
	UpdatedStatutAsistResolver(params graphql.ResolveParams) (interface{}, error)
}

type inputAddAssist struct {
	AssistInput []assistInputEl `json:"assistInput"`
}

type assistInputEl struct {
	Title string         `json:"title"`
	Content string         `json:"content"`
	Tag string         `json:"tag"`
}

type asist struct {
	asistHandler handler.UsecaseAsist
}

func NewResolverAsist(asistUseCase handler.UsecaseAsist) AsistResolver {
	return &asist{
		asistHandler: asistUseCase,
	}
}

func (h *asist) SavedAsistResolver(params graphql.ResolveParams) (interface{}, error){
	title, _ := params.Args["title"].(string)
	jsonString, _ := json.Marshal(params.Args)
	inputs := inputAddAssist{}
	json.Unmarshal([]byte(jsonString), &inputs)
	var subj []entity.Subject

	for _,val := range inputs.AssistInput{
		newTitle := entity.Subject{   
			Title:val.Title,
			Content:val.Content,
			Tag:val.Tag,
		}
		subj = append(subj, newTitle)
	}
	
	asist := &entity.Asistant{
		Uid: primitive.NewObjectID(),
		Title:title,
		UnderTitle:subj,
		Statut:true,    			
	}

	res,err := h.asistHandler.SavedAsistHandler(asist)

	if err != nil {
		return nil, err
	}

	return res,nil
}

func (h *asist) FindAsistResolver(params graphql.ResolveParams) (interface{}, error){
	idHome, _ := params.Args["uid"].(string)
	home,err := h.asistHandler.FindAsistHandler(idHome)

	if err != nil {
		return nil,err
	}

	return home,nil
}

func (h *asist) FindAllAsistResolver(params graphql.ResolveParams) (interface{}, error){
	assists,err :=  h.asistHandler.FindAllAsistHandler()

	if err != nil {
		return nil,err
	}

	return assists,nil
}

func (h *asist) UpdatedStatutAsistResolver(params graphql.ResolveParams) (interface{}, error){
	uid, _ := params.Args["uid"].(string)
	statut, _ := params.Args["statut"].(bool)
	_,err :=  h.asistHandler.FindAsistHandler(uid)

	if err != nil {
		return nil,err
	}

	resp,err := h.asistHandler.UpdatedStatutAsistHandler(uid,statut)

	return resp,nil
}