package mutation

import (
	"github.com/graphql-go/graphql"
)

func createSupport() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.String,
		Description: "Support content create",
		Args: graphql.FieldConfigArgument{
			"created": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"updated": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"user": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"content": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		Resolve: supportResolver.CreatedSupportResolver,
	}
}
