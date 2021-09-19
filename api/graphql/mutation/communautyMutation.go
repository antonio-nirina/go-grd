package mutation

import (
	"github.com/graphql-go/graphql"
)

var streamingInputType  = graphql.NewInputObject(
	graphql.InputObjectConfig{
		Name:"StreamingInput",
		Fields: graphql.InputObjectConfigFieldMap{
			"stream": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
		},
	},
)


func createPublication() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.String,
		Description: "Publication create",
		Args: graphql.FieldConfigArgument{
			"streaming": &graphql.ArgumentConfig{
				Type: graphql.NewList(streamingInputType),
			},	
			"uidGame": &graphql.ArgumentConfig{
				Type: graphql.String,
			},			
		},			
		Resolve: cmtyResolver.CreatePublicationResolve,
	}
}

