package types

import (
	"github.com/graphql-go/graphql"
)

var CmtySchemaType = graphql.NewObject(graphql.ObjectConfig{
	Name: "CommunutyType",
	Fields: graphql.Fields{
		"uid": &graphql.Field{
			Type: graphql.String,
		},
		"title": &graphql.Field{
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