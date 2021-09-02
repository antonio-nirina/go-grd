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
	},
})