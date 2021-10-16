package mutation

import (
	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/graphql/types"
)

var GameInputType = graphql.NewInputObject(
	graphql.InputObjectConfig{
		Name: "GameInputType",
		Fields: graphql.InputObjectConfigFieldMap{
			"uid": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
		},
	},
)

var inputType = graphql.NewInputObject(
	graphql.InputObjectConfig{
		Name: "userInputType",
		Fields: graphql.InputObjectConfigFieldMap{
			"password": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"username": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"email": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
		},
	},
)

var userUpatedType = graphql.NewInputObject(
	graphql.InputObjectConfig{
		Name: "userUpdatedType",
		Fields: graphql.InputObjectConfigFieldMap{
			"firstname": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"username": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"lastname": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"language": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"email": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
		},
	},
)

var avatarInputType = graphql.NewInputObject(
	graphql.InputObjectConfig{
		Name: "userAvatarType",
		Fields: graphql.InputObjectConfigFieldMap{
			"type": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"data": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"email": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
		},
	},
)

var args = graphql.FieldConfigArgument{
	"userInput": &graphql.ArgumentConfig{
		Type: inputType,
	},
}

var argsAvatar = graphql.FieldConfigArgument{
	"avatarInput": &graphql.ArgumentConfig{
		Type: avatarInputType,
	},
}

var argsUpated = graphql.FieldConfigArgument{
	"userUpated": &graphql.ArgumentConfig{
		Type: userUpatedType,
	},
}

func createdUser() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.String,
		Description: "Created user",
		Args:        args,
		Resolve:     UserRolve.SavedUserResolver,
	}
}

func login() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.String,
		Description: "Auth user",
		Args: graphql.FieldConfigArgument{
			"email": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"password": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		Resolve: UserRolve.AuthUserResolver,
	}
}
// 
func updatedUser() *graphql.Field {
	return &graphql.Field{
		Type:        types.UserSchemaType,
		Description: "Updated user",
		Args:        argsUpated,
		Resolve:     UserRolve.UpdatedUserResolver,
	}
}

func forgotPassword() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.String,
		Description: "Forgot password",
		Args: graphql.FieldConfigArgument{
			"email": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			
		},
		Resolve: UserRolve.ForgotResolver,
	}
}

func updatedPasswordUser() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.String,
		Description: "Update password",
		Args: graphql.FieldConfigArgument{
			"token": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"newPassword": &graphql.ArgumentConfig{
				Type: graphql.String,
			},			
		},
		Resolve: UserRolve.UpdatePasswordResolver,
	}
}

func updatedAvatar() *graphql.Field {
	return &graphql.Field{
		Type:        types.UserSchemaType,
		Description: "Update avatar",
		Args: argsAvatar,
		Resolve: UserRolve.UpdateAvatarResolver,
	}
}

func requestFriend() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.String,
		Description: "Request friends",
		Args: graphql.FieldConfigArgument{
			"idRequest": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"idSender": &graphql.ArgumentConfig{
				Type: graphql.String,
			},			
		},			
		Resolve: UserRolve.RequestFriendResolver,
	}
}

func AcceptedRequestFriend() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.String,
		Description: "Accepted request friends",
		Args: graphql.FieldConfigArgument{
			"idRequest": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"idSender": &graphql.ArgumentConfig{
				Type: graphql.String,
			},				
		},			
		Resolve: UserRolve.AcceptedFriendResolver,
	}
}

func Deconnected() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.String,
		Description: "Deconnected",
		Args: graphql.FieldConfigArgument{
			"id": &graphql.ArgumentConfig{
				Type: graphql.String,
			},	
		},			
		Resolve: UserRolve.DeconnectedResolver,
	}
}

func updatedGameUser() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.String,
		Description: "Update user  game",
		Args: graphql.FieldConfigArgument{
			"games": &graphql.ArgumentConfig{
				Type: graphql.NewList(GameInputType),
			},
			"uidUser": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		Resolve: UserRolve.UpdatedGameResolver,
	}
}