package delivery

import (

	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/tournament/handler"
)

type TournamentResolver interface {
	SavedTournamentResolver(params graphql.ResolveParams) (interface{}, error)
	FindTournamentResolver(params graphql.ResolveParams) (interface{}, error)
	FindAllTournamentResolver(params graphql.ResolveParams) (interface{}, error)
}

type tournamentNotif struct {
	tournamentHandler handler.UsecaseTournament
}

func NewResolverTournament(tournamentUseCase handler.UsecaseTournament) TournamentResolver {
	return &tournamentNotif{
		tournamentHandler: tournamentUseCase,
	}
}

func (t *tournamentNotif) SavedTournamentResolver(params graphql.ResolveParams) (interface{}, error) {
	return "",nil
} 

func (t *tournamentNotif) FindTournamentResolver(params graphql.ResolveParams) (interface{}, error) {
	return "",nil
} 

func (t *tournamentNotif) FindAllTournamentResolver(params graphql.ResolveParams) (interface{}, error) {
	return "",nil
} 