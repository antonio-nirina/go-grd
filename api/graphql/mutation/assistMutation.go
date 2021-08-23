package mutation

import (
	"github.com/graphql-go/graphql"
)


func createAssistContent() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.String,
		Description: "Assist content create",
		Args: graphql.FieldConfigArgument{
			"title": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"underTitle": &graphql.ArgumentConfig{
				Type: graphql.String,
			},	
			"location": &graphql.ArgumentConfig{
				Type: graphql.String,
			},	
			"content": &graphql.ArgumentConfig{
				Type: graphql.String,
			},			
		},			
		Resolve: asistResolver.SavedAsistResolver,
	}
}

func createSubjectContent() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.String,
		Description: "Assist content create",
		Args: graphql.FieldConfigArgument{
			"title": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"description": &graphql.ArgumentConfig{
				Type: graphql.String,
			},			
		},			
		Resolve: asistResolver.SavedSubjectResolver,
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