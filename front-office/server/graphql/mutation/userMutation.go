package mutation

import (
	"github.com/graphql-go/graphql"

	myGraph "github.com/thoussei/antonio/front-office/server/graphql"
	"github.com/thoussei/antonio/front-office/server/graphql/types"
)

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
				Resolve: myGraph.SchResolver.StoreUser,
			},
		},
	}
}
