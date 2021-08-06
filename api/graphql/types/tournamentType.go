package types

import (
	"github.com/graphql-go/graphql"
)

var TournamentSchemaType = graphql.NewObject(graphql.ObjectConfig{
	Name: "TournamentType",
	Fields: graphql.Fields{
		"uid": &graphql.Field{
			Type: graphql.String,
		},
		"title": &graphql.Field{
			Type: graphql.String,
		},
		"date": &graphql.Field{
			Type: graphql.String,
		},
		"statut": &graphql.Field{
			Type: graphql.Boolean,
		},
		"description": &graphql.Field{
			Type: graphql.String,
		},
		"numberParticipate": &graphql.Field{
			Type: graphql.Int,
		},
		"numberTeam": &graphql.Field{
			Type: graphql.Int,
		},
		"price": &graphql.Field{
			Type: graphql.String,
		},
		"deadlineDate": &graphql.Field{
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
		"rules": &graphql.Field{
			Type: graphql.String,
		},
		"isPublic": &graphql.Field{
			Type: graphql.Boolean,
		},
		"records": &graphql.Field{
			Type: graphql.Int,
		},
	},
})