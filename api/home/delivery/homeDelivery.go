package delivery

import (
	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/home/entity"
	"github.com/thoussei/antonio/api/home/handler"
	"go.mongodb.org/mongo-driver/bson/primitive"
)


type HomeResolver interface {
	SavedHomeResolver(params graphql.ResolveParams) (interface{}, error)
	FindHomeResolver(params graphql.ResolveParams) (interface{}, error)
	FindAllHomeResolver(params graphql.ResolveParams) (interface{}, error)
	UpdatedHomeByUseResolver(params graphql.ResolveParams) (interface{}, error)
}

type home struct {
	homeHandler handler.UsecaseHome
}

func NewResolverHome(homeUseCase handler.UsecaseHome) HomeResolver {
	return &home{
		homeHandler: homeUseCase,
	}
}

func (h *home) SavedHomeResolver(params graphql.ResolveParams) (interface{}, error){
	titleHome, _ := params.Args["title"].(string)
	content, _ := params.Args["content"].(string)
	underTitle, _ := params.Args["underTitle"].(string)
	locationHome, _ := params.Args["location"].(string)

	home := &entity.Home{
		Uid: primitive.NewObjectID(),
		Title:titleHome,
		Location:locationHome,
		Content:content, 
		UnderTitle:underTitle,
		Statut:true,    			
	}

	res,err := h.homeHandler.SavedHomeHandler(home)

	if err != nil {
		return nil, err
	}

	return res,nil
}

func (h *home) FindHomeResolver(params graphql.ResolveParams) (interface{}, error){
	idHome, _ := params.Args["uid"].(string)
	home,err := h.homeHandler.FindHomeHandler(idHome)

	if err != nil {
		return nil,err
	}

	return home,nil
}

func (h *home) FindAllHomeResolver(params graphql.ResolveParams) (interface{}, error){
	homes,err :=  h.homeHandler.FindAllHomeHandler()

	if err != nil {
		return nil,err
	}

	return homes,nil
}

func (h *home) UpdatedHomeByUseResolver(params graphql.ResolveParams) (interface{}, error){
	uid, _ := params.Args["uid"].(string)
	home,err :=  h.homeHandler.FindHomeHandler(uid)

	if err != nil {
		return nil,err
	}

	_,err = h.homeHandler.UpdatedHomeHandler(uid)

	return home,nil
}