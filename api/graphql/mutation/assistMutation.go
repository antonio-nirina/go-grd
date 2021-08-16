package mutation

import (
	"github.com/graphql-go/graphql"
)

var contentInputType  = graphql.NewInputObject(graphql.InputObjectConfig{
	Name:"ContentAssistInput",
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
		Name: "AssistInputType",
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
	"assistInput": &graphql.ArgumentConfig{
		Type: inputAssistType,
	},
}

func createAsist() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.String,
		Description: "Assist create",
		Args:argsAssist,		
		Resolve: asistResolver.SavedAsistResolver,
	}
}

func removedAsist() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.String,
		Description: "removed asist",
		Args: graphql.FieldConfigArgument{
			"uid": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		Resolve:     asistResolver.RemovedAsistByResolver,
	}	
}