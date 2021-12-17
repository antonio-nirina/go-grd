package mutation

import (
	"github.com/graphql-go/graphql"
)

var contentInputType  = graphql.NewInputObject(
	graphql.InputObjectConfig{
		Name:"ContentHomeInput",
		Fields: graphql.InputObjectConfigFieldMap{
			"title": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"titleUnder": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"incontent": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
		},
	},
)

var inputHomeType = graphql.NewInputObject(
	graphql.InputObjectConfig{
		Name: "HomeInputType",
		Fields: graphql.InputObjectConfigFieldMap{
			"name": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"content": &graphql.InputObjectFieldConfig{
				Type: graphql.NewList(contentInputType),
			},
			"image": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"imageGame": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"imageType": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"imageGameType": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
		},
	},
)

var argsHome = graphql.FieldConfigArgument{
	"homeInput": &graphql.ArgumentConfig{
		Type: inputHomeType,
	},
}

func createdHome() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.String,
		Description: "Home create",
		Args:argsHome,		
		Resolve: homeResolver.SavedHomeResolver,
	}
}

func removedHome() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.String,
		Description: "removed Home",
		Args: graphql.FieldConfigArgument{
			"uid": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		Resolve:homeResolver.RemovedHomeByResolver,
	}	
}