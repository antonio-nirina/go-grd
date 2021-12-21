package delivery

import (
	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/support/entity"
	"github.com/thoussei/antonio/api/support/handler"
	userHandler "github.com/thoussei/antonio/api/user/handler"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type SUpportResolver interface {
	CreatedSupportResolver(params graphql.ResolveParams) (interface{}, error)
	FindSupportResolver(params graphql.ResolveParams) (interface{}, error)
}

type support struct {
	supportHandler handler.UsecaseSupport
	userHandler    userHandler.Usecase
}

func NewResolverSupport(supportHandler handler.UsecaseSupport, userHandler userHandler.Usecase) SUpportResolver {
	return &support{
		supportHandler: supportHandler,
		userHandler:    userHandler,
	}
}

func (s *support) CreatedSupportResolver(params graphql.ResolveParams) (interface{}, error) {
	created, _ := params.Args["created"].(string)
	updated, _ := params.Args["updated"].(string)
	user, _ := params.Args["user"].(string)
	content, _ := params.Args["content"].(string)

	support := &entity.Support{
		Uid:     primitive.NewObjectID(),
		Created: created,
		Updated: updated,
		User:    user,
		Content: content,
	}

	res, err := s.supportHandler.SavedSupportHandler(support)

	if err != nil {
		return nil, err
	}

	return res, nil
}

func (s *support) FindSupportResolver(params graphql.ResolveParams) (interface{}, error) {
	uid, _ := params.Args["uid"].(string)
	rate, err := s.supportHandler.FindSupportHandler(uid)

	if err != nil {
		return nil, err
	}

	return rate, nil
}
