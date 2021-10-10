package mutation

import (
	"github.com/graphql-go/graphql"
)

var StreamingInputType = graphql.NewInputObject(
	graphql.InputObjectConfig{
		Name: "StreamingInput",
		Fields: graphql.InputObjectConfigFieldMap{
			"id": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
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
				Type: graphql.NewList(StreamingInputType),
			},
			"uidGame": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		Resolve: cmtyResolver.CreatePublicationResolve,
	}
}

func EditStatutPublication() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.String,
		Description: "Publication edit",
		Args: graphql.FieldConfigArgument{
			"uid": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		Resolve: cmtyResolver.EditStatutPublicationResolve,
	}
}

func RemovePublication() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.String,
		Description: "Publication remove",
		Args: graphql.FieldConfigArgument{
			"uid": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		Resolve: cmtyResolver.RemovePublicationResolve,
	}
}
