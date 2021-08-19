package types

import (
	"github.com/graphql-go/graphql"
)


var contentSchemaType  = graphql.NewObject(graphql.ObjectConfig{
	Name: "ContentAssistType",
	Fields: graphql.Fields{
		"uid": &graphql.Field{
			Type: graphql.String,
		},
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

var HomeSchemaType  = graphql.NewObject(graphql.ObjectConfig{
	Name: "HomeType",
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