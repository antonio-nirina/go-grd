package mutation

import (
	"github.com/graphql-go/graphql"
)


func createPublication() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.String,
		Description: "Publication create",
		Args: graphql.FieldConfigArgument{
			"streaming": &graphql.ArgumentConfig{
				Type: graphql.String,
			},	
			"uidGame": &graphql.ArgumentConfig{
				Type: graphql.String,
			},			
		},			
		Resolve: cmtyResolver.CreatePublicationResolve,
	}
}

