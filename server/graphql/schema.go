package graphql

import (
	"github.com/graphql-go/graphql"
	gameEntity "github.com/thoussei/antonio/front-office/server/games/entity"
	"github.com/thoussei/antonio/front-office/server/user/handler"
	"github.com/thoussei/antonio/front-office/server/user/repository"
	"github.com/thoussei/antonio/front-office/server/graphql/type"
)

// Struct for implementation Interface graphql

type Schema struct {
	userResolver Resolver
}

var userRepo = repository.NewUserRepository{}
var userUseCase = handler.NewUserUsecase(userRepo)
var schResolver = newResolver(userUseCase)

func Query() *graphql.Object {
	objectConfig := graphql.ObjectConfig{
		Name: "Query",
		Fields: graphql.Fields{
			"GetUserByID": &graphql.Field{
				Type:        UserGraphQL,
				Description: "Get User By uid",
				Args: graphql.FieldConfigArgument{
					"uid": &graphql.ArgumentConfig{
						Type: graphql.String,
					},
				},
				Resolve: schResolver.GetUserByID,
			},
		},
	}

	return graphql.NewObject(objectConfig)
}

func Mutation() *graphql.Object {
	objectConfig := graphql.ObjectConfig{
		Type: type.UserSchemaType
		Name: "Mutation",
		Fields: graphql.Fields{
			"create": &graphql.Field{
				Type:        graphql.String,
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
					"is_banned": &graphql.ArgumentConfig{
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
				},
				Resolve: schResolver.StoreUser,
			},
		},
	}

	return graphql.NewObject(objectConfig)
}
