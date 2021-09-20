package types

import (
	"github.com/graphql-go/graphql"
)

var PostSchemaType = graphql.NewObject(graphql.ObjectConfig{
	Name: "PostType",
	Fields: graphql.Fields{
		"uid": &graphql.Field{
			Type: graphql.String,
		},
		"content": &graphql.Field{
			Type: graphql.String,
		},
		"files": &graphql.Field{
			Type: graphql.String,
		},
		"imageType": &graphql.Field{
			Type: graphql.String,
		},
		"user": &graphql.Field{
			Type: UserSchemaType,
		},
		"date": &graphql.Field{
			Type: graphql.String,
		},
	},
})