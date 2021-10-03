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
		"created": &graphql.Field{
			Type: graphql.String,
		},
		"records": &graphql.Field{
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
	Name: "UserXboxType",
	Fields: graphql.Fields{
		"DisplayName": &graphql.Field{
			Type: graphql.NewNonNull(graphql.String),
		},
		"Surname": &graphql.Field{
			Type: graphql.NewNonNull(graphql.String),
		},
		"Username": &graphql.Field{
			Type: graphql.NewNonNull(graphql.String),
		},
		"Id": &graphql.Field{
			Type: graphql.NewNonNull(graphql.String),
		},
		"Email": &graphql.Field{
			Type: graphql.NewNonNull(graphql.String),
		},
		"PreferredLanguage": &graphql.Field{
			Type: graphql.String,
		},
		"userPrincipalName": &graphql.Field{
			Type: graphql.NewNonNull(graphql.String),
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
	},
})

var XboxProfilSchemaType = graphql.NewObject(graphql.ObjectConfig{
	Name: "XboxProfilType",
	Fields: graphql.Fields{
		"DisplayName": &graphql.Field{
			Type: graphql.NewNonNull(graphql.String),
		},
		"Surname": &graphql.Field{
			Type: graphql.NewNonNull(graphql.String),
		},
		"Id": &graphql.Field{
			Type: graphql.NewNonNull(graphql.String),
		},
		"Mail": &graphql.Field{
			Type: graphql.NewNonNull(graphql.String),
		},
		"PreferredLanguage": &graphql.Field{
			Type: graphql.NewNonNull(graphql.String),
		},
		"userPrincipalName": &graphql.Field{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
})

var TwitchSchemaType = graphql.NewObject(graphql.ObjectConfig{
	Name: "TwitchType",
	Fields: graphql.Fields{
		"access_token": &graphql.Field{
			Type: graphql.String,
		},
		"refresh_token": &graphql.Field{
			Type: graphql.String,
		},
	},
})

var TwitchUserSchemaType = graphql.NewObject(graphql.ObjectConfig{
	Name: "TwitchUserType",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.String,
		},
		"login": &graphql.Field{
			Type: graphql.String,
		},
		"display_name": &graphql.Field{
			Type: graphql.String,
		},
		"email": &graphql.Field{
			Type: graphql.String,
		},
		"profile_image_url": &graphql.Field{
			Type: graphql.String,
		},
		"created_at": &graphql.Field{
			Type: graphql.String,
		},
	},
})
