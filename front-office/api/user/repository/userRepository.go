package repository

import (
	"context"
	"fmt"
	"log"

	"github.com/thoussei/antonio/main/front-office/api/user/entity"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// Driver database
type driverRepository struct {
	client *mongo.Client
}

// Return Interface User Repository
func NewUserRepository(client *mongo.Client) *driverRepository {
	return &driverRepository{client}
}

func (c *driverRepository) SavedUser(user *entity.User) (interface{}, error) {
	var collection = c.client.Database("grd_database").Collection("users")
	insertResult, err := collection.InsertOne(context.TODO(), user)

	if err != nil {
		return nil, err
	}

	fmt.Println("Inserted a single document: ", insertResult)

	return user, nil
}

func (c *driverRepository) FindOneUser(objectId primitive.ObjectID) (interface{}, error) {
	var collection = c.client.Database("grd_database").Collection("users")
	var result entity.User

	err := collection.FindOne(context.TODO(), bson.M{"_id": objectId}).Decode(&result)

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (c *driverRepository) FindAllUser() (interface{}, error) {
	var collection = c.client.Database("grd_database").Collection("users")
	var results []primitive.M
	cur, err := collection.Find(context.TODO(), bson.D{{}})

	if err != nil {
		return nil, err
	}

	for cur.Next(context.TODO()) {
		var elem primitive.M
		err := cur.Decode(&elem)
		if err != nil {
			log.Fatal(err)
		}

		results = append(results, elem)
	}
	cur.Close(context.TODO())

	return results, nil
}

func (c *driverRepository) FindUserByEmail(email string) (entity.User, error)  {
	var collection = c.client.Database("grd_database").Collection("users")
	var result entity.User

	err := collection.FindOne(context.TODO(), bson.M{"email": email}).Decode(&result)

	if err != nil {
		return result, err
	}

	return result, nil
}

func (c *driverRepository) FindUserByUsername(username string) (entity.User, error) {
	var collection = c.client.Database("grd_database").Collection("users")
	var result entity.User

	err := collection.FindOne(context.TODO(), bson.M{"username": username}).Decode(&result)

	if err != nil {
		return result, err
	}

	return result, nil
}

func (c *driverRepository) SavedUserXbox(user *entity.User) (interface{}, error) {
	var collection = c.client.Database("grd_database").Collection("users")
	insertResult, err := collection.InsertOne(context.TODO(), user)

	if err != nil {
		return nil, err
	}

	fmt.Println("Inserted a single document: ", insertResult)

	return user, nil
}

/*func (c *driverRepository) UpdateAccountGame(email string) (entity.User, error) {
	var collection = c.client.Database("grd_database").Collection("users")
	var result entity.User

}*/