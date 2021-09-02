package repository

import (
	"context"
	"fmt"

	"github.com/thoussei/antonio/api/external"
	"github.com/thoussei/antonio/api/participate/entity"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)


type DriverRepository struct {
	client *mongo.Client
}


// Return Interface User Repository
func NewPartRepository(client *mongo.Client) *DriverRepository {
	return &DriverRepository{client}
}


type RepositoryPart interface {
	SavedPartRepo(tournament *entity.Participate) (interface{}, error)
	FindPartRepo(idQuery primitive.ObjectID) (entity.Participate, error)
	FindAllPartRepo(pageNumber int64,limit int64) ([]entity.Participate, error)
	FindPartUserRepo(pageNumber int64,limit int64,game primitive.ObjectID) ([]entity.Participate, error)
	UpdatedPartUserRepo(objectId primitive.ObjectID) (interface{}, error)
	FindPartByTournamentRepo(userUid primitive.ObjectID,objectId primitive.ObjectID) (entity.Participate, error)
	FindPartByLeagueRepo(userUid  primitive.ObjectID,objectId primitive.ObjectID) (entity.Participate, error)
}

func (c *DriverRepository) SavedPartRepo(tournament *entity.Participate) (interface{}, error){
	var collection = c.client.Database("grd_database").Collection("participate")
	insertResult, err := collection.InsertOne(context.TODO(), tournament)

	if err != nil {
		return nil, err
	}

	fmt.Println("Inserted a single document: ", insertResult)

	return tournament, nil
}

func (c *DriverRepository) FindPartRepo(idQuery primitive.ObjectID) (entity.Participate, error){
	var collection = c.client.Database("grd_database").Collection("participate")
	var result entity.Participate

	err := collection.FindOne(context.TODO(), bson.M{"uid": idQuery}).Decode(&result)

	if err != nil {
		return result, err
	}

	return result, nil
}

func (c *DriverRepository) FindAllPartRepo(pageNumber int64,limit int64) ([]entity.Participate, error){
	var skp int64 
	skp = (pageNumber - 1) * limit
	var collection = c.client.Database("grd_database").Collection("participate")
	var results []entity.Participate
	cur, err := collection.Find(context.TODO(), bson.D{{}},options.Find().SetLimit(limit).SetSkip(skp).SetSort(bson.M{"_id": -1}))

	if err != nil {
		return nil, err
	}

	for cur.Next(context.TODO()) {
		var elem entity.Participate
		err := cur.Decode(&elem)
		if err != nil {
			external.Logger(fmt.Sprintf("%v", err))
		}

		results = append(results, elem)
	}
	
	cur.Close(context.TODO())

	return results, nil
}

func (c *DriverRepository) FindPartUserRepo(pageNumber int64,limit int64,user primitive.ObjectID) ([]entity.Participate, error) {
	var skp int64 
	skp = (pageNumber - 1) * limit
	var collection = c.client.Database("grd_database").Collection("participate")
	var results []entity.Participate
	cur, err := collection.Find(context.TODO(), bson.D{{"user.uid", user}},options.Find().SetLimit(limit).SetSkip(skp).SetSort(bson.M{"_id": -1}))

	if err != nil {
		return nil, err
	}

	for cur.Next(context.TODO()) {
		var elem entity.Participate
		err := cur.Decode(&elem)
		if err != nil {
			external.Logger(fmt.Sprintf("%v", err))
		}

		results = append(results, elem)
	}
	
	cur.Close(context.TODO())

	return results, nil
}

func (c *DriverRepository) UpdatedPartUserRepo(objectId primitive.ObjectID) (interface{}, error) {
	var collection = c.client.Database("grd_database").Collection("participate")
	filter := bson.D{{"uid", objectId}}
	update := bson.D{
		{"$set", bson.D{
			{
				"IsWin", true,
			},
	}}}
	updateResult, err := collection.UpdateOne(context.TODO(), filter, update)

	if err != nil {
		return nil,err
	}

	return updateResult.ModifiedCount,nil
}

func (c *DriverRepository) FindPartByTournamentRepo(userUid primitive.ObjectID,objectId primitive.ObjectID) (entity.Participate, error){
	var collection = c.client.Database("grd_database").Collection("participate")
	var result entity.Participate

	err := collection.FindOne(context.TODO(), bson.M{"user.uid": userUid,"tournament.uid":objectId}).Decode(&result)

	if err != nil {
		return result, err
	}

	return result, nil
}

func (c *DriverRepository) FindPartByLeagueRepo(userUid  primitive.ObjectID,objectId primitive.ObjectID) (entity.Participate, error){
	var collection = c.client.Database("grd_database").Collection("Participate")
	var result entity.Participate

	err := collection.FindOne(context.TODO(), bson.M{"user.uid": userUid,"league.uid":objectId}).Decode(&result)

	if err != nil {
		return result, err
	}

	return result, nil
}
