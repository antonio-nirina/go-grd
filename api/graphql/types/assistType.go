package types

import (
	"github.com/graphql-go/graphql"
)

var AssistSchemaType = graphql.NewObject(graphql.ObjectConfig{
	Name: "AssistType",
	Fields: graphql.Fields{
		"uid": &graphql.Field{
			Type: graphql.String,
		},
		"title": &graphql.Field{
			Type: graphql.String,
		},
		"location": &graphql.Field{
			Type: graphql.String,
		},
		"content": &graphql.Field{
			Type: graphql.String,
		},
		"underTitle":&graphql.Field{
			Type: graphql.String,
		},
		"statut":&graphql.Field{
			Type: graphql.Boolean,
		},
	},
})

var SubjectSchemaType = graphql.NewObject(graphql.ObjectConfig{
	Name: "SubjectType",
	Fields: graphql.Fields{
		"uid": &graphql.Field{
			Type: graphql.String,
		},
		"title": &graphql.Field{
			Type: graphql.String,
		},
		"description": &graphql.Field{
			Type: graphql.String,
		},
	},
})
