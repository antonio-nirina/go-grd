package mutation

import (
	"github.com/graphql-go/graphql"

	schema "github.com/thoussei/antonio/front-office/server/graphql/resolver"
	"github.com/thoussei/antonio/front-office/server/graphql/types"
	"github.com/thoussei/antonio/front-office/server/user/handler"
	"github.com/thoussei/antonio/front-office/server/user/repository"
)

var UserRepo = repository.NewUserRepository{}
var UserUseCase = handler.NewUserUsecase(UserRepo)
var SchResolver = schema.NewResolver(UserUseCase)

func CreatedUser() graphql.ObjectConfig {
	return graphql.ObjectConfig{
		Name: "Mutation",
		Fields: graphql.Fields{
			"createUser": &graphql.Field{
				Type:        types.UserSchemaType,
				Description: "Create a new user",
				Args: graphql.FieldConfigArgument{
					"uid": &graphql.ArgumentConfig{
						Type: graphql.String,
					},
					"firstName": &graphql.ArgumentConfig{
						Type: graphql.String,
					},
					"password": &graphql.ArgumentConfig{
						Type: graphql.String,
					},
					"username": &graphql.ArgumentConfig{
						Type: graphql.String,
					},
					"isBanned": &graphql.ArgumentConfig{
						Type: graphql.Boolean,
					},
					"avatar": &graphql.ArgumentConfig{
						Type: graphql.String,
					},
					"language": &graphql.ArgumentConfig{
						Type: graphql.String,
					},
					"point": &graphql.ArgumentConfig{
						Type: graphql.Int,
					},
					"gameAccount": &graphql.ArgumentConfig{
						Type: types.GameAccountType,
					},
				},
				Resolve: SchResolver.StoreUser,
			},
		},
	}
}
