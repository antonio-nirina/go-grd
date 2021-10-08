package repository

import (
	"context"
	"fmt"

	"github.com/thoussei/antonio/api/community/entity"
	"github.com/thoussei/antonio/api/external"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type driverRepository struct {
	client *mongo.Client
}

// Return Interface User Repository
func NewCmtyRepository(client *mongo.Client) *driverRepository {
	return &driverRepository{client}
}

type RepositoryCmty interface {
	SavedCmtyRepo(community *entity.Communauty) (interface{}, error)
	FindCmtyRepo(idQuery primitive.ObjectID) (entity.Communauty, error)
	FindAllCmtyRepo(pageNumber int64, limit int64) ([]entity.Communauty, error)
	SaveGameTwitchRepository(gameTwitcch *entity.TwitchGame) (interface{}, error)
	FindAllGAmeTwitchRepo() ([]entity.TwitchGame, error)
	FindOneGamesTwitchRepo(id string) (entity.TwitchGame, error)
}

func (c *driverRepository) SavedCmtyRepo(community *entity.Communauty) (interface{}, error) {
	var collection = c.client.Database("grd_database").Collection("communauty")
	insertResult, err := collection.InsertOne(context.TODO(), community)

	if err != nil {
		return nil, err
	}

	fmt.Println("Inserted a single document: ", insertResult)

	return community, nil
}

func (c *driverRepository) FindCmtyRepo(idQuery primitive.ObjectID) (entity.Communauty, error) {
	var collection = c.client.Database("grd_database").Collection("communauty")
	var result entity.Communauty

	err := collection.FindOne(context.TODO(), bson.M{"uid": idQuery}).Decode(&result)

	if err != nil {
		return result, err
	}

	return result, nil
}

func (c *driverRepository) FindAllCmtyRepo(pageNumber int64, limit int64) ([]entity.Communauty, error) {
	var skp int64
	skp = (pageNumber - 1) * limit
	var collection = c.client.Database("grd_database").Collection("communauty")
	var results []entity.Communauty
	cur, err := collection.Find(context.TODO(), bson.D{{}}, options.Find().SetLimit(limit).SetSkip(skp).SetSort(bson.M{"_id": -1}))

	if err != nil {
		return nil, err
	}

	for cur.Next(context.TODO()) {
		var elem entity.Communauty
		err := cur.Decode(&elem)
		if err != nil {
			external.Logger(fmt.Sprintf("%v", err))
		}

		results = append(results, elem)
	}

	cur.Close(context.TODO())

	return results, nil
}

func (c *driverRepository) SaveGameTwitchRepository(gameTwitcch *entity.TwitchGame) (interface{}, error) {
	var collection = c.client.Database("grd_database").Collection("games_twitch")
	insertResult, err := collection.InsertOne(context.TODO(), gameTwitcch)

	if err != nil {
		return nil, err
	}

	fmt.Println("Inserted a single document: ", insertResult)

	return gameTwitcch, nil
}

func (c *driverRepository) FindAllGAmeTwitchRepo() ([]entity.TwitchGame, error) {
	var collection = c.client.Database("grd_database").Collection("games_twitch")
	var results []entity.TwitchGame
	cur, err := collection.Find(context.TODO(), bson.D{{}}, options.Find().SetSort(bson.M{"_id": -1}))

	if err != nil {
		return nil, err
	}

	for cur.Next(context.TODO()) {
		var elem entity.TwitchGame
		err := cur.Decode(&elem)
		if err != nil {
			external.Logger(fmt.Sprintf("%v", err))
		}

		results = append(results, elem)
	}

	cur.Close(context.TODO())

	return results, nil
}

func (c *driverRepository) FindOneGamesTwitchRepo(id string) (entity.TwitchGame, error) {
	var collection = c.client.Database("grd_database").Collection("games_twitch")
	var result entity.TwitchGame

	err := collection.FindOne(context.TODO(), bson.M{"id": id}).Decode(&result)

	if err != nil {
		return result, err
	}

	return result, nil
}
