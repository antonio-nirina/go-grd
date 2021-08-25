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
			Type: SubjectSchemaType,
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
		"statut":&graphql.Field{
			Type: graphql.Boolean,
		},
		"tag": &graphql.Field{
			Type: graphql.String,
		},
	},
})

var SubjectAssistSchemaType = graphql.NewObject(graphql.ObjectConfig{
	Name: "SubjectAssist",
	Fields: graphql.Fields{
		"title": &graphql.Field{
			Type: graphql.NewList(AssistSchemaType), 
		},
	},
})
