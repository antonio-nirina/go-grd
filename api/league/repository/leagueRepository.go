package repository

import (
	"context"
	"fmt"

	"github.com/thoussei/antonio/api/external"
	"github.com/thoussei/antonio/api/league/entity"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)


type DriverRepository struct {
	client *mongo.Client
}


// Return Interface User Repository
func NewLeagueRepository(client *mongo.Client) *DriverRepository {
	return &DriverRepository{client}
}


type RepositoryTournament interface {
	SavedLeagueRepo(league *entity.League) (interface{}, error)
	FindLeagueRepo(idQuery primitive.ObjectID) (entity.League, error)
	FindAllLeagueRepo(pageNumber int64,limit int64) ([]entity.League, error)
	FindLeagueGameRepo(pageNumber int64,limit int64,game primitive.ObjectID) ([]entity.League, error)
	CountLeagueRepository()(int,error)
}

func (c *DriverRepository) SavedLeagueRepo(league *entity.League) (interface{}, error){
	var collection = c.client.Database("grd_database").Collection("league")
	insertResult, err := collection.InsertOne(context.TODO(), league)

	if err != nil {
		return nil, err
	}

	fmt.Println("Inserted a single document: ", insertResult)

	return league, nil
}

func (c *DriverRepository) FindLeagueRepo(idQuery primitive.ObjectID) (entity.League, error){
	var collection = c.client.Database("grd_database").Collection("league")
	var result entity.League

	err := collection.FindOne(context.TODO(), bson.M{"uid": idQuery}).Decode(&result)

	if err != nil {
		return result, err
	}

	return result, nil
}

func (c *DriverRepository) FindAllLeagueRepo(pageNumber int64,limit int64) ([]entity.League, error){
	// var skp int64 
	// skp = (pageNumber - 1) * limit
	var collection = c.client.Database("grd_database").Collection("league")
	var results []entity.League
	cur, err := collection.Find(context.TODO(), bson.D{{}},options.Find().SetLimit(limit).SetSkip(pageNumber).SetSort(bson.M{"_id": -1}))

	if err != nil {
		return nil, err
	}

	for cur.Next(context.TODO()) {
		var elem entity.League
		err := cur.Decode(&elem)
		if err != nil {
			external.Logger(fmt.Sprintf("%v", err))
		}

		results = append(results, elem)
	}
	
	cur.Close(context.TODO())

	return results, nil
}

func (c *DriverRepository) FindLeagueGameRepo(pageNumber int64,limit int64,game primitive.ObjectID) ([]entity.League, error) {
	var collection = c.client.Database("grd_database").Collection("league")
	var results []entity.League
	cur, err := collection.Find(context.TODO(), bson.D{{"game.uid", game}},options.Find().SetLimit(limit).SetSkip(pageNumber).SetSort(bson.M{"_id": -1}))

	if err != nil {
		return nil, err
	}

	for cur.Next(context.TODO()) {
		var elem entity.League
		err := cur.Decode(&elem)
		if err != nil {
			external.Logger(fmt.Sprintf("%v", err))
		}

		results = append(results, elem)
	}
	
	cur.Close(context.TODO())

	return results, nil
}

func (c *DriverRepository) CountLeagueRepository()(int,error) {
	var collection = c.client.Database("grd_database").Collection("league")

	records,err := collection.CountDocuments(context.TODO(), bson.D{{}})
	
	if err != nil {
		return 0, err
	}

	return int(records),nil
}
