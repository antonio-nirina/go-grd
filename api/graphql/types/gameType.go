package types

import (
	"github.com/graphql-go/graphql"
)

var GameSchemaType = graphql.NewObject(graphql.ObjectConfig{
	Name: "GameType",
	Fields: graphql.Fields{
		"uid": &graphql.Field{
			Type: graphql.String,
		},
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"image": &graphql.Field{
			Type: graphql.String,
		},
		"logo": &graphql.Field{
			Type: graphql.String,
		},
		"notes": &graphql.Field{
			Type: graphql.Int,
		},
		"slug": &graphql.Field{
			Type: graphql.String,
		},
	},
})

var PlateformSchemaType = graphql.NewObject(graphql.ObjectConfig{
	Name: "PlateformType",
	Fields: graphql.Fields{
		"uid": &graphql.Field{
			Type: graphql.String,
		},
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"description": &graphql.Field{
			Type: graphql.String,
		},
	},
})
