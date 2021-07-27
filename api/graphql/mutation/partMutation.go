package mutation


import (
	"github.com/graphql-go/graphql"
)


func createPartMatch() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.String,
		Description: "Publication create",
		Args: graphql.FieldConfigArgument{
			"uidUser": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"date": &graphql.ArgumentConfig{
				Type: graphql.String,
			},	
			"tournamentUid": &graphql.ArgumentConfig{
				Type: graphql.String,
			},			
		},			
		Resolve: partResolver.SavedPartResolver,
	}
}