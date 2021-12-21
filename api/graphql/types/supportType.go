package types

import (
	"github.com/graphql-go/graphql"
)

var SupportSchemaType = graphql.NewObject(graphql.ObjectConfig{
	Name: "SupportType",
	Fields: graphql.Fields{
		"uid": &graphql.Field{
			Type: graphql.String,
		},
		"created": &graphql.Field{
			Type: graphql.String,
		},
		"updated": &graphql.Field{
			Type: graphql.String,
		},
		"user": &graphql.Field{
			Type: UserSchemaType,
		},
		"content": &graphql.Field{
			Type: graphql.String,
		},
	},
})
