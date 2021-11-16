package types

import (
	"github.com/graphql-go/graphql"
)

var TeamSchemaType = graphql.NewObject(graphql.ObjectConfig{
	Name: "TeamType",
	Fields: graphql.Fields{
		"uid": &graphql.Field{
			Type: graphql.String,
		},
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"logo": &graphql.Field{
			Type: graphql.String,
		},
		"creationDate": &graphql.Field{
			Type: graphql.String,
		},
		"description": &graphql.Field{
			Type: graphql.String,
		},
		"tag": &graphql.Field{
			Type: graphql.String,
		},
		"players": &graphql.Field{
			Type: graphql.String,
		},
		"creator": &graphql.Field{
			Type: UserSchemaType,
		},
		"records": &graphql.Field{
			Type: graphql.Int,
		},
	},
})