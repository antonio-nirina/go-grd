package handler

import (
	"github.com/thoussei/antonio/api/match/entity"
	"github.com/thoussei/antonio/api/match/repository"
	"github.com/thoussei/antonio/api/user/handler"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UsecaseMatch interface {
	SavedMatchHandler(match *entity.Match) (interface{}, error)
	FindMatchHandler(idQuery string) (entity.Match, error)
	CountMatchHandler()(int,error)
}

type MatchViewModel struct {
	Uid  string `json:"uid"`
}

type matcheUsecase struct {
	matchRepository repository.RepositoryMatch
	userHandler     handler.Usecase
}

func NewUsecaseMatch(r repository.RepositoryMatch, u handler.Usecase) UsecaseMatch {
	return &matcheUsecase{
		matchRepository: r,
		userHandler:     u,
	}
}

func (m *matcheUsecase) SavedMatchHandler(match *entity.Match) (interface{}, error) {
	result, err := m.matchRepository.SavedNotifRepo(match)

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (m *matcheUsecase) FindMatchHandler(idQuery string) (entity.Match, error) {
	objectId, err := primitive.ObjectIDFromHex(idQuery)

	if err != nil {
		return entity.Match{}, err
	}

	match, err := m.matchRepository.FindMatchRepo(objectId)

	if err != nil {
		return entity.Match{}, err
	}

	return match,nil
}

func (m *matcheUsecase) CountMatchHandler()(int,error) {
	count,err := m.matchRepository.CountMatchRepository()

	if err != nil {
		return 0, err
	}

	return count,nil
}