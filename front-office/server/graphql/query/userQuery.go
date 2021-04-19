package query

import (
	"github.com/graphql-go/graphql"

	schema "github.com/thoussei/antonio/front-office/server/graphql/resolver"
	"github.com/thoussei/antonio/front-office/server/graphql/types"
	"github.com/thoussei/antonio/front-office/server/graphql/user/handler"
	"github.com/thoussei/antonio/front-office/server/graphql/user/repository"
)

var UserRepo = repository.NewUserRepository{}
var UserUseCase = handler.NewUserUsecase(UserRepo)
var SchResolver = schema.NewResolver(UserUseCase)

func QueryUserById() graphql.ObjectConfig {
	return graphql.ObjectConfig{
		Name: "Query",
		Fields: graphql.Fields{
			"GetUserByID": &graphql.Field{
				Type:        types.UserSchemaType,
				Description: "Get User By uid",
				Args: graphql.FieldConfigArgument{
					"uid": &graphql.ArgumentConfig{
						Type: graphql.String,
					},
				},
				Resolve: SchResolver.GetUserByID,
			},
		},
	}
}
