package mutation

import (
	"github.com/thoussei/antonio/main/front-office/api/graphql/types"
	"github.com/graphql-go/graphql"
)

func createdGame() *graphql.Field{
	return &graphql.Field{
		Type:        types.GameSchemaType,
		Description: "Created game",
		Args: graphql.FieldConfigArgument{
			"name": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"description": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		Resolve: gameResolver.SavedGameResolver,
	}
}

func createdPlateform() *graphql.Field{
	return &graphql.Field{
		Type:        types.GameSchemaType,
		Description: "Plateform game",
		Args: graphql.FieldConfigArgument{
			"name": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"description": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		Resolve: plateformResolver.SavedGamePlateformResolver,
	}
}

