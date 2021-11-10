package queries

import (
	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/graphql/types"
)

func FindOnePart() *graphql.Field {
	return &graphql.Field{
		Type:        types.PartSchemaType,
		Description: "Get single participant",
		Args: graphql.FieldConfigArgument{
			"uid": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},

		Resolve: partResolver.FindPartResolver,
	}
}

func FindAllPart() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.NewList(types.PartSchemaType),
		Description: "Get all participant",
		Args: graphql.FieldConfigArgument{
			"limit": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
			"pageNumber": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
		},

		Resolve: partResolver.FindAllPartResolver,
	}
}

func FindPartByUser() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.NewList(types.PartSchemaType),
		Description: "Get all part by user",
		Args: graphql.FieldConfigArgument{
			"uidUser": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"limit": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
			"pageNumber": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
		},

		Resolve: partResolver.FindPartByUseResolver,
	}
}

func FindPartByUserLeague() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.NewList(types.PartSchemaType),
		Description: "Get all part by  in league",
		Args: graphql.FieldConfigArgument{
			"uidUser": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"uidLeague": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},

		Resolve: partResolver.FindPartByUseResolver,
	}
}

func FindPartByUserTournament() *graphql.Field {
	return &graphql.Field{
		Type:        types.PartSchemaType,
		Description: "Get all part by user tournament",
		Args: graphql.FieldConfigArgument{
			"uidUser": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"uidTournament": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},

		Resolve: partResolver.FindPartByUseTournamentResolver,
	}
}

func FindPartCount() *graphql.Field {
	return &graphql.Field{
		Type:        types.PartRecords,
		Description: "Get all count",
		Args: graphql.FieldConfigArgument{
			"uid": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},

		Resolve: partResolver.GetNumberPartByResolver,
	}
}

func FindPartByUserWagger() *graphql.Field {
	return &graphql.Field{
		Type:        types.PartSchemaType,
		Description: "Get all part by wagger user",
		Args: graphql.FieldConfigArgument{
			"uidUser": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"uidWagger": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},

		Resolve: partResolver.FindPartByUserWaggerResolver,
	}
}

func FindAllPartUserWagger() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.NewList(types.PartAllWaggerSchemaType),
		Description: "Get part all wagger user",
		Args: graphql.FieldConfigArgument{
			"uidUser": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"limit": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
			"pageNumber": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
		},

		Resolve: partResolver.FindAllPartUserWaggerHandler,
	}
}

func FindTournamentParticipate() * graphql.Field {
	return &graphql.Field{
		Type:        graphql.NewList(types.PartAllTournamentSchemaType),
		Description: "Get all tournament by participate",
		Args: graphql.FieldConfigArgument{
			"uid": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},

		Resolve: partResolver.FindPartByTournamentResolver,
	} 
}