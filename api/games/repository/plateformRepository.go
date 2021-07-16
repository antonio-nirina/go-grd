package repository

import (
	"context"
	"fmt"
	"log"

	"github.com/thoussei/antonio/api/games/entity"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// Driver database
type driverRepository struct {
	client *mongo.Client
}

// Return Interface User Repository
func NewPlateformRepository(client *mongo.Client) *driverRepository {
	return &driverRepository{client}
}

func (c *driverRepository) SavedPlateformRepository(plateform *entity.GamePlatform) (interface{}, error) {
	var collection = c.client.Database("grd_database").Collection("game_platform")
	insertResult, err := collection.InsertOne(context.TODO(), plateform)

	if err != nil {
		return nil, err
	}

	fmt.Println("Inserted a single document: ", insertResult)

	return plateform, nil
}

func (c *driverRepository) FindOnePlateformRepository(objectId primitive.ObjectID) (interface{}, error) {
	var collection = c.client.Database("grd_database").Collection("game_platform")
	var result entity.GamePlatform

	err := collection.FindOne(context.TODO(), bson.M{"_id": objectId}).Decode(&result)

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (c *driverRepository) FindAllPlateformRepository() (interface{}, error) {
	var collection = c.client.Database("grd_database").Collection("game_platform")
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

func (c *driverRepository) FindOnePlateformByUidRepository(objectId primitive.ObjectID) (entity.GamePlatform, error) {
	var collection = c.client.Database("grd_database").Collection("game_platform")
	var result entity.GamePlatform

	err := collection.FindOne(context.TODO(), bson.M{"uid": objectId}).Decode(&result)

	if err != nil {
		return result, err
	}

	return result, nil
}