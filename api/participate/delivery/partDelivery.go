package delivery

import (
	"github.com/graphql-go/graphql"
	GEntity "github.com/thoussei/antonio/api/games/entity"
	"github.com/thoussei/antonio/api/participate/entity"
	"github.com/thoussei/antonio/api/participate/handler"
	tEntity "github.com/thoussei/antonio/api/tournament/entity"
	tournamentHandler "github.com/thoussei/antonio/api/tournament/handler"
	userHandler "github.com/thoussei/antonio/api/user/handler"
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
		user:user,
		tournament:tournament,
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

	objectId, _ := primitive.ObjectIDFromHex(tournament.Uid)
	objectIdGame, _ := primitive.ObjectIDFromHex(tournament.Game.Uid)
	objectIdPlt, _ := primitive.ObjectIDFromHex(tournament.Plateform.Uid)

	tournamentObject := tEntity.Tournament{
		Uid:objectId,
		Title:tournament.Title,
		Date:tournament.Date,
		Game:GEntity.Game{
			Uid:objectIdGame,
			Name: tournament.Game.Name,
			Image: tournament.Game.Image,
			Slug: tournament.Game.Slug,
			Logo: tournament.Game.Logo,
			} ,
		Plateform:GEntity.GamePlatform{Uid: objectIdPlt,Name: tournament.Plateform.Name,Description: tournament.Plateform.Description},
		NumberParticipate:tournament.NumberParticipate,
		NumberTeam:tournament.NumberTeam,
		Price:tournament.Price,
		DeadlineDate:tournament.DeadlineDate,
		PriceParticipate:tournament.PriceParticipate,
		Statut:tournament.Statut,
		Info:tournament.Info,
		Rules:tournament.Rules,
		IsPublic:tournament.IsPublic,
	}
	part := &entity.Participate{
		Uid:primitive.NewObjectID(),
		Date:date,
		User:user,
		Tournament:tournamentObject,
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

