package types

import (
	"github.com/graphql-go/graphql"
)

var contentSchemaType  = graphql.NewObject(graphql.ObjectConfig{
	Name: "ContentAssistType",
	Fields: graphql.Fields{
		"Title": &graphql.Field{
			Type: graphql.String,
		},
		"TitleUnder": &graphql.Field{
			Type: graphql.String,
		},
		"Incontent": &graphql.Field{
			Type: graphql.String,
		},
	},
})

var AssistSchemaType = graphql.NewObject(graphql.ObjectConfig{
	Name: "AssistType",
	Fields: graphql.Fields{
		"uid": &graphql.Field{
			Type: graphql.String,
		},
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"Content": &graphql.Field{
			Type: graphql.NewList(contentSchemaType),
		},
	},
})