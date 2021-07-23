package delivery

import (
	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/community/entity"
	"github.com/thoussei/antonio/api/community/handler"
	userHandler "github.com/thoussei/antonio/api/user/handler"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type CmtyResolve interface {
	CreatePublicationResolve(params graphql.ResolveParams) (interface{}, error)
	FindCmtyResolver(params graphql.ResolveParams) (interface{}, error)
	FindAllCmtytResolver(params graphql.ResolveParams) (interface{}, error)
}

type cmty struct {
	cmtyHandler handler.UsecaseCmty
	cmtyUserHandler userHandler.Usecase
}

func NewResolverCmty(cmtyUseCase handler.UsecaseCmty,userUsecase userHandler.Usecase) CmtyResolve {
	return &cmty{
		cmtyHandler: cmtyUseCase,
		cmtyUserHandler:userUsecase,
	}
}

func (c *cmty) CreatePublicationResolve(params graphql.ResolveParams) (interface{}, error) {
	uid, _ := params.Args["uidUser"].(string)
	title, _ := params.Args["title"].(string)
	content, _ := params.Args["content"].(string)
	user,err := c.cmtyUserHandler.FindOneUserByUid(uid)
	
	if err != nil {
		return nil,err
	}

	cmty := &entity.Communauty{
		Uid:primitive.NewObjectID(),
		Title:title,
		User:user,
		Content:content,
	}

	res, err := c.cmtyHandler.CreatePublicationHandler(cmty)

	if err != nil {
		return nil, err
	}

	return res, nil
}

func (c *cmty) FindCmtyResolver(params graphql.ResolveParams) (interface{}, error) {
	uid, _ := params.Args["uid"].(string)
	res, err := c.cmtyHandler.FindCmtyHandler(uid)

	if err != nil {
		return nil, err
	}


	return res, nil
} 

func (c *cmty) FindAllCmtytResolver(params graphql.ResolveParams) (interface{}, error) {
	limit, _ := params.Args["limit"].(int)
	pageNumber, _ := params.Args["pageNumber"].(int)

	if pageNumber == 0 && limit > 0{
		pageNumber = 1
	}

	res, err := c.cmtyHandler.FindAllCmtyHandler(int64(pageNumber),int64(limit))

	if err != nil {
		return nil, err
	}

	return res, nil
} 