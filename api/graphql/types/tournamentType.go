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
		"dateStart": &graphql.Field{
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
		"price": &graphql.Field{
			Type: graphql.NewList(graphql.String),
		},
		"deadlineDate": &graphql.Field{
			Type: graphql.String,
		},
		"priceParticipate": &graphql.Field{
			Type: graphql.String,
		},
		"game": &graphql.Field{
			Type: GameSchemaType,
		},
		"plateform": &graphql.Field{
			Type: graphql.NewList(PlateformSchemaType),
		},
		"rules": &graphql.Field{
			Type: graphql.String,
		},
		"isPublic": &graphql.Field{
			Type: graphql.Boolean,
		},
		"gameWay": &graphql.Field{
			Type: graphql.String,
		},
		"records": &graphql.Field{
			Type: graphql.Int,
		},
		"format": &graphql.Field{
			Type: graphql.String,
		},
		"server": &graphql.Field{
			Type: graphql.String,
		},
		"tchat": &graphql.Field{
			Type: graphql.String,
		},
		"winners": &graphql.Field{
			Type: graphql.NewList(graphql.String),
		},
		"region": &graphql.Field{
			Type: graphql.String,
		},
		"laps": &graphql.Field{
			Type: graphql.NewList(graphql.String),
		},
		"isTeam": &graphql.Field{
			Type: graphql.Boolean,
		},
		"spectateur": &graphql.Field{
			Type: graphql.String,
		},
	},
})

var TournamentShortSchemaType = graphql.NewObject(graphql.ObjectConfig{
	Name: "TournamentShortType",
	Fields: graphql.Fields{
		"uid": &graphql.Field{
			Type: graphql.String,
		},
		"title": &graphql.Field{
			Type: graphql.String,
		},
		"dateStart": &graphql.Field{
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
		"price": &graphql.Field{
			Type: graphql.NewList(graphql.String),
		},
		"deadlineDate": &graphql.Field{
			Type: graphql.String,
		},
		"priceParticipate": &graphql.Field{
			Type: graphql.String,
		},

		"isPublic": &graphql.Field{
			Type: graphql.Boolean,
		},
		"isTeam": &graphql.Field{
			Type: graphql.Boolean,
		},
	},
})
