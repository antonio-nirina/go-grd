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
		"underTitle":&graphql.Field{
			Type:graphql.NewList(SubjectAssistSchemaType) ,
		},
		"statut":&graphql.Field{
			Type:  graphql.Boolean,
		},
	},
})

var SubjectAssistSchemaType = graphql.NewObject(graphql.ObjectConfig{
	Name: "SubjectAssist",
	Fields: graphql.Fields{
		"title": &graphql.Field{
			Type: graphql.String, 
		},
		"content": &graphql.Field{
			Type: graphql.String,
		},
		"tag": &graphql.Field{
			Type: graphql.String,
		},
	},
})
