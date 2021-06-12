package repository

import (
	"context"
	"fmt"


	"github.com/thoussei/antonio/front-office/api/games/entity"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"github.com/thoussei/antonio/front-office/api/external"
)

// Return Interface User Repository
func NewGameRepository(client *mongo.Client) *driverRepository {
	return &driverRepository{client}
}

func (c *driverRepository) SavedGameRepository(game *entity.Game) (interface{}, error){
	var collection = c.client.Database("grd_database").Collection("game")
	insertResult, err := collection.InsertOne(context.TODO(), game)

	if err != nil {
		return nil, err
	}

	fmt.Println("Inserted a single document: ", insertResult)

	return game, nil
}

func (c *driverRepository) FindOneGameRepository(objectId primitive.ObjectID) (interface{}, error){
	var collection = c.client.Database("grd_database").Collection("game")
	var result entity.Game

	err := collection.FindOne(context.TODO(), bson.M{"_id": objectId}).Decode(&result)

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (c *driverRepository) FindAllGameRepository() (interface{}, error){
	var collection = c.client.Database("grd_database").Collection("game")
	var results []primitive.M
	cur, err := collection.Find(context.TODO(), bson.D{{}})

	if err != nil {
		return nil, err
	}

	for cur.Next(context.TODO()) {
		var elem primitive.M
		err := cur.Decode(&elem)
		if err != nil {
			message := fmt.Sprintf("%v", err)
			external.Logger(message)
		}

		results = append(results, elem)
	}
	cur.Close(context.TODO())

	return results, nil
}