package handler

import (
	""
)

type UsecaseTournament interface {
	SavedTournamentHandler() (int64, error)
	FindTournamentHandler(idQuery string) (interface{}, error)
	FindAllTournamentHandler() ([]interface{}, error)
}

type tournamentUsecase struct {
	tournamentRepository repository.RepositoryTournament
}

func NewUsecaseTournament(r repository.RepositoryTournament) UsecaseTournament {
	return &tournamentUsecase{
		tournamentRepository: r,
	}
}

func (t *tournamentUsecase) SavedTournamentHandler() (int64, error){

}

func (t *tournamentUsecase) FindTournamentHandler(idQuery string) (interface{}, error){

}

func (t *tournamentUsecase) FindAllTournamentHandler() ([]interface{}, error){

}
