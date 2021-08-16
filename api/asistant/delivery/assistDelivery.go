package delivery

import (
	"encoding/json"

	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/asistant/entity"
	"github.com/thoussei/antonio/api/asistant/handler"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type inputAddAsist struct {
	AssistInput assistInputEl `json:"assistInput"`
}

type assistInputEl struct {
	Name string `json:"name"`
	Content [] assistElements `json:"content"`
}

type assistElements struct {
	Title string `json:"title"`
	TitleUnder string `json:"titleUnder"`
	Incontent string `json:"incontent"`
}


type AsistResolver interface {
	SavedAsistResolver(params graphql.ResolveParams) (interface{}, error)
	FindAsistResolver(params graphql.ResolveParams) (interface{}, error)
	FindAllAsistResolver(params graphql.ResolveParams) (interface{}, error)
	RemovedAsistByResolver(params graphql.ResolveParams) (interface{}, error)
}

type asist struct {
	asistHandler handler.UsecaseAsist
}

func NewResolverAsist(asistUseCase handler.UsecaseAsist) AsistResolver {
	return &asist{
		asistHandler: asistUseCase,
	}
}

func (a *asist) SavedAsistResolver(params graphql.ResolveParams) (interface{}, error){
	var cnts [] entity.AssistContent
	jsonString, _ := json.Marshal(params.Args)
	inputs := inputAddAsist{}
	json.Unmarshal([]byte(jsonString), &inputs)

	for _,val := range inputs.AssistInput.Content{
		cnts = append(cnts,entity.AssistContent{Title:val.Title,TitleUnder:val.TitleUnder,Incontent:val.Incontent})
	}
	asist := &entity.Asistant{
		Uid: primitive.NewObjectID(),
		Name:inputs.AssistInput.Name,
		Content:cnts,  			
	}

	res,err := a.asistHandler.SavedAsistandler(asist)

	if err != nil {
		return nil, err
	}

	return res,nil
}

func (t *asist) FindAsistResolver(params graphql.ResolveParams) (interface{}, error){
	uidAsist, _ := params.Args["uid"].(string)
	asist,err := t.asistHandler.FindAsistHandler(uidAsist)

	if err != nil {
		return nil,err
	}

	return asist,nil
}

func (t *asist) FindAllAsistResolver(params graphql.ResolveParams) (interface{}, error){
	limit, _ := params.Args["limit"].(int)
	pageNumber, _ := params.Args["pageNumber"].(int)

	if pageNumber == 0 && limit > 0{
		pageNumber = 1
	}

	asists,err :=  t.asistHandler.FindAllAsistHandler(int64(pageNumber),int64(limit))

	if err != nil {
		return nil,err
	}

	return asists,nil
}

func (t *asist) RemovedAsistByResolver(params graphql.ResolveParams) (interface{}, error){
	uid, _ := params.Args["uid"].(string)
	_,err :=  t.asistHandler.FindAsistHandler(uid)
	
	if err != nil {
		return nil,err
	}
	 

	asist,err := t.asistHandler.RemovedAsistHandler(uid)

	return asist,nil
}