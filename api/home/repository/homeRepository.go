package repository

import (
	"context"
	"fmt"

	"github.com/thoussei/antonio/api/external"
	"github.com/thoussei/antonio/api/home/entity"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type driverRepository struct {
	client *mongo.Client
}


func NewHomeRepository(client *mongo.Client) *driverRepository {
	return &driverRepository{client}
}


type RepositoryHome interface {
	SavedRepoHomeHandler(home *entity.Home) (interface{}, error)
	FindHomeRepo(idQuery primitive.ObjectID) (entity.Home, error)
	FindAllHomeRepo()([]entity.Home, error)
	UpdatedRepoHome(home *entity.Home) (interface{}, error)
}

func (c *driverRepository) SavedRepoHomeHandler(home *entity.Home) (interface{}, error) {
	var collection = c.client.Database("grd_database").Collection("home")
	insertResult, err := collection.InsertOne(context.TODO(), home)

	if err != nil {
		return nil, err
	}

	fmt.Println("Inserted a single document: ", insertResult)

	return home, nil
}

func (c *driverRepository) FindHomeRepo(idQuery primitive.ObjectID) (entity.Home, error) {
	var collection = c.client.Database("grd_database").Collection("home")
	var result entity.Home

	err := collection.FindOne(context.TODO(), bson.M{"uid": idQuery}).Decode(&result)

	if err != nil {
		return result, err
	}

	return result, nil
}

func (c *driverRepository) FindAllHomeRepo() ([]entity.Home, error) {
	var collection = c.client.Database("grd_database").Collection("home")
	var results []entity.Home
	cur, err := collection.Find(context.TODO(), bson.D{{}},options.Find())

	if err != nil {
		return nil, err
	}

	for cur.Next(context.TODO()) {
		var elem entity.Home
		err := cur.Decode(&elem)
		if err != nil {
			external.Logger(fmt.Sprintf("%v", err))
		}

		results = append(results, elem)
	}
	
	cur.Close(context.TODO())

	return results, nil
}

func (c *driverRepository) UpdatedRepoHome(home *entity.Home) (interface{}, error) {
	var collection = c.client.Database("grd_database").Collection("home")
	filter := bson.D{{"uid", home.Uid}}
	update := bson.D{
		{"$set", bson.D{
			
			{
				"title",home.Title,
			},
			{
				"underTitle",home.UnderTitle,
			},
			{
				"location",home.Location,
			},
			{
				"content",home.Content,
			},
			{
				"statut",home.Statut,
			},  
			
	}}}
	updateResult, err := collection.UpdateOne(context.TODO(), filter, update)

	if err != nil {
		return nil,err
	}

	return updateResult.ModifiedCount,nil
}	