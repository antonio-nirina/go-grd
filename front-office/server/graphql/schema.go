package graphql

import "github.com/graphql-go/graphql"

type Schema struct {
	userResolver Resolver
}

func (s Schema) Query() *graphql.Object {
	objectConfig := graphql.ObjectConfig{
		Name: "Query",
		Fields: graphql.Fields{
			"GetArticleByID": &graphql.Field{
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
