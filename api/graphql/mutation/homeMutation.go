package mutation

import (
	"github.com/graphql-go/graphql"
)

var contentInputType  = graphql.NewInputObject(graphql.InputObjectConfig{
	Name:"ContentHomeInput",
	Fields: graphql.InputObjectConfigFieldMap{
		"Title": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"TitleUnder": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"Incontent": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
	},
})

var inputAssistType = graphql.NewInputObject(
	graphql.InputObjectConfig{
		Name: "HomeInputType",
		Fields: graphql.InputObjectConfigFieldMap{
			"name": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"content": &graphql.InputObjectFieldConfig{
				Type: graphql.NewList(contentInputType),
			},
		},
	},
)

var argsAssist = graphql.FieldConfigArgument{
	"homeInput": &graphql.ArgumentConfig{
		Type: inputAssistType,
	},
}

func createHome() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.String,
		Description: "Home create",
		Args:argsAssist,		
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
		Resolve:     homeResolver.RemovedHomeByResolver,
	}	
}