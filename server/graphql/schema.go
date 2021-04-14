package graphql

import "github.com/graphql-go/graphql"

type Schema struct {
	userResolver Resolver
}

func (s Schema) Query() *graphql.Object {
	objectConfig := graphql.ObjectConfig{
		Name: "Query",
		Fields: graphql.Fields{
			"GetUserByID": &graphql.Field{
				Type:        UserGraphQL,
				Description: "Get User By ID",
				Args: graphql.FieldConfigArgument{
					"id": &graphql.ArgumentConfig{
						Type: graphql.String,
					},
				},
				Resolve: s.userResolver.GetUserByID,
			},
		},
	}

	return graphql.NewObject(objectConfig)
}

func (s Schema) Mutation() *graphql.Object {
	objectConfig := graphql.ObjectConfig{
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
				},
				Resolve: s.userResolver.StoreUser,
			},
		},
	}

	return graphql.NewObject(objectConfig)
}
