package types

import (
	"github.com/graphql-go/graphql"
)

var HomeSchemaType = graphql.NewObject(graphql.ObjectConfig{
	Name: "HomeType",
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