package mutation

import (
	"github.com/graphql-go/graphql"
)


func createPublication() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.String,
		Description: "Publication create",
		Args: graphql.FieldConfigArgument{
			"uidUser": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"title": &graphql.ArgumentConfig{
				Type: graphql.String,
			},	
			"content": &graphql.ArgumentConfig{
				Type: graphql.String,
			},			
		},			
		Resolve: cmtyResolver.CreatePublicationResolve,
	}
}

