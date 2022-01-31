package handler

import (
	"github.com/thoussei/antonio/api/match/entity"
	"github.com/thoussei/antonio/api/match/repository"
	"github.com/thoussei/antonio/api/user/handler"
)

type UsecaseMatch interface {
	SavedMatchHandler(match *entity.Match) (interface{}, error)
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

}
