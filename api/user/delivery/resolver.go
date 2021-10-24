package delivery

import (
	"github.com/graphql-go/graphql"
)

type Resolver interface {
	SavedUserResolver(params graphql.ResolveParams) (interface{}, error)
	FindOneUserResolver(params graphql.ResolveParams) (interface{}, error)
	AuthUserResolver(params graphql.ResolveParams) (interface{}, error)
	GetAccessTokenXboxApi(params graphql.ResolveParams) (interface{}, error)
	GetXboxProfil(params graphql.ResolveParams) (interface{}, error)
	UpdatedUserResolver(params graphql.ResolveParams) (interface{}, error)
	ForgotResolver(params graphql.ResolveParams) (interface{}, error)
	UpdatePasswordResolver(params graphql.ResolveParams) (interface{}, error)
	UpdateAvatarResolver(params graphql.ResolveParams) (interface{}, error)
	RequestFriendResolver(params graphql.ResolveParams) (interface{}, error)
	GetAllFriendsUser(params graphql.ResolveParams) (interface{}, error)
	GetAllUser(params graphql.ResolveParams) (interface{}, error)
	GetAccessTokenTwitchApi(params graphql.ResolveParams) (interface{}, error)
	AcceptedFriendResolver(params graphql.ResolveParams) (interface{}, error)
	DeconnectedResolver(params graphql.ResolveParams) (interface{}, error)
	GetAccessUserTwitchApi(params graphql.ResolveParams) (interface{}, error)
	GetAccessTokenTwitchAdmin(params graphql.ResolveParams) (interface{}, error)
	UpdatedGameResolver(params graphql.ResolveParams) (interface{}, error)
	FindGameUserResolver(params graphql.ResolveParams) (interface{}, error)
}
