package delivery

import (
	"errors"
	"fmt"

	"github.com/antonio-nirina/go-grd/api/handler"
	"github.com/antonio-nirina/go-grd/api/user/entity"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Resolver interface {
	SavedUserResolver(params graphql.ResolveParams) (interface{}, error)
	FindOneUserResolver(params graphql.ResolveParams) (interface{}, error)
}

type resolver struct {
	userHandler handler.Usecase
}

func NewResolver(userUseCase handler.Usecase) Resolver {
	return &resolver{
		userHandler: userUseCase,
	}
}

func (r *resolver) SavedUserResolver(params graphql.ResolveParams) (interface{}, error) {
	fmt.Println("params", params)
	userEntity := entity.User{}
	password := params.Args["password"].(string)
	hashed := userEntity.CreatedHash(password)
	userSaved := &entity.User{
		Uid:       primitive.NewObjectID(),
		FirstName: params.Args["firstname"].(string),
		LastName:  params.Args["lastname"].(string),
		Password:  hashed,
		Username:  params.Args["username"].(string),
		Email:     params.Args["email"].(string),
		IsBanned:  false,
		Avatar:    params.Args["avatar"].(string),
		Language:  params.Args["language"].(string),
		Point:     entity.POINT,
	}

	res, err := r.userHandler.SavedUser(userSaved)

	if err != nil {
		return nil, err
	}

	return res, nil
}

func (r *resolver) FindOneUserResolver(params graphql.ResolveParams) (interface{}, error) {
	idQuery, isOK := params.Args["id"].(string)

	if !isOK {
		return nil, errors.New("id not valid")
	}

	res, err := r.userHandler.FindOneUser(idQuery)

	if err != nil {
		return nil, err
	}

	return res, nil
}
