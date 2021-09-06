package types

import (
	"github.com/graphql-go/graphql"
)

var PartSchemaType = graphql.NewObject(graphql.ObjectConfig{
	Name: "PartType",
	Fields: graphql.Fields{
		"uid": &graphql.Field{
			Type: graphql.String,
		},
		"date": &graphql.Field{
			Type: graphql.String,
		},
		"user": &graphql.Field{
			Type: UserSchemaType,
		},
		"team":  &graphql.Field{
			Type: graphql.NewList(TeamSchemaType),
		},
		"tournament": &graphql.Field{
			Type: TournamentSchemaType,
		},
		"numberPartConfirmed": &graphql.Field{
			Type: graphql.Boolean,
		},
		/*"league": &graphql.Field{
			Type: LeagueSchemaType,
		},*/
	},
})

var PartRecords = graphql.NewObject(graphql.ObjectConfig{
	Name: "PartRecType",
	Fields: graphql.Fields{
		"recordsPart": &graphql.Field{
			Type: graphql.Int,
		},
		"recordsConfirmed": &graphql.Field{
			Type: graphql.Int,
		},
	},
})