package mutation

import (
	"github.com/graphql-go/graphql"
)

var streamingInputType = graphql.NewInputObject(
	graphql.InputObjectConfig{
		Name: "StreamingInput",
		Fields: graphql.InputObjectConfigFieldMap{
			"videoId": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"viewerCount": &graphql.InputObjectFieldConfig{
				Type: graphql.Int,
			},
			"createdAt": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"thumbnailUrl": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"creatorName": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"title": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"gameId": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"gameName": &graphql.InputObjectFieldConfig{
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
			"nameGame": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		Resolve: cmtyResolver.CreatePublicationResolve,
	}
}
