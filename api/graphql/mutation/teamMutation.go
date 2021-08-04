package mutation

import (
	"github.com/graphql-go/graphql"
)


func createTeam() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.String,
		Description: "Home content create",
		Args: graphql.FieldConfigArgument{
			"name": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"creationDate": &graphql.ArgumentConfig{
				Type: graphql.String,
			},	
			"players": &graphql.ArgumentConfig{
				Type: graphql.NewList(graphql.String),
			},	
			"logo": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"creator":&graphql.ArgumentConfig{
				Type: graphql.String,
			},			
		},			
		Resolve: teamResolver.SavedTeamResolver,
	}
}

func updatedTeamByBanned() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.String,
		Description: "updated home",
		Args: graphql.FieldConfigArgument{
			"uid": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		Resolve:     teamResolver.UpdatedTeamByBannedResolver,
	}	
}