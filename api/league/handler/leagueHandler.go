package handler

import (
	"github.com/thoussei/antonio/api/league/entity"
	"github.com/thoussei/antonio/api/league/repository"
	tournament "github.com/thoussei/antonio/api/tournament/handler"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UsecaseLeague interface {
	SavedLeagueHandler(*entity.League) (interface{}, error)
	FindLeagueHandler(idQuery string) (leagueViewModel, error)
	FindOneLeagueHandler(idQuery string) (entity.League, error)
	FindAllLeagueHandler(pageNumber int64,limit int64) ([]leagueViewModel, error)
	FindLeagueGameHandler(pageNumber int64,limit int64,gameUid primitive.ObjectID) ([]leagueViewModel, error)
}

type leagueUsecase struct {
	leagueRepository repository.RepositoryLeague
}

func NewUsecaseLeague(r repository.RepositoryLeague) UsecaseLeague {
	return &leagueUsecase{
		leagueRepository: r,
	}
}

func (l *leagueUsecase) SavedLeagueHandler(league *entity.League) (interface{}, error){
	_,err := l.leagueRepository.SavedLeagueRepo(league)

	if err != nil {
		return 0, err
	}

	return "Ok",nil
}

func (l *leagueUsecase) FindLeagueHandler(idQuery string) (leagueViewModel, error){
	objectId, err := primitive.ObjectIDFromHex(idQuery)
	
	if err != nil {
		return leagueViewModel{}, err
	}

	result, err := l.leagueRepository.FindLeagueRepo(objectId)

	if err != nil {
		return leagueViewModel{}, err
	}

	leagueViewModel := leagueViewModel{
		Uid: result.Uid.Hex(),
		Title:result.Title,     			
		Description:result.Info,      	
		Statut:result.Statut,
		Date:result.Date,  				
		NumberParticipate:result.NumberParticipate,
		NumberTeam:result.NumberTeam, 			
		Price:result.Price,     			
		DeadlineDate:result.DeadlineDate,    	
		PriceParticipate:result.PriceParticipate,  
		Game:tournament.GameViewModel{result.Game.Uid.Hex(),result.Game.Name,result.Game.Image,result.Game.Logo,result.Game.Slug},				
		Plateform:tournament.PlateformViewModel{result.Plateform.Uid.Hex(),result.Plateform.Name,result.Plateform.Description},
		Rules:result.Rules,
		IsPublic:result.IsPublic,
		IsTeam:result.IsTeam,
		Organizer:result.Organizer,
		NumberGroup:result.NumberGroup, 			
	}

	return leagueViewModel,nil
}

func (l *leagueUsecase) FindOneLeagueHandler(idQuery string) (entity.League, error) {
	objectId, err := primitive.ObjectIDFromHex(idQuery)
	
	if err != nil {
		return entity.League{}, err
	}

	result, err := l.leagueRepository.FindLeagueRepo(objectId)

	if err != nil {
		return entity.League{}, err
	}

	return result,nil
}

func (l *leagueUsecase) FindAllLeagueHandler(pageNumber int64, limit int64) ([]leagueViewModel, error){
	result, err := l.leagueRepository.FindAllLeagueRepo(pageNumber,limit)

	if err != nil {
		return []leagueViewModel{}, err
	}

	records,err := l.leagueRepository.CountLeagueRepository()

	if err != nil {
		return []leagueViewModel{}, err
	}

	var res []leagueViewModel

	for _,val := range result {
		leagueView := leagueViewModel{
			Uid: val.Uid.Hex(),
			Title:val.Title,
			Date:val.Date,     			
			Description:val.Info,      	
			Statut:val.Statut, 				
			NumberParticipate:val.NumberParticipate,
			NumberTeam:val.NumberTeam, 			
			Price:val.Price,     			
			DeadlineDate:val.DeadlineDate,    	
			PriceParticipate:val.PriceParticipate,  
			Game:tournament.GameViewModel{val.Game.Uid.Hex(),val.Game.Name,val.Game.Image,val.Game.Logo,val.Game.Slug},				
			Plateform:tournament.PlateformViewModel{val.Plateform.Uid.Hex(),val.Plateform.Name,val.Plateform.Description},
			Rules:val.Rules, 
			IsPublic:val.IsPublic,
			Organizer:val.Organizer,
			Records:records, 			
		}

		res = append(res, leagueView)
	}
	
	return res,nil
}

func (l *leagueUsecase) FindLeagueGameHandler(pageNumber int64,limit int64,game primitive.ObjectID) ([]leagueViewModel, error) {
	result, err := l.leagueRepository.FindLeagueGameRepo(pageNumber,limit,game)

	if err != nil {
		return []leagueViewModel{}, err
	}

	var res []leagueViewModel

	for _,val := range result {
		leagueView := leagueViewModel{
			Uid: val.Uid.Hex(),
			Title:val.Title,
			Date:val.Date,     			
			Description:val.Info,      	
			Statut:val.Statut, 				
			NumberParticipate:val.NumberParticipate,
			NumberTeam:val.NumberTeam, 			
			Price:val.Price,     			
			DeadlineDate:val.DeadlineDate,    	
			PriceParticipate:val.PriceParticipate,  
			Game:tournament.GameViewModel{val.Game.Uid.Hex(),val.Game.Name,val.Game.Image,val.Game.Logo,val.Game.Slug},				
			Plateform:tournament.PlateformViewModel{val.Plateform.Uid.Hex(),val.Plateform.Name,val.Plateform.Description},
			Rules:val.Rules,
			Organizer:val.Organizer,
			IsPublic:val.IsPublic,  			
		}

		res = append(res, leagueView)
	}
	
	return res,nil
}

func (l *leagueUsecase) CountLeagueHandler()(int) {
	records,err := l.leagueRepository.CountLeagueRepository()

	if err != nil {
		return 0
	}
	
	return records
}
