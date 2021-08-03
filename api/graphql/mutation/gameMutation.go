package mutation

import (
	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/graphql/types"
)

/*var gameInputType = graphql.NewInputObject(
	graphql.InputObjectConfig{
		Name: "gameInputType",
		Fields: graphql.InputObjectConfigFieldMap{
			"name": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"image": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"logo": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"typeImage": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"typeLogo": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"notes": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"slug": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
		},
	},
)

var argsGame = graphql.FieldConfigArgument{
	"gameInput": &graphql.ArgumentConfig{
		Type: gameInputType,
	},
}*/

func createdGame() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.String,
		Description: "Created game",
		Args: graphql.FieldConfigArgument{
			"name": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"image": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"logo": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"typeImage": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"typeLogo": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"notes": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
			"slug": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		Resolve:     gameResolver.SavedGameResolver,
	}
}

func createdPlateform() *graphql.Field {
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
