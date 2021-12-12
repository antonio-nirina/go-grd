package repository

import (
	"context"
	"fmt"
	"time"

	"github.com/thoussei/antonio/api/external"
	"github.com/thoussei/antonio/api/rate/entity"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type driverRepository struct {
	client *mongo.Client
}

func NewRateRepository(client *mongo.Client) *driverRepository {
	return &driverRepository{client}
}

type RepositoryRate interface {
	SavedRepoRate(team *entity.Rate) (interface{}, error)
	FindRateRepo(idQuery primitive.ObjectID) (entity.Rate, error)
	FindAllRateRepo(pageNumber int64, limit int64) ([]entity.Rate, error)
	FindRateByUserRepo(uidUser string) (entity.Rate, error)
	FindRateInWeekRepo(date time.Time) ([]entity.Rate, error)
	FindRateCreateOrUpdatedRepo(objectId primitive.ObjectID, rate *entity.Rate) (interface{}, error)
}

func (c *driverRepository) SavedRepoRate(rate *entity.Rate) (interface{}, error) {
	var collection = c.client.Database("grd_database").Collection("rate")
	insertResult, err := collection.InsertOne(context.TODO(), rate)

	if err != nil {
		return nil, err
	}

	fmt.Println("Inserted a single document: ", insertResult)

	return rate, nil
}

func (c *driverRepository) FindRateRepo(idQuery primitive.ObjectID) (entity.Rate, error) {
	var collection = c.client.Database("grd_database").Collection("rate")
	var result entity.Rate

	err := collection.FindOne(context.TODO(), bson.M{"uid": idQuery}).Decode(&result)

	if err != nil {
		return result, err
	}

	return result, nil
}

func (c *driverRepository) FindAllRateRepo(pageNumber int64, limit int64) ([]entity.Rate, error) {
	var collection = c.client.Database("grd_database").Collection("rate")
	var results []entity.Rate
	cur, err := collection.Find(context.TODO(), bson.D{{}}, options.Find().SetLimit(limit).SetSkip(pageNumber).SetSort(bson.M{"_id": -1}))

	if err != nil {
		return nil, err
	}

	for cur.Next(context.TODO()) {
		var elem entity.Rate
		err := cur.Decode(&elem)
		if err != nil {
			external.Logger(fmt.Sprintf("%v", err))
		}

		results = append(results, elem)
	}

	cur.Close(context.TODO())

	return results, nil
}

func (c *driverRepository) FindRateByUserRepo(uidUser string) (entity.Rate, error) {
	var collection = c.client.Database("grd_database").Collection("rate")
	var result entity.Rate

	err := collection.FindOne(context.TODO(), bson.M{"user": uidUser}).Decode(&result)

	if err != nil {
		return result, err
	}

	return result, nil
}

func (c *driverRepository) FindRateInWeekRepo(date time.Time) ([]entity.Rate, error) {
	var collection = c.client.Database("grd_database").Collection("rate")
	var results []entity.Rate
	cur, err := collection.Find(context.TODO(), bson.M{"updated": bson.M{"$gte": date, "$lte": time.Now().Format(time.RFC3339)}}, options.Find().SetSort(bson.M{"_id": -1}))

	if err != nil {
		return nil, err
	}

	for cur.Next(context.TODO()) {
		var elem entity.Rate
		err := cur.Decode(&elem)
		if err != nil {
			external.Logger(fmt.Sprintf("%v", err))
		}

		results = append(results, elem)
	}

	cur.Close(context.TODO())

	return results, nil
}

func (c *driverRepository) FindRateCreateOrUpdatedRepo(objectId primitive.ObjectID, rate *entity.Rate) (interface{}, error) {
	var collection = c.client.Database("grd_database").Collection("team")
	filter := bson.D{{"uid", objectId}}
	update := bson.D{
		{"$set", bson.D{

			{
				"updated", rate.Updated,
			},
			{
				"created", rate.Created,
			},
			{
				"user", rate.User,
			},
			{
				"score", rate.Score,
			},
		}}}
	updateResult, err := collection.UpdateOne(context.TODO(), filter, update)

	if err != nil {
		return nil, err
	}

	return updateResult.ModifiedCount, nil
}
