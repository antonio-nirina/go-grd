package types

import (
	"github.com/graphql-go/graphql"
)

var WaggerSchemaType = graphql.NewObject(graphql.ObjectConfig{
	Name: "WaggerType",
	Fields: graphql.Fields{
		"uid": &graphql.Field{
			Type: graphql.String,
		},
		"date": &graphql.Field{
			Type: graphql.String,
		},
		"title": &graphql.Field{
			Type: graphql.String,
		},
		"description": &graphql.Field{
			Type: graphql.String,
		},
		"price": &graphql.Field{
			Type: graphql.Int,
		},
		"deadlineDate": &graphql.Field{
			Type: graphql.String,
		},
		"gameWay": &graphql.Field{
			Type: graphql.String,
		},
		"priceParticipate": &graphql.Field{
			Type: graphql.Float,
		},
		"game": &graphql.Field{
			Type: GameSchemaType,
		},
		"plateform":&graphql.Field{
			Type:PlateformSchemaType,
		},
		"format": &graphql.Field{
			Type: graphql.String,
		},
		"isPublic": &graphql.Field{
			Type: graphql.Boolean,
		},
		"statut": &graphql.Field{
			Type: graphql.Boolean,
		},
		"participant": &graphql.Field{
			Type: graphql.Int,
		},
		"records": &graphql.Field{
			Type: graphql.Int,
		},
	},
})
