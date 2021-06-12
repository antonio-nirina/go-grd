package subscription

import (
	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/front-office/api/config"
	"github.com/thoussei/antonio/front-office/api/external"
	"github.com/thoussei/antonio/front-office/api/graphql/types"
	"github.com/thoussei/antonio/front-office/api/user/delivery"
	"github.com/thoussei/antonio/front-office/api/user/handler"
	"github.com/thoussei/antonio/front-office/api/user/repository"
)

var count = &external.Counter{}

var database 	= config.ConfigMongo()
var repUser 	= repository.NewUserRepository(database)
var usecase 	= handler.NewUsecaseUser(repUser)
var UserRolve 	= delivery.NewResolver(usecase)

func GetRootFields() graphql.Fields {
	return graphql.Fields{
		"subscribeCounter":	subscribeCounter(),
		// "requestFriend":		requestFriend(),
	}
}

func subscribeCounter() *graphql.Field {
	return &graphql.Field{
		Type: types.CountType,
		Description: "subscribeCounter",
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			return count, nil
		},
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


