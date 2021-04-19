package graphql

import (
	"github.com/graphql-go/graphql"
	schemaType "github.com/thoussei/antonio/front-office/server/graphql/types"
	"github.com/thoussei/antonio/front-office/server/user/handler"
	"github.com/thoussei/antonio/front-office/server/user/repository"
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
				Type:        schemaType.UserSchemaType,
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
		Name: "Mutation",
		Fields: graphql.Fields{
			"create": &graphql.Field{
				Type:        schemaType.UserSchemaType,
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
