package mutation

import (
	"github.com/graphql-go/graphql"
)

var inputAssistType = graphql.NewInputObject(
	graphql.InputObjectConfig{
		Name:"SubjectAssistInput",
		Fields: graphql.InputObjectConfigFieldMap{
			"title": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"content": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"tag": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
		},
	},
)
	
func createAssistContent() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.String,
		Description: "Assist content create",
		Args: graphql.FieldConfigArgument{
			"assistInput": &graphql.ArgumentConfig{
				Type: graphql.NewList(inputAssistType),
			},
			"title": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		}, 			
		Resolve: asistResolver.SavedAsistResolver,
	}
}


/*func updateHomeContent() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.String,
		Description: "updated assist",
		Args: graphql.FieldConfigArgument{
			"uid": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		Resolve:     homeResolver.UpdatedHomeByUseResolver,
	}	
}*/