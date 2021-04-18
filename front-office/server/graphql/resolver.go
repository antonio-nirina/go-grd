package graphql

import (
	"context"
	"fmt"

	"github.com/graphql-go/graphql"
	gameEntity "github.com/thoussei/antonio/front-office/server/games/entity"
	"github.com/thoussei/antonio/front-office/server/user/entity"
	"github.com/thoussei/antonio/front-office/server/user/handler"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type resolver struct {
	userHandler handler.UserUseCase
}

type Resolver interface {
	GetUserByID(params graphql.ResolveParams) (interface{}, error)

	StoreUser(params graphql.ResolveParams) (interface{}, error)
}

func newResolver(userService handler.UserUseCase) Resolver {
	return &resolver{
		userHandler: userService,
	}
}

func (u *resolver) GetUserByID(p graphql.ResolveParams) (interface{}, error) {
	var id string
	var ok bool

	if id, ok = p.Args["id"].(string); !ok || id == "" {
		return nil, fmt.Errorf("id is not blank")
	}

	ctx := context.Background()
	result, err := u.userHandler.GetByIdUsecase(ctx, id)

	if err != nil {
		return nil, err
	}

	return *result, nil
}

func (r *resolver) StoreUser(params graphql.ResolveParams) (interface{}, error) {
	user := &entity.User{
		Uid:           primitive.NewObjectID().String(),
		FirstName:     params.Args["firstName"].(string),
		LastName:      params.Args["lastName"].(string),
		Password:      params.Args["password"].(string),
		Username:      params.Args["username"].(string),
		IsBanned:      params.Args["is_banned"].(bool),
		Avatar:        params.Args["avatar"].(string),
		Language:      params.Args["language"].(string),
		IdGameAccount: params.Args["gameAccount"].([]gameEntity.GameAccount),
		Point:         params.Args["point"].(int),
	}
	ctx := context.Background()
	res, err := r.userHandler.SaveUseCase(ctx, *user)

	if err != nil {
		return nil, err
	}

	return res, nil
}
