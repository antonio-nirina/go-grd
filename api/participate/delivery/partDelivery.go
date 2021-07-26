package delivery

import (
	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/participate/entity"
	userHandler "github.com/thoussei/antonio/api/user/handler"
	tournamentHandler "github.com/thoussei/antonio/api/tournament/handler"
	"github.com/thoussei/antonio/api/participate/handler"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type PartResolver interface {
	SavedPartResolver(params graphql.ResolveParams) (interface{}, error)
	FindPartResolver(params graphql.ResolveParams) (interface{}, error)
	FindAllPartResolver(params graphql.ResolveParams) (interface{}, error)
	FindPartByUseResolver(params graphql.ResolveParams) (interface{}, error)
}

type participate struct {
	partHandler handler.UsecasePart
	user userHandler.Usecase
	tournament tournamentHandler.UsecaseTournament
}

func NewResolverPart(partUseCase handler.UsecasePart,user userHandler.Usecase,tournament tournamentHandler.UsecaseTournament) PartResolver {
	return &participate{
		partHandler: partUseCase,
		user:tournamentGame,
		tournament:tournamentHandler,
	}
}

func (p *participate) SavedPartResolver(params graphql.ResolveParams) (interface{}, error){
	date, _ := params.Args["date"].(string)
	userUid, _ := params.Args["userUid"].(string)
	tournamentUid, _ := params.Args["tournamentUid"].(string)
	user,err := p.user.FindOneUserByUid(userUid)
	tournament,err := p.tournament.FindTournamentHandler(tournamentUid)

	if err != nil {
		return nil, err
	}
	part := &entity.Participate{
		Uid:primitive.NewObjectID(),
		Date:date,
		User:user,
		Tournament:tournament,
	}

	res, err := p.partHandler.SavedPartHandler(part)

	if err != nil {
		return nil, err
	}

	return res, nil
}

func (p *participate) FindPartResolver(params graphql.ResolveParams) (interface{}, error){

	return "",nil
}
func (p *participate) FindAllPartResolver(params graphql.ResolveParams) (interface{}, error){

	return "",nil
}

func (p *participate) FindPartByUseResolver(params graphql.ResolveParams) (interface{}, error){
	return "",nil
}

