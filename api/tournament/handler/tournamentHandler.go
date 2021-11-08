package handler

import (
	"github.com/thoussei/antonio/api/tournament/entity"
	"github.com/thoussei/antonio/api/tournament/repository"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UsecaseTournament interface {
	SavedTournamentHandler(*entity.Tournament) (interface{}, error)
	FindTournamentHandler(idQuery string) (TournamentViewModel, error)
	FindOneTournamentHandler(idQuery string) (entity.Tournament, error)
	FindAllTournamentHandler(pageNumber int64, limit int64) ([]tournamentViewModel, error)
	FindTournamentGameHandler(pageNumber int64, limit int64, gameUid primitive.ObjectID) ([]tournamentViewModel, error)
	UpdatedTournamentHandler(tournament *entity.Tournament) (interface{}, error)
	FindTournamentCreatedHandler(pageNumber int64, limit int64)([]tournamentViewModel, error)
}

type tournamentUsecase struct {
	tournamentRepository repository.RepositoryTournament
}

func NewUsecaseTournament(r repository.RepositoryTournament) UsecaseTournament {
	return &tournamentUsecase{
		tournamentRepository: r,
	}
}

func (t *tournamentUsecase) SavedTournamentHandler(tournament *entity.Tournament) (interface{}, error) {
	_, err := t.tournamentRepository.SavedTournamentRepo(tournament)

	if err != nil {
		return 0, err
	}

	return "Ok", nil
}

func (t *tournamentUsecase) FindTournamentHandler(idQuery string) (TournamentViewModel, error) {
	objectId, err := primitive.ObjectIDFromHex(idQuery)

	if err != nil {
		return TournamentViewModel{}, err
	}

	result, err := t.tournamentRepository.FindTournamentRepo(objectId)

	if err != nil {
		return TournamentViewModel{}, err
	}

	var plateform []PlateformViewModel

	for _, value := range result.Plateform {
		arrayPl := PlateformViewModel{
			value.Uid.Hex(),
			value.Name,
			value.Description,
		}
		plateform = append(plateform, arrayPl)
	}

	tournamentViewModel := TournamentViewModel{
		Uid:               result.Uid.Hex(),
		Title:             result.Title,
		Description:       result.Info,
		Statut:            result.Statut,
		DateStart:         result.DateStart,
		NumberParticipate: result.NumberParticipate,
		GameWay: result.GameWay,
		Price:             result.Price,
		DeadlineDate:      result.DeadlineDate,
		PriceParticipate:  result.PriceParticipate,
		Game:              GameViewModel{result.Game.Uid.Hex(), result.Game.Name, result.Game.Image, result.Game.Logo, result.Game.Slug},
		Plateform:         plateform,
		Rules:             result.Rules,
		IsPublic:          result.IsPublic,
		Format:            result.Format,
		Server:            result.Server,
		Tchat:             result.Tchat,
		Winners:           result.Winners,
		Region:            result.Region,
		Spectateur:        result.Spectateur,
		Laps:              result.Laps,
		Maps: 				result.Maps,
	}

	return tournamentViewModel, nil
}

func (t *tournamentUsecase) FindAllTournamentHandler(pageNumber int64, limit int64) ([]tournamentViewModel, error) {
	result, err := t.tournamentRepository.FindAllTournamentRepo(pageNumber, limit)

	if err != nil {
		return []tournamentViewModel{}, err
	}

	records, err := t.tournamentRepository.CountTournamentRepository()

	if err != nil {
		return []tournamentViewModel{}, err
	}

	var res []tournamentViewModel
	var plateform []PlateformViewModel
	for _, val := range result {
		for _, value := range val.Plateform {
			arrayPl := PlateformViewModel{
				value.Uid.Hex(),
				value.Name,
				value.Description,
			}
			plateform = append(plateform, arrayPl)
		}

		tournamentViewModel := tournamentViewModel{
			Uid:               val.Uid.Hex(),
			Title:             val.Title,
			DateStart:         val.DateStart,
			Description:       val.Info,
			Statut:            val.Statut,
			NumberParticipate: val.NumberParticipate,
			GameWay: val.GameWay,
			Price:             val.Price,
			DeadlineDate:      val.DeadlineDate,
			PriceParticipate:  val.PriceParticipate,
			Game:              GameViewModel{val.Game.Uid.Hex(), val.Game.Name, val.Game.Image, val.Game.Logo, val.Game.Slug},
			Plateform:         plateform,
			Rules:             val.Rules,
			IsPublic:          val.IsPublic,
			Records:           records,
			Format:            val.Format,
			Server:            val.Server,
			Tchat:             val.Tchat,
			Winners:           val.Winners,
			Region:            val.Region,
			Spectateur:        val.Spectateur,
			Laps:              val.Laps,
			Maps: 				val.Maps,
		}

		res = append(res, tournamentViewModel)
	}

	return res, nil
}

func (t *tournamentUsecase) FindTournamentGameHandler(pageNumber int64, limit int64, game primitive.ObjectID) ([]tournamentViewModel, error) {
	result, err := t.tournamentRepository.FindTournamentGameRepo(pageNumber, limit, game)

	if err != nil {
		return []tournamentViewModel{}, err
	}

	var res []tournamentViewModel
	var plateforms []PlateformViewModel

	for _, val := range result {
		for _, value := range val.Plateform {
			arrayPl := PlateformViewModel{
				value.Uid.Hex(),
				value.Name,
				value.Description,
			}
			plateforms = append(plateforms, arrayPl)
		}

		tournamentViewModel := tournamentViewModel{
			Uid:               val.Uid.Hex(),
			Title:             val.Title,
			DateStart:         val.DateStart,
			Description:       val.Info,
			Statut:            val.Statut,
			NumberParticipate: val.NumberParticipate,
			GameWay: 			val.GameWay,
			Price:             val.Price,
			DeadlineDate:      val.DeadlineDate,
			PriceParticipate:  val.PriceParticipate,
			Game:              GameViewModel{val.Game.Uid.Hex(), val.Game.Name, val.Game.Image, val.Game.Logo, val.Game.Slug},
			Plateform:         plateforms,
			Rules:             val.Rules,
			IsPublic:          val.IsPublic,
			Format:            val.Format,
			Server:            val.Server,
			Tchat:             val.Tchat,
			Winners:           val.Winners,
			Region:            val.Region,
			Spectateur:        val.Spectateur,
			Laps:              val.Laps,
			Maps: 				val.Maps,
		}

		res = append(res, tournamentViewModel)
	}

	return res, nil
}

func (t *tournamentUsecase) CountTournamentHandler() int {
	records, err := t.tournamentRepository.CountTournamentRepository()

	if err != nil {
		return 0
	}

	return records
}

func (t *tournamentUsecase) FindOneTournamentHandler(idQuery string) (entity.Tournament, error) {
	objectId, err := primitive.ObjectIDFromHex(idQuery)

	if err != nil {
		return entity.Tournament{}, err
	}

	result, err := t.tournamentRepository.FindTournamentRepo(objectId)

	if err != nil {
		return entity.Tournament{}, err
	}

	return result, nil
}

func (t *tournamentUsecase) UpdatedTournamentHandler(tournament *entity.Tournament) (interface{}, error) {
	result, err := t.tournamentRepository.UpdatedTournament(tournament)

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (t *tournamentUsecase) FindTournamentCreatedHandler(pageNumber int64, limit int64)([]tournamentViewModel, error) {
	result, err := t.tournamentRepository.FindTournamentCreatedRepo(pageNumber, limit)

	if err != nil {
		return []tournamentViewModel{}, err
	}

	var res []tournamentViewModel
	var plateforms []PlateformViewModel

	for _, val := range result {
		for _, value := range val.Plateform {
			arrayPl := PlateformViewModel{
				value.Uid.Hex(),
				value.Name,
				value.Description,
			}
			plateforms = append(plateforms, arrayPl)
		}

		tournamentViewModel := tournamentViewModel{
			Uid:               val.Uid.Hex(),
			Title:             val.Title,
			DateStart:         val.DateStart,
			Description:       val.Info,
			Statut:            val.Statut,
			NumberParticipate: val.NumberParticipate,
			GameWay: 			val.GameWay,
			Price:             val.Price,
			DeadlineDate:      val.DeadlineDate,
			PriceParticipate:  val.PriceParticipate,
			Game:              GameViewModel{val.Game.Uid.Hex(), val.Game.Name, val.Game.Image, val.Game.Logo, val.Game.Slug},
			Plateform:         plateforms,
			Rules:             val.Rules,
			IsPublic:          val.IsPublic,
			Format:            val.Format,
			Server:            val.Server,
			Tchat:             val.Tchat,
			Winners:           val.Winners,
			Region:            val.Region,
			Spectateur:        val.Spectateur,
			Laps:              val.Laps,
			Maps: 				val.Maps,
		}

		res = append(res, tournamentViewModel)
	}

	return res, nil
}
