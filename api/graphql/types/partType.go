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
		"team": &graphql.Field{
			Type: graphql.NewList(TeamSchemaType),
		},
		"tournament": &graphql.Field{
			Type: TournamentSchemaType,
		},
		"wagger": &graphql.Field{
			Type: WaggerSchemaType,
		},
		"numberPartConfirmed": &graphql.Field{
			Type: graphql.Boolean,
		},
		"isWin": &graphql.Field{
			Type: graphql.Boolean,
		},
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

var PartAllWaggerSchemaType = graphql.NewObject(graphql.ObjectConfig{
	Name: "PartWaggerType",
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

		"wagger": &graphql.Field{
			Type: WaggerSchemaType,
		},
		"numberPartConfirmed": &graphql.Field{
			Type: graphql.Boolean,
		},
		"isWin": &graphql.Field{
			Type: graphql.Boolean,
		},
	},
})

var PartAllTournamentSchemaType = graphql.NewObject(graphql.ObjectConfig{
	Name: "PartTournamentType",
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
		"numberPartConfirmed": &graphql.Field{
			Type: graphql.Boolean,
		},
		"isWin": &graphql.Field{
			Type: graphql.Boolean,
		},
		"tournament": &graphql.Field{
			Type: TournamentSchemaType,
		},
		"team": &graphql.Field{
			Type: TeamSchemaType,
		},
	},
})

var PartRecordsTournament = graphql.NewObject(graphql.ObjectConfig{
	Name: "RecordsParttournament",
	Fields: graphql.Fields{
		"tournament": &graphql.Field{
			Type: TournamentSchemaType,
		},
		"recordsPart": &graphql.Field{
			Type: graphql.Int,
		},
	},
})
