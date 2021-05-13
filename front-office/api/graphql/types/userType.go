package types

import (
	"github.com/graphql-go/graphql"
)

var UserSchemaType = graphql.NewObject(graphql.ObjectConfig{
	Name: "UserType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: graphql.String,
		},
		"uid": &graphql.Field{
			Type: graphql.String,
		},
		"lastname": &graphql.Field{
			Type: graphql.String,
		},
		"firstname": &graphql.Field{
			Type: graphql.String,
		},
		"username": &graphql.Field{
			Type: graphql.String,
		},
		"email": &graphql.Field{
			Type: graphql.String,
		},
		"isBanned": &graphql.Field{
			Type: graphql.Boolean,
		},
		"avatar": &graphql.Field{
			Type: graphql.String,
		},
		"language": &graphql.Field{
			Type: graphql.String,
		},
		"point": &graphql.Field{
			Type: graphql.Int,
		},
	},
})

var AuthSchemaType = graphql.NewObject(graphql.ObjectConfig{
	Name: "AuthType",
	Fields: graphql.Fields{
		"token": &graphql.Field{
			Type: graphql.String,
		},
	},
})
var userTypeXbox = graphql.NewObject(graphql.ObjectConfig{
	Name: "UserboxType",
	Fields: graphql.Fields{
		"DisplayName": &graphql.Field{
			Type: graphql.String,
		},
		"Surname": &graphql.Field{
			Type: graphql.String,
		},
		"Username": &graphql.Field{
			Type: graphql.String,
		},
		"Id": &graphql.Field{
			Type: graphql.String,
		},
		"Email": &graphql.Field{
			Type: graphql.String,
		},
		"PreferredLanguage": &graphql.Field{
			Type: graphql.String,
		},
		"userPrincipalName": &graphql.Field{
			Type: graphql.String,
		},
	},
})
var XboxSchemaType = graphql.NewObject(graphql.ObjectConfig{
	Name: "XboxType",
	Fields: graphql.Fields{
		"AccessToken": &graphql.Field{
			Type: graphql.String,
		},
		"RefreshToken": &graphql.Field{
			Type: graphql.String,
		},
		"User": &graphql.Field{
			Type: userTypeXbox,
		},
	},
})

