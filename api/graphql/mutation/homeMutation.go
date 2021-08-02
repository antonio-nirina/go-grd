package mutation

import (
	"github.com/graphql-go/graphql"
)


func createHomeContent() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.String,
		Description: "Home content create",
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
		Resolve: homeResolver.SavedHomeResolver,
	}
}

func updateHomeContent() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.String,
		Description: "updated home",
		Args: graphql.FieldConfigArgument{
			"uid": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		Resolve:     homeResolver.UpdatedHomeByUseResolver,
	}	
}