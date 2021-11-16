package repository

import (
	"context"
	"fmt"

	"github.com/thoussei/antonio/api/external"
	"github.com/thoussei/antonio/api/teams/entity"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type driverRepository struct {
	client *mongo.Client
}


func NewTeamRepository(client *mongo.Client) *driverRepository {
	return &driverRepository{client}
}


type RepositoryTeam interface {
	SavedRepoTeam(team *entity.Team) (interface{}, error)
	FindTeamRepo(idQuery primitive.ObjectID) (entity.Team, error)
	FindAllTeamRepo(pageNumber int64,limit int64)([]entity.Team, error)
	UpdatedRepoTeam(team *entity.Team) (interface{}, error)
	CountTeamRepository()(int,error)
	FindTeamByUserRepo(idQuery primitive.ObjectID) ([]entity.Team, error)
}

func (c *driverRepository) SavedRepoTeam(team *entity.Team) (interface{}, error) {
	var collection = c.client.Database("grd_database").Collection("team")
	insertResult, err := collection.InsertOne(context.TODO(), team)

	if err != nil {
		return nil, err
	}

	fmt.Println("Inserted a single document: ", insertResult)

	return team, nil
}

func (c *driverRepository) FindTeamRepo(idQuery primitive.ObjectID) (entity.Team, error) {
	var collection = c.client.Database("grd_database").Collection("team")
	var result entity.Team

	err := collection.FindOne(context.TODO(), bson.M{"uid": idQuery}).Decode(&result)

	if err != nil {
		return result, err
	}

	return result, nil
}

func (c *driverRepository) FindAllTeamRepo(pageNumber int64,limit int64) ([]entity.Team, error) {
	var collection = c.client.Database("grd_database").Collection("team")
	var results []entity.Team
	cur, err := collection.Find(context.TODO(), bson.D{{}},options.Find().SetLimit(limit).SetSkip(pageNumber).SetSort(bson.M{"_id": -1}))

	if err != nil {
		return nil, err
	}

	for cur.Next(context.TODO()) {
		var elem entity.Team
		err := cur.Decode(&elem)
		if err != nil {
			external.Logger(fmt.Sprintf("%v", err))
		}

		results = append(results, elem)
	}
	
	cur.Close(context.TODO())

	return results, nil
}

func (c *driverRepository) UpdatedRepoTeam(team *entity.Team) (interface{}, error) {
	var collection = c.client.Database("grd_database").Collection("team")
	filter := bson.D{{"uid", team.Uid}}
	update := bson.D{
		{"$set", bson.D{
			
			{
				"name",team.Name,
			},
			{
				"players",team.Players,
			},
			{
				"isBlocked",team.IsBlocked,
			},
			{
				"logo",team.Logo,
			},
			{
				"tag",team.Tag,
			},
			{
				"description",team.Description,
			},
			{
				"creator",team.Creator,
			},  
			
	}}}
	updateResult, err := collection.UpdateOne(context.TODO(), filter, update)

	if err != nil {
		return nil,err
	}

	return updateResult.ModifiedCount,nil
}

func (c *driverRepository) CountTeamRepository()(int,error) {
	var collection = c.client.Database("grd_database").Collection("team")

	records,err := collection.CountDocuments(context.TODO(), bson.D{{}})
	
	if err != nil {
		return 0, err
	}

	return int(records),nil
}

func (c *driverRepository) FindTeamByUserRepo(idQuery primitive.ObjectID) ([]entity.Team, error) {
	var collection = c.client.Database("grd_database").Collection("team")
	var results []entity.Team
	cur, err := collection.Find(context.TODO(), bson.M{"players": idQuery},options.Find().SetSort(bson.M{"_id": -1}))

	if err != nil {
		return nil, err
	}

	for cur.Next(context.TODO()) {
		var elem entity.Team
		err := cur.Decode(&elem)
		if err != nil {
			external.Logger(fmt.Sprintf("%v", err))
		}

		results = append(results, elem)
	}
	
	cur.Close(context.TODO())

	return results, nil
}
