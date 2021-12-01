package repository

import (
	"context"
	"fmt"

	cmtyEntity "github.com/thoussei/antonio/api/community/entity"
	"github.com/thoussei/antonio/api/external"
	"github.com/thoussei/antonio/api/games/entity"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// Return Interface User Repository
func NewGameRepository(client *mongo.Client) *driverRepository {
	return &driverRepository{client}
}

func (c *driverRepository) SavedGameRepository(game *entity.Game) (interface{}, error) {
	var collection = c.client.Database("grd_database").Collection("game")
	insertResult, err := collection.InsertOne(context.TODO(), game)

	if err != nil {
		return nil, err
	}

	fmt.Println("Inserted a single document: ", insertResult)

	return game, nil
}

func (c *driverRepository) FindOneGameRepository(objectId primitive.ObjectID) (interface{}, error) {
	var collection = c.client.Database("grd_database").Collection("game")
	var result entity.Game

	err := collection.FindOne(context.TODO(), bson.M{"_id": objectId}).Decode(&result)

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (c *driverRepository) FindAllGameRepository() ([]entity.Game, error) {
	var collection = c.client.Database("grd_database").Collection("game")
	var results []entity.Game
	cur, err := collection.Find(context.TODO(), bson.D{{}})

	if err != nil {
		return nil, err
	}

	for cur.Next(context.TODO()) {
		var elem entity.Game
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

func (c *driverRepository) FindOneGameByuidRepository(objectId primitive.ObjectID) (entity.Game, error) {
	var collection = c.client.Database("grd_database").Collection("game")
	var result entity.Game

	err := collection.FindOne(context.TODO(), bson.M{"uid": objectId}).Decode(&result)

	if err != nil {
		return result, err
	}

	return result, nil
}

func (c *driverRepository) FindOneGameBySlugdRepository(slug string) (entity.Game, error) {
	var collection = c.client.Database("grd_database").Collection("game")
	var result entity.Game

	err := collection.FindOne(context.TODO(), bson.M{"slug": slug}).Decode(&result)

	if err != nil {
		return result, err
	}

	return result, nil
}

func (c *driverRepository) FindGameTwitchRepository(nameGame string) (cmtyEntity.TwitchGame, error) {
	var collection = c.client.Database("grd_database").Collection("games_twitch")
	var result cmtyEntity.TwitchGame
	// err := collection.FindOne(context.TODO(), bson.M{"name": bson.M{"$regex": "/.*" + nameGame + ".*/i"}}).Decode(&result)
	err := collection.FindOne(context.TODO(), bson.M{"id": "514974"}).Decode(&result)
	fmt.Println(err)
	if err != nil {
		return result, err
	}

	return result, nil
}
