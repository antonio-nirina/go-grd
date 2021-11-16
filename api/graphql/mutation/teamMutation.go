package mutation

import (
	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/graphql/types"
)


func createTeam() *graphql.Field {
	return &graphql.Field{
		Type:        types.TeamSchemaType,
		Description: "Home content create",
		Args: graphql.FieldConfigArgument{
			"name": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"creationDate": &graphql.ArgumentConfig{
				Type: graphql.String,
			},	
			"players": &graphql.ArgumentConfig{
				Type: graphql.String,
			},	
			"logo": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"logoType": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"creator":&graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"tag":&graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"description":&graphql.ArgumentConfig{
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

func updatedAllTeam() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.String,
		Description: "updated all",
		Args: graphql.FieldConfigArgument{
			"name": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"creationDate": &graphql.ArgumentConfig{
				Type: graphql.String,
			},	
			"players": &graphql.ArgumentConfig{
				Type: graphql.String,
			},	
			"logo": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"logoType": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"bann": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"bannType": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"creator":&graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"tag":&graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"description":&graphql.ArgumentConfig{
				Type: graphql.String,
			},	
		},
		Resolve:     teamResolver.UpdatedTeamResolver,
	}	
}