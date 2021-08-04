package repository

import (
	"context"
	"fmt"

	"github.com/thoussei/antonio/api/external"
	"github.com/thoussei/antonio/api/team/entity"
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
	FindTeameRepo(idQuery primitive.ObjectID) (entity.Team, error)
	FindAllTeamRepo()([]entity.Team, error)
	UpdatedRepoTeam(team *entity.Team) (interface{}, error)
}

func (c *driverRepository) SavedRepoTeam(team *entity.Home) (interface{}, error) {
	var collection = c.client.Database("grd_database").Collection("team")
	insertResult, err := collection.InsertOne(context.TODO(), team)

	if err != nil {
		return nil, err
	}

	fmt.Println("Inserted a single document: ", insertResult)

	return team, nil
}

func (c *driverRepository) FindTeameRepo(idQuery primitive.ObjectID) (entity.Team, error) {
	var collection = c.client.Database("grd_database").Collection("team")
	var result entity.Team

	err := collection.FindOne(context.TODO(), bson.M{"uid": idQuery}).Decode(&result)

	if err != nil {
		return result, err
	}

	return result, nil
}

func (c *driverRepository) FindAllTeamRepo() ([]entity.Team, error) {
	var collection = c.client.Database("grd_database").Collection("team")
	var results []entity.Team
	cur, err := collection.Find(context.TODO(), bson.D{{}},options.Find())

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
				"name",team.Title,
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
				"creator",team.Creator,
			},  
			
	}}}
	updateResult, err := collection.UpdateOne(context.TODO(), filter, update)

	if err != nil {
		return nil,err
	}

	return updateResult.ModifiedCount,nil
}	