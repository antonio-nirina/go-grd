package queries

import (
	"github.com/thoussei/antonio/main/front-office/api/graphql/types"
	"github.com/graphql-go/graphql"
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
		Type:        types.GameSchemaType,
		Description: "Get all games",
		Args: graphql.FieldConfigArgument{
			"id": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},

		Resolve: gameResolver.FindAllGameResolver,
	}
}

func GetAllPlateformQuery() *graphql.Field {
	return &graphql.Field{
		Type:        types.PlateformSchemaType,
		Description: "Get all plateforms",
		Args: graphql.FieldConfigArgument{
			"id": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},

		Resolve: plateformResolver.FindAllGamePlateformResolver,
	}
}
