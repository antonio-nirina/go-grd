package delivery

import (
	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/asistant/entity"
	"github.com/thoussei/antonio/api/asistant/handler"
	"go.mongodb.org/mongo-driver/bson/primitive"
)


type AsistResolver interface {
	SavedAsistResolver(params graphql.ResolveParams) (interface{}, error)
	FindAsistResolver(params graphql.ResolveParams) (interface{}, error)
	FindAllAsistResolver(params graphql.ResolveParams) (interface{}, error)
	// UpdatedAsistByUseResolver(params graphql.ResolveParams) (interface{}, error)
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
	titleHome, _ := params.Args["title"].(string)
	content, _ := params.Args["content"].(string)
	underTitle, _ := params.Args["underTitle"].(string)
	locationHome, _ := params.Args["location"].(string)

	home := &entity.Asistant{
		Uid: primitive.NewObjectID(),
		Title:titleHome,
		Location:locationHome,
		Content:content, 
		UnderTitle:underTitle,
		Statut:true,    			
	}

	res,err := h.asistHandler.SavedAsistHandler(home)

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
	homes,err :=  h.asistHandler.FindAllAsistHandler()

	if err != nil {
		return nil,err
	}

	return homes,nil
}

/*func (h *home) UpdatedHomeByUseResolver(params graphql.ResolveParams) (interface{}, error){
	uid, _ := params.Args["uid"].(string)
	home,err :=  h.homeHandler.FindHomeHandler(uid)

	if err != nil {
		return nil,err
	}

	_,err = h.homeHandler.UpdatedHomeHandler(uid)

	return home,nil
}*/