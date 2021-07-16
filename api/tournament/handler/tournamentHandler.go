package handler

import (
	"github.com/thoussei/antonio/api/tournament/entity"
	"github.com/thoussei/antonio/api/tournament/repository"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UsecaseTournament interface {
	SavedTournamentHandler(*entity.Tournament) (interface{}, error)
	FindTournamentHandler(idQuery string) (tournamentViewModel, error)
	FindAllTournamentHandler(pageNumber int64,limit int64) ([]tournamentViewModel, error)
}

type tournamentUsecase struct {
	tournamentRepository repository.RepositoryTournament
}

func NewUsecaseTournament(r repository.RepositoryTournament) UsecaseTournament {
	return &tournamentUsecase{
		tournamentRepository: r,
	}
}

func (t *tournamentUsecase) SavedTournamentHandler(tournament *entity.Tournament) (interface{}, error){
	_,err := t.tournamentRepository.SavedTournamentRepo(tournament)

	if err != nil {
		return 0, err
	}

	return "Ok",nil
}

func (t *tournamentUsecase) FindTournamentHandler(idQuery string) (tournamentViewModel, error){
	objectId, err := primitive.ObjectIDFromHex(idQuery)
	
	if err != nil {
		return tournamentViewModel{}, err
	}

	result, err := t.tournamentRepository.FindTournamentRepo(objectId)

	if err != nil {
		return tournamentViewModel{}, err
	}

	tournamentViewModel := tournamentViewModel{
		Uid: result.Uid.Hex(),
		Title:result.Title,     			
		Description:result.Description,      	
		Statut:result.Statut,
		Date:result.Date,  				
		NumberParticipate:result.NumberParticipate,
		NumberTeam:result.NumberTeam, 			
		Price:result.Price,     			
		DeadlineDate:result.DeadlineDate,    	
		PriceParticipate:result.PriceParticipate,  
		Game:GameViewModel{result.Game.Uid.Hex(),result.Game.Name,result.Game.Logo,result.Game.Slug},				
		Plateform:PlateformViewModel{result.Plateform.Uid.Hex(),result.Plateform.Name,result.Plateform.Description}, 			
	}

	return tournamentViewModel,nil
}

func (t *tournamentUsecase) FindAllTournamentHandler(pageNumber int64, limit int64) ([]tournamentViewModel, error){
	result, err := t.tournamentRepository.FindAllTournamentRepo(pageNumber,limit)

	if err != nil {
		return []tournamentViewModel{}, err
	}

	var res []tournamentViewModel

	for _,val := range result {
		tournamentViewModel := tournamentViewModel{
			Uid: val.Uid.Hex(),
			Title:val.Title,
			Date:val.Date,     			
			Description:val.Description,      	
			Statut:val.Statut, 				
			NumberParticipate:val.NumberParticipate,
			NumberTeam:val.NumberTeam, 			
			Price:val.Price,     			
			DeadlineDate:val.DeadlineDate,    	
			PriceParticipate:val.PriceParticipate,  
			Game:GameViewModel{val.Game.Uid.Hex(),val.Game.Name,val.Game.Logo,val.Game.Slug},				
			Plateform:PlateformViewModel{val.Plateform.Uid.Hex(),val.Plateform.Name,val.Plateform.Description}, 			
		}

		res = append(res, tournamentViewModel)
	}
	
	return res,nil
}
