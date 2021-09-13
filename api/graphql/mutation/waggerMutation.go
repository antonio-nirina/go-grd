package mutation

import (
	"github.com/graphql-go/graphql"
)

var waggerUpatedType = graphql.NewInputObject(
	graphql.InputObjectConfig{
		Name: "waggerUpdatedType",
		Fields: graphql.InputObjectConfigFieldMap{
			"uid": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"date": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"title": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"description": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"price": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"deadlineDate": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"gameWay": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"entry": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"priceParticipate": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"format": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"isPublic": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"statut": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
		},
	},
)

var argsUpatedWagger = graphql.FieldConfigArgument{
	"waggerUpated": &graphql.ArgumentConfig{
		Type: waggerUpatedType,
	},
}

func createWagger() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.String,
		Description: "Saved tournament",
		Args: graphql.FieldConfigArgument{
			"date": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"title": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"description": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"price": &graphql.ArgumentConfig{
				Type: graphql.Float,
			},
			"deadlineDate": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"uidGame": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"uidPalteforme": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"gameWay": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"priceParticipate": &graphql.ArgumentConfig{
				Type: graphql.Float,
			},
			"format": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"isPublic": &graphql.ArgumentConfig{
				Type: graphql.Boolean,
			},
			"participant": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
		},
		Resolve:waggerResolver.SavedWaggerResolver,
	}
}

func updatedWagger() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.String,
		Description: "Updated wagger",
		Args:        argsUpatedWagger,
		Resolve:     waggerResolver.UpdatedWaggerResolver,
	}
}