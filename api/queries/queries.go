package queries

import (
	"context"
	"fmt"
	"log"

	"github.com/antonio-nirina/go-grd/api/config"
	"github.com/antonio-nirina/go-grd/api/entity"
	"github.com/antonio-nirina/go-grd/api/types"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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
		Type:        types.UserSchemaType,
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
			if err != nil {
				log.Fatal(err)
			}

			return user, nil
		},
	}
}

func findOneUser(uid string) (interface{}, error) {
	var result entity.User
	filter := bson.D{primitive.E{Key: "uid", Value: uid}}
	err := UserCollection.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		return nil, err
	}
	return result, nil

}
