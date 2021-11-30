package types

import (
	"github.com/graphql-go/graphql"
)

var RateSchemaType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Rateype",
	Fields: graphql.Fields{
		"uid": &graphql.Field{
			Type: graphql.String,
		},
		"created": &graphql.Field{
			Type: graphql.String,
		},
		"logo": &graphql.Field{
			Type: graphql.String,
		},
		"updated": &graphql.Field{
			Type: graphql.String,
		},
		"user": &graphql.Field{
			Type: UserSchemaType,
		},
		"score": &graphql.Field{
			Type: graphql.Int,
		},
		
	},
})