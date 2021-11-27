package delivery

import (
	"encoding/json"

	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/group/entity"
	"github.com/thoussei/antonio/api/group/handler"
	userHandler "github.com/thoussei/antonio/api/user/handler"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type GroupResolver interface {
	SavedGroupResolver(params graphql.ResolveParams) (interface{}, error)
}

type group struct {
	groupHandler handler.UsecaseGroup
	user userHandler.Usecase
}

func NewResolverGroup(groupUseCase handler.UsecaseGroup, userGroup userHandler.Usecase) GroupResolver {
	return &group{
		groupHandler:     groupUseCase,
		user: userGroup,
	}
}

type usersElements struct {
	UidUser []string `json:"uidUser"`
}


func (g *group) SavedGroupResolver(params graphql.ResolveParams) (interface{}, error) {
	lead, _ := params.Args["lead"].(string)
	subject, _ := params.Args["subject"].(string)
	jsonString, _ := json.Marshal(params.Args["uidUser"])
	users := usersElements{}
	json.Unmarshal([]byte(jsonString), &users)
	user, err := g.user.FindOneUserByUid(lead)

	if err != nil {
		return nil, err
	}

	var userObject []string

	for _, val := range users.UidUser {
		userGroup, err := g.user.FindOneUserByUid(val)

		if err != nil {
			return nil, err
		}

		userObject = append(userObject,userGroup.Uid.Hex())
	}

	group := &entity.Group{
		Uid:primitive.NewObjectID(),
		Lead:user,
		Users:userObject,
		Subject:subject,
	}

	res, err := g.groupHandler.SavedGroupHandler(group)

	if err != nil {
		return nil, err
	}

	return res, nil
}