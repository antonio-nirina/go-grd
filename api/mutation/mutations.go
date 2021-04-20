package mutation

import (
	"context"
	"fmt"
	"log"

	"github.com/antonio-nirina/go-grd/config"
	"github.com/antonio-nirina/go-grd/entity"
	"github.com/antonio-nirina/go-grd/types"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var UserCollection = config.ConfigMongo().Database("grd_database").Collection("users")

func GetRootFields() *graphql.Fields {
	return &graphql.Fields{
		"createdUser": createdUser(),
	}
}

func createdUser() *graphql.Field {
	return &graphql.Field{
		Type:        types.UserSchemaType,
		Description: "Get single user",
		Args: graphql.FieldConfigArgument{
			"firstname": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"lastname": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"password": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"username": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"avatar": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"language": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		Resolve: func(params graphql.ResolveParams) (interface{}, error) {
			// Validation
			userSaved := &entity.User{
				Uid:       primitive.NewObjectID().String(),
				FirstName: params.Args["firstname"].(string),
				LastName:  params.Args["lastname"].(string),
				Password:  params.Args["password"].(string),
				Username:  params.Args["username"].(string),
				IsBanned:  false,
				Avatar:    params.Args["avatar"].(string),
				Language:  params.Args["language"].(string),
				Point:     20,
			}
			user, err := savedUser(userSaved)

			if err != nil {
				log.Fatal(err)
			}

			return user, nil
		},
	}
}

func savedUser(user *entity.User) (interface{}, error) {
	insertResult, err := UserCollection.InsertOne(context.TODO(), user)
	if err != nil {
		return nil, err
	}

	fmt.Println("Inserted a single document: ", insertResult)

	return user, nil
}
