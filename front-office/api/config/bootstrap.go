package config 


import (
	"go.mongodb.org/mongo-driver/mongo"
)


type DriverRepository struct {
	client *mongo.Client
}


// Return Interface User Repository
func NewRepository(client *mongo.Client) *DriverRepository {
	return &DriverRepository{client}
}
