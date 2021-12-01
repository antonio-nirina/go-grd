package queries

import (
	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/graphql/types"
)

func GetOneGameQuery() *graphql.Field {
	return &graphql.Field{
		Type:        types.GameSchemaType,
		Description: "Get single game",
		Args: graphql.FieldConfigArgument{
			"id": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},

		Resolve: gameResolver.FindOneGameResolver,
	}
}

func GetOnePlateformQuery() *graphql.Field {
	return &graphql.Field{
		Type:        types.PlateformSchemaType,
		Description: "Get single plateform",
		Args: graphql.FieldConfigArgument{
			"id": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},

		Resolve: plateformResolver.FindOneGamePlateformResolver,
	}
}

func GetAllGameQuery() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.NewList(types.GameSchemaType),
		Description: "Get all games",
		Resolve:     gameResolver.FindAllGameResolver,
	}
}

func GetAllPlateformQuery() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.NewList(types.PlateformSchemaType),
		Description: "Get all plateforms",
		Resolve:     plateformResolver.FindAllGamePlateformResolver,
	}
}

func FindGameTwicth() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.NewList(types.GameSchemaType),
		Description: "Get all game twitch",
		Args: graphql.FieldConfigArgument{
			"nameGame": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		Resolve: gameResolver.FindGameTwicthResolver,
	}
}
