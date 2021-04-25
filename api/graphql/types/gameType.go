package types

import (
	"github.com/graphql-go/graphql"
)

var GameSchemaType = graphql.NewObject(graphql.ObjectConfig{
	Name: "GameType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: graphql.String,
		},
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

var PlateformSchemaType = graphql.NewObject(graphql.ObjectConfig{
	Name: "PlateformType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: graphql.String,
		},
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
