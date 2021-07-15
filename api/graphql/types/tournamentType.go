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
		"type": &graphql.Field{
			Type: graphql.Int,
		},
		"numberParticipate": &graphql.Field{
			Type: graphql.Float,
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
	},
})