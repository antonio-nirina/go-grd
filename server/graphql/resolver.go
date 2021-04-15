package graphql

import (
	"context"
	"fmt"

	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/front-office/server/user/handler"
)

type userUseCase struct {
	userHandler handler.Usecase
}

type Resolver interface {
	GetUserByID(params graphql.ResolveParams) (interface{}, error)

	StoreUser(params graphql.ResolveParams) (interface{}, error)
}

func (u *userUseCase) GetUserByID(p graphql.ResolveParams) (interface{}, error) {
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
