package repository

import (
	"context"

	"github.com/thoussei/antonio/api/external"
	"github.com/thoussei/antonio/api/tournament/entity"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)


type DriverRepository struct {
	client *mongo.Client
}


// Return Interface User Repository
func NewTournamentRepository(client *mongo.Client) *DriverRepository {
	return &DriverRepository{client}
}


type RepositoryTournament interface {
	SavedTournamentRepo(tournament *entity.Tournament) (interface{}, error)
	FindTournamentRepo(idUser primitive.ObjectID,idQuery primitive.ObjectID) (interface{}, error)
	FindAllTournamentRepo(idUser primitive.ObjectID) ([]entity.Tournament, error)
}

func (d *DriverRepository) SavedTournamentRepo(tournament *entity.Tournament) (interface{}, error){

}

func (d *DriverRepository) FindTournamentRepo(idUser primitive.ObjectID,idQuery primitive.ObjectID) (interface{}, error){

}

func (d *DriverRepository) FindAllTournamentRepo(idUser primitive.ObjectID) ([]entity.Tournament, error){

}
