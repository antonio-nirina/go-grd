package queries

import (
	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/graphql/types"
)

func GetOneUserQuery() *graphql.Field {
	return &graphql.Field{
		Type:        types.UserSchemaType,
		Description: "Get single user",
		Args: graphql.FieldConfigArgument{
			"id": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},

		Resolve: UserRolve.FindOneUserResolver,
	}
}

func GetAccessTokenXbox() *graphql.Field {
	return &graphql.Field{
		Type:        types.XboxSchemaType,
		Description: "Get token access",
		Args: graphql.FieldConfigArgument{
			"code": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},

		Resolve: UserRolve.GetAccessTokenXboxApi,
	}
}

func GetProfilUserXbox() *graphql.Field {
	return &graphql.Field{
		Type:        types.UserSchemaType,
		Description: "Get profil user xbox",
		Args: graphql.FieldConfigArgument{
			"accessToken": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},

		Resolve: UserRolve.GetXboxProfil,
	}
}

func GetAllFriends() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.NewList(types.FriendType),
		Description: "Get friends user all",
		Args: graphql.FieldConfigArgument{
			"email": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},

		Resolve: UserRolve.GetAllFriendsUser,
	}
}

func GetUsers() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.NewList(types.UserSchemaType),
		Description: "Get user all",
		Args: graphql.FieldConfigArgument{
			"idUserConnected": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"limit": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
			"pageNumber": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
		},
		Resolve: UserRolve.GetAllUser,
	}
}

func GetAccessTokenTwitch() *graphql.Field {
	return &graphql.Field{
		Type:        types.TwitchSchemaType,
		Description: "Get token access twicth",
		Args: graphql.FieldConfigArgument{
			"code": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},

		Resolve: UserRolve.GetAccessTokenTwitchApi,
	}
}

func GetAccessUserTwitchApi() *graphql.Field {
	return &graphql.Field{
		Type:        types.TwitchUserSchemaType,
		Description: "Get User twicth",
		Args: graphql.FieldConfigArgument{
			"accessToken": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},

		Resolve: UserRolve.GetAccessUserTwitchApi,
	}
}

func GetAccessTokenTwitchAdmin() *graphql.Field {
	return &graphql.Field{
		Type:        types.TwitchSchemaType,
		Description: "Get token access twicth",
		Args: graphql.FieldConfigArgument{
			"code": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},

		Resolve: UserRolve.GetAccessTokenTwitchAdmin,
	}
}

func GetGameOneUserQuery() *graphql.Field {
	return &graphql.Field{
		Type:        types.UserSchemaTypeGame,
		Description: "Get game user",
		Args: graphql.FieldConfigArgument{
			"uid": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},

		Resolve: UserRolve.FindGameUserResolver,
	}
}

func GetAccessTokenDiscord() *graphql.Field {
	return &graphql.Field{
		Type:        types.TwitchSchemaType,
		Description: "Get token access discord",
		Args: graphql.FieldConfigArgument{
			"code": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},

		Resolve: UserRolve.GetAccessTokenDiscordApi,
	}
}
