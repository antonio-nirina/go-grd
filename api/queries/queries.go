package queries

import (
	"fmt"

	"github.com/antonio-nirina/go-example/config"
	"github.com/antonio-nirina/go-example/entity"
	"github.com/antonio-nirina/go-example/types"
	"github.com/graphql-go/graphql"
)

var UserCollection = config.ConfigMongo().Database("grd_database").Collection("users")

// GetRootFields returns all the available queries.
func GetRootFields() graphql.Fields {
	return graphql.Fields{
		"user": GetOneUserQuery(),
	}
}

func GetUserQuery() {
	fmt.Println("query")
}

func GetOneUserQuery() *graphql.Field {
	return &graphql.Field{
		Type:        types.UserType,
		Description: "Get single user",
		Args: graphql.FieldConfigArgument{
			"uid": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		Resolve: func(params graphql.ResolveParams) (interface{}, error) {
			idQuery, isOK := params.Args["uid"].(string)
			if !isOK {
				// Search for el with id
				fmt.Println("error uid")
			}

			user, err := findOneUser(idQuery)
			if err =! nil {
				log.Fatal(err)
			}

			return *user, nil
		},
	}
}

func findOneUser(uid string)(interface{}, error) {
	var result entity.User{}
	filter := bson.D{{"uid", uid}}
	err = UserCollection.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		return nil, err
	}
	return result,nil

}
