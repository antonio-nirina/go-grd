package handler

import (
	"fmt"

	"github.com/thoussei/antonio/api/external"
	"github.com/thoussei/antonio/api/participate/entity"
	"github.com/thoussei/antonio/api/participate/repository"
	teamH "github.com/thoussei/antonio/api/teams/handler"
	tHandler "github.com/thoussei/antonio/api/tournament/handler"
	userH "github.com/thoussei/antonio/api/user/handler"
	wHandler "github.com/thoussei/antonio/api/wagger/handler"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UsecasePart interface {
	SavedPartHandler(part *entity.Participate) (interface{}, error)
	FindPartHandler(idQuery string) (partViewModel, error)
	FindAllPartHandler(pageNumber int64, limit int64) ([]partViewModel, error)
	FindPartUserHandler(pageNumber int64, limit int64, userUid primitive.ObjectID) ([]partViewModel, error)
	UpdatedPartUserHandler(partUid string, userUid primitive.ObjectID) (interface{}, error)
	FindPartUserLeagueHandler(uidUser primitive.ObjectID, leagueUid string) (partViewModel, error)
	FindPartUserTournamentHandler(uidUser primitive.ObjectID, tournamentUid string) (partViewModel, error)
	RemovedPartHandler(idQuery string) (interface{}, error)
	UpdatedPartNumberConfirmedHandler(userPartUid string, numberConf bool) (interface{}, error)
	GetNumberPartHandler(userPartUid string) (interface{}, error)
	FindPartUserWaggerHandler(userUid primitive.ObjectID, uidWagger primitive.ObjectID) (interface{}, error)
	FindAllPartUserWaggerHandler(userUid primitive.ObjectID, pageNumber int64, limit int64) ([]partWaggerViewModel, error)
	FindPartTournamentHandler(tournament tHandler.TournamentViewModel)([]partViewModelTournament,error)
	LeavePartTournamentHandler(partUid string,userUId string)(interface{}, error)
}
type partUsecase struct {
	partRepository repository.RepositoryPart
	teamUsecase teamH.UsecaseTeam
	userUsescase userH.Usecase
}

func NewUsecasePart(r repository.RepositoryPart, t teamH.UsecaseTeam,u userH.Usecase) UsecasePart {
	return &partUsecase{
		partRepository: r,
		teamUsecase: t,
		userUsescase:u,
	}
}

func (p *partUsecase) SavedPartHandler(part *entity.Participate) (interface{}, error) {
	rec, err := p.partRepository.SavedPartRepo(part)
	user,err := p.userUsescase.FindOneUserByUid(part.User)

	if err != nil {
		return 0, err
	}

	var plateform string
	
	for key,item := range part.Tournament.Plateform {
		if key > 0 {
			plateform = fmt.Sprintf("%s%s",item.Name,"-")
		} else {
			plateform = fmt.Sprintf("%s",item.Name)
		}
	}

	message := fmt.Sprintf("%s%s%s%s%s","Ta demande de participaer au tournoi",plateform,"-",part.Tournament.Game.Name,"a bien été effectué avec succes")
	mailer := external.ToMailer{
		Email: user.Email,
		Firstname: user.FirstName,
		Lastname: user.LastName,
		Subject: "Confirmation de participer au tournoi",
		Message: message,
	}

	mailer.InitialeMailjet()

	return rec, nil
}

func (p *partUsecase) FindPartHandler(idQuery string) (partViewModel, error) {
	objectId, err := primitive.ObjectIDFromHex(idQuery)

	if err != nil {
		return partViewModel{}, err
	}

	result, err := p.partRepository.FindPartRepo(objectId)

	if err != nil {
		return partViewModel{}, err
	}

	var teamView []teamH.TeamViewModel
	var userView []userH.UserViewModel
	user, _ := p.userUsescase.FindOneUserByUid(result.User)

	for _, val := range result.Team {
		teamRes,_ := p.teamUsecase.FindOneTeamHandler(val)
		for _, item := range teamRes.Players {
			userPlayesr,_ := p.userUsescase.FindOneUserByUid(item)
			resUser := userH.UserViewModel{
				Uid:           userPlayesr.Uid.Hex(),
				FirstName:     userPlayesr.FirstName,
				LastName:      userPlayesr.LastName,
				Email:         userPlayesr.Email,
				Username:      userPlayesr.Username,
				IsBanned:      userPlayesr.IsBanned,
				Avatar:        userPlayesr.Avatar,
				Language:      userPlayesr.Language,
				Point:         userPlayesr.Point,
				Roles:         userPlayesr.Roles,
				TypeConnexion: userPlayesr.TypeConnexion,
				Created:       userPlayesr.Created,
			}
			userView = append(userView, resUser)
		}
		resTeam := teamH.TeamViewModel{
			Uid:          teamRes.Uid.Hex(),
			Name:         teamRes.Name,
			CreationDate: teamRes.CreationDate,
			Players:      userView,
			Description:  teamRes.Description,
			IsBlocked:    teamRes.IsBlocked,
			Logo:         teamRes.Logo,
			Creator: 	 teamRes.Creator.Username,
			Records: 0,
		}

		teamView = append(teamView, resTeam)
	}

	var plateform []tHandler.PlateformViewModel
	for _, value := range result.Tournament.Plateform {
		arrayPl := tHandler.PlateformViewModel{
			value.Uid.Hex(),
			value.Name,
			value.Description,
		}
		plateform = append(plateform, arrayPl)
	}

	partViewModel := partViewModel{
		Uid:   result.Uid.Hex(),
		Date:  result.Date,
		Team:  teamView,
		IsWin: false,
		User: userH.UserViewModel{
			Uid:           user.Uid.Hex(),
			FirstName:     user.FirstName,
			LastName:      user.LastName,
			Email:         user.Email,
			Username:      user.Username,
			IsBanned:      user.IsBanned,
			Avatar:        user.Avatar,
			Language:      user.Language,
			Point:         user.Point,
			Roles:         user.Roles,
			TypeConnexion: user.TypeConnexion,
			Created:       user.Created,
		},
		Tournament: tHandler.TournamentViewModel{
			result.Tournament.Uid.Hex(),
			result.Tournament.Title,
			result.Tournament.DateStart,
			result.Tournament.Info,
			result.Tournament.Statut,
			result.Tournament.NumberParticipate,
			result.Tournament.Price,
			result.Tournament.DeadlineDate,
			result.Tournament.PriceParticipate,
			tHandler.GameViewModel{
				result.Tournament.Game.Uid.Hex(),
				result.Tournament.Game.Name,
				result.Tournament.Game.Image,
				result.Tournament.Game.Logo,
				result.Tournament.Game.Slug,
			},
			plateform,
			result.Tournament.Rules,
			result.Tournament.IsPublic,
			result.Tournament.Format,
			result.Tournament.Server,
			result.Tournament.Tchat,
			result.Tournament.Winners,
			result.Tournament.Region,
			result.Tournament.Spectateur,
			result.Tournament.Laps,
			result.Tournament.Maps,
			result.Tournament.GameWay,
			result.Tournament.IsTeam,
		},
	}

	return partViewModel, nil
}

func (p *partUsecase) FindAllPartHandler(pageNumber int64, limit int64) ([]partViewModel, error) {
	results, err := p.partRepository.FindAllPartRepo(pageNumber, limit)

	if err != nil {
		return []partViewModel{}, err
	}

	var res []partViewModel
	var teamView []teamH.TeamViewModel
	var userView []userH.UserViewModel

	for _, result := range results {
		if len(result.Team) > 0 {
			for _, val := range result.Team {
				teamRes,_ := p.teamUsecase.FindOneTeamHandler(val)
				for _, item := range teamRes.Players {
					userPlayesr,_ := p.userUsescase.FindOneUserByUid(item)
					resUser := userH.UserViewModel{
						Uid:           userPlayesr.Uid.Hex(),
						FirstName:     userPlayesr.FirstName,
						LastName:      userPlayesr.LastName,
						Email:         userPlayesr.Email,
						Username:      userPlayesr.Username,
						IsBanned:      userPlayesr.IsBanned,
						Avatar:        userPlayesr.Avatar,
						Language:      userPlayesr.Language,
						Point:         userPlayesr.Point,
						Roles:         userPlayesr.Roles,
						TypeConnexion: userPlayesr.TypeConnexion,
						Created:       userPlayesr.Created,
					}
					userView = append(userView, resUser)
				}
				resTeam := teamH.TeamViewModel{
					Uid:          teamRes.Uid.Hex(),
					Name:         teamRes.Name,
					CreationDate: teamRes.CreationDate,
					Players:      userView,
					Description:  teamRes.Description,
					IsBlocked:    teamRes.IsBlocked,
					Logo:         teamRes.Logo,
					Creator: teamRes.Creator.Username,
					Records: 0,
				}
				teamView = append(teamView, resTeam)
			}
		}
		

		var plateform []tHandler.PlateformViewModel
		for _, value := range result.Tournament.Plateform {
			arrayPl := tHandler.PlateformViewModel{
				value.Uid.Hex(),
				value.Name,
				value.Description,
			}
			plateform = append(plateform, arrayPl)
		}

		user,_ := p.userUsescase.FindOneUserByUid(result.User)

		partView := partViewModel{
			Uid:   result.Uid.Hex(),
			Date:  result.Date,
			Team:  teamView,
			IsWin: false,
			User: userH.UserViewModel{
				Uid:           user.Uid.Hex(),
				FirstName:     user.FirstName,
				LastName:      user.LastName,
				Email:         user.Email,
				Username:      user.Username,
				IsBanned:      user.IsBanned,
				Avatar:        user.Avatar,
				Language:      user.Language,
				Point:         user.Point,
				Roles:         user.Roles,
				TypeConnexion: user.TypeConnexion,
				Created:       user.Created,
			},
			Tournament: tHandler.TournamentViewModel{
				result.Tournament.Uid.Hex(),
				result.Tournament.Title,
				result.Tournament.DateStart,
				result.Tournament.Info,
				result.Tournament.Statut,
				result.Tournament.NumberParticipate,
				result.Tournament.Price,
				result.Tournament.DeadlineDate,
				result.Tournament.PriceParticipate,
				tHandler.GameViewModel{
					result.Tournament.Game.Uid.Hex(),
					result.Tournament.Game.Name,
					result.Tournament.Game.Image,
					result.Tournament.Game.Logo,
					result.Tournament.Game.Slug,
				},
				plateform,
				result.Tournament.Rules,
				result.Tournament.IsPublic,
				result.Tournament.Format,
				result.Tournament.Server,
				result.Tournament.Tchat,
				result.Tournament.Winners,
				result.Tournament.Region,
				result.Tournament.Spectateur,
				result.Tournament.Laps,
				result.Tournament.Maps,
				result.Tournament.GameWay,
				result.Tournament.IsTeam,
			},
		}

		res = append(res, partView)
	}

	return res, nil
}

func (p *partUsecase) FindPartUserHandler(pageNumber int64, limit int64, userUid primitive.ObjectID) ([]partViewModel, error) {
	results, err := p.partRepository.FindPartUserRepo(pageNumber, limit, userUid)

	if err != nil {
		return []partViewModel{}, err
	}

	var res []partViewModel
	var teamView []teamH.TeamViewModel
	var userView []userH.UserViewModel

	for _, result := range results {
		if len(result.Team) > 0 {
			for _, val := range result.Team {
				teamRes,_ := p.teamUsecase.FindOneTeamHandler(val)
				for _, item := range teamRes.Players {
					user,_ := p.userUsescase.FindOneUserByUid(item)
					resUser := userH.UserViewModel{
						Uid:           user.Uid.Hex(),
						FirstName:     user.FirstName,
						LastName:      user.LastName,
						Email:         user.Email,
						Username:      user.Username,
						IsBanned:      user.IsBanned,
						Avatar:        user.Avatar,
						Language:      user.Language,
						Point:         user.Point,
						Roles:         user.Roles,
						TypeConnexion: user.TypeConnexion,
						Created:       user.Created,
					}
					userView = append(userView, resUser)
				}
				resTeam := teamH.TeamViewModel{
					Uid:          teamRes.Uid.Hex(),
					Name:         teamRes.Name,
					CreationDate: teamRes.CreationDate,
					Players:      userView,
					Description:  teamRes.Description,
					IsBlocked:    teamRes.IsBlocked,
					Logo:         teamRes.Logo,
					Creator: teamRes.Creator.Username,
					Records: 0,
				}
				teamView = append(teamView, resTeam)
			}
		}
		
		var plateform []tHandler.PlateformViewModel
		for _, value := range result.Tournament.Plateform {
			arrayPl := tHandler.PlateformViewModel{
				value.Uid.Hex(),
				value.Name,
				value.Description,
			}
			plateform = append(plateform, arrayPl)
		}

		user,_ := p.userUsescase.FindOneUserByUid(result.User)

		partView := partViewModel{
			Uid:   result.Uid.Hex(),
			Date:  result.Date,
			Team:  teamView,
			IsWin: false,
			User: userH.UserViewModel{
				Uid:           user.Uid.Hex(),
				FirstName:     user.FirstName,
				LastName:      user.LastName,
				Email:         user.Email,
				Username:      user.Username,
				IsBanned:      user.IsBanned,
				Avatar:        user.Avatar,
				Language:      user.Language,
				Point:         user.Point,
				Roles:         user.Roles,
				TypeConnexion: user.TypeConnexion,
				Created:       user.Created,
			},
			Tournament: tHandler.TournamentViewModel{
				result.Tournament.Uid.Hex(),
				result.Tournament.Title,
				result.Tournament.DateStart,
				result.Tournament.Info,
				result.Tournament.Statut,
				result.Tournament.NumberParticipate,
				result.Tournament.Price,
				result.Tournament.DeadlineDate,
				result.Tournament.PriceParticipate,
				tHandler.GameViewModel{
					result.Tournament.Game.Uid.Hex(),
					result.Tournament.Game.Name,
					result.Tournament.Game.Image,
					result.Tournament.Game.Logo,
					result.Tournament.Game.Slug,
				},
				plateform,
				result.Tournament.Rules,
				result.Tournament.IsPublic,
				result.Tournament.Format,
				result.Tournament.Server,
				result.Tournament.Tchat,
				result.Tournament.Winners,
				result.Tournament.Region,
				result.Tournament.Spectateur,
				result.Tournament.Laps,
				result.Tournament.Maps,
				result.Tournament.GameWay,
				result.Tournament.IsTeam,
			},
		}

		res = append(res, partView)
	}

	return res, nil
}

func (p *partUsecase) UpdatedPartUserHandler(partUid string, userUid primitive.ObjectID) (interface{}, error) {
	objectId, err := primitive.ObjectIDFromHex(partUid)

	if err != nil {
		return nil, err
	}

	_, err = p.partRepository.UpdatedPartUserRepo(objectId)

	if err != nil {
		return nil, err
	}

	return "Ok", nil
}

func (p *partUsecase) FindPartUserLeagueHandler(userUid primitive.ObjectID, leagueUid string) (partViewModel, error) {
	objectId, err := primitive.ObjectIDFromHex(leagueUid)

	if err != nil {
		return partViewModel{}, err
	}

	result, err := p.partRepository.FindPartByLeagueRepo(userUid, objectId)

	if err != nil {
		return partViewModel{}, err
	}

	var teamView []teamH.TeamViewModel
	var userView []userH.UserViewModel

	for _, val := range result.Team {
		teamRes,_ := p.teamUsecase.FindOneTeamHandler(val)
		for _, item := range teamRes.Players {
			user,_ := p.userUsescase.FindOneUserByUid(item)
			resUser := userH.UserViewModel{
				Uid:           user.Uid.Hex(),
				FirstName:     user.FirstName,
				LastName:      user.LastName,
				Email:         user.Email,
				Username:      user.Username,
				IsBanned:      user.IsBanned,
				Avatar:        user.Avatar,
				Language:      user.Language,
				Point:         user.Point,
				Roles:         user.Roles,
				TypeConnexion: user.TypeConnexion,
				Created:       user.Created,
			}
			userView = append(userView, resUser)
		}

		resTeam := teamH.TeamViewModel{
			Uid:          teamRes.Uid.Hex(),
			Name:         teamRes.Name,
			CreationDate: teamRes.CreationDate,
			Players:      userView,
			Description:  teamRes.Description,
			IsBlocked:    teamRes.IsBlocked,
			Logo:         teamRes.Logo,
			Creator: teamRes.Creator.Username,
			
			Records: 0,
		}

		teamView = append(teamView, resTeam)
	}
	var plateform []tHandler.PlateformViewModel
	for _, value := range result.Tournament.Plateform {
		arrayPl := tHandler.PlateformViewModel{
			value.Uid.Hex(),
			value.Name,
			value.Description,
		}
		plateform = append(plateform, arrayPl)
	}
	user,_ := p.userUsescase.FindOneUserByUid(result.User)
	partViewModel := partViewModel{
		Uid:   result.Uid.Hex(),
		Date:  result.Date,
		Team:  teamView,
		IsWin: false,
		User: userH.UserViewModel{
			Uid:           user.Uid.Hex(),
			FirstName:     user.FirstName,
			LastName:      user.LastName,
			Email:         user.Email,
			Username:      user.Username,
			IsBanned:      user.IsBanned,
			Avatar:        user.Avatar,
			Language:      user.Language,
			Point:         user.Point,
			Roles:         user.Roles,
			TypeConnexion: user.TypeConnexion,
			Created:       user.Created,
		},
		Tournament: tHandler.TournamentViewModel{
			result.Tournament.Uid.Hex(),
			result.Tournament.Title,
			result.Tournament.DateStart,
			result.Tournament.Info,
			result.Tournament.Statut,
			result.Tournament.NumberParticipate,
			result.Tournament.Price,
			result.Tournament.DeadlineDate,
			result.Tournament.PriceParticipate,
			tHandler.GameViewModel{
				result.Tournament.Game.Uid.Hex(),
				result.Tournament.Game.Name,
				result.Tournament.Game.Image,
				result.Tournament.Game.Logo,
				result.Tournament.Game.Slug,
			},
			plateform,
			result.Tournament.Rules,
			result.Tournament.IsPublic,
			result.Tournament.Format,
			result.Tournament.Server,
			result.Tournament.Tchat,
			result.Tournament.Winners,
			result.Tournament.Region,
			result.Tournament.Spectateur,
			result.Tournament.Laps,
			result.Tournament.Maps,
			result.Tournament.GameWay,
			result.Tournament.IsTeam,
		},
	}

	return partViewModel, nil
}

func (p *partUsecase) FindPartUserTournamentHandler(uidUser primitive.ObjectID, tournamentUid string) (partViewModel, error) {
	objectId, err := primitive.ObjectIDFromHex(tournamentUid)

	if err != nil {
		return partViewModel{}, err
	}

	result, err := p.partRepository.FindPartByTournamentRepo(uidUser, objectId)

	if err != nil {
		return partViewModel{}, err
	}

	var teamView []teamH.TeamViewModel

	if len(result.Team) > 0 {
		var userView []userH.UserViewModel

		for _, val := range result.Team {
			teamRes,_ := p.teamUsecase.FindOneTeamHandler(val)
			for _, item := range teamRes.Players {
				user,_ := p.userUsescase.FindOneUserByUid(item)
				resUser := userH.UserViewModel{
					Uid:           user.Uid.Hex(),
					FirstName:     user.FirstName,
					LastName:      user.LastName,
					Email:         user.Email,
					Username:      user.Username,
					IsBanned:      user.IsBanned,
					Avatar:        user.Avatar,
					Language:      user.Language,
					Point:         user.Point,
					Roles:         user.Roles,
					TypeConnexion: user.TypeConnexion,
					Created:       user.Created,
				}
				userView = append(userView, resUser)
			}
			resTeam := teamH.TeamViewModel{
				Uid:          teamRes.Uid.Hex(),
				Name:         teamRes.Name,
				CreationDate: teamRes.CreationDate,
				Players:      userView,
				Description:  teamRes.Description,
				IsBlocked:    teamRes.IsBlocked,
				Logo:         teamRes.Logo,
				Creator: teamRes.Creator.Username,
				Records: 0,
			}

			teamView = append(teamView, resTeam)
		}
	}

	var plateform []tHandler.PlateformViewModel
	for _, value := range result.Tournament.Plateform {
		arrayPl := tHandler.PlateformViewModel{
			value.Uid.Hex(),
			value.Name,
			value.Description,
		}
		plateform = append(plateform, arrayPl)
	}

	user,_ := p.userUsescase.FindOneUserByUid(result.User)
	partViewModel := partViewModel{
		Uid:   result.Uid.Hex(),
		Date:  result.Date,
		Team:  teamView,
		IsWin: false,
		User: userH.UserViewModel{
			Uid:           user.Uid.Hex(),
			FirstName:     user.FirstName,
			LastName:      user.LastName,
			Email:         user.Email,
			Username:      user.Username,
			IsBanned:      user.IsBanned,
			Avatar:        user.Avatar,
			Language:      user.Language,
			Point:         user.Point,
			Roles:         user.Roles,
			TypeConnexion: user.TypeConnexion,
			Created:       user.Created,
		},
		Tournament: tHandler.TournamentViewModel{
			result.Tournament.Uid.Hex(),
			result.Tournament.Title,
			result.Tournament.DateStart,
			result.Tournament.Info,
			result.Tournament.Statut,
			result.Tournament.NumberParticipate,
			result.Tournament.Price,
			result.Tournament.DeadlineDate,
			result.Tournament.PriceParticipate,
			tHandler.GameViewModel{
				result.Tournament.Game.Uid.Hex(),
				result.Tournament.Game.Name,
				result.Tournament.Game.Image,
				result.Tournament.Game.Logo,
				result.Tournament.Game.Slug,
			},
			plateform,
			result.Tournament.Rules,
			result.Tournament.IsPublic,
			result.Tournament.Format,
			result.Tournament.Server,
			result.Tournament.Tchat,
			result.Tournament.Winners,
			result.Tournament.Region,
			result.Tournament.Spectateur,
			result.Tournament.Laps,
			result.Tournament.Maps,
			result.Tournament.GameWay,
			result.Tournament.IsTeam,
		},
	}
	
	return partViewModel, nil
}

func (p *partUsecase) RemovedPartHandler(idQuery string) (interface{}, error) {
	objectId, err := primitive.ObjectIDFromHex(idQuery)
	rec, err := p.partRepository.RemovedPartRepo(objectId)

	if err != nil {
		return 0, err
	}

	return rec, nil
}

func (p *partUsecase) UpdatedPartNumberConfirmedHandler(userPartUid string, numberConf bool) (interface{}, error) {
	objectId, err := primitive.ObjectIDFromHex(userPartUid)
	_, err = p.partRepository.UpdateNumberConfirmedRepo(objectId, numberConf)

	if err != nil {
		return 0, err
	}

	return "Ok", nil
}

func (p *partUsecase) GetNumberPartHandler(userPartUid string) (interface{}, error) {
	objectId, err := primitive.ObjectIDFromHex(userPartUid)
	rec, err := p.partRepository.GetNumberPartRepo(objectId)

	if err != nil {
		return 0, err
	}

	return rec, nil
}

func (p *partUsecase) FindPartUserWaggerHandler(userUid primitive.ObjectID, uidWagger primitive.ObjectID) (interface{}, error) {
	result, err := p.partRepository.FindPartByWaggerRepo(userUid, uidWagger)

	if err != nil {
		return partViewModel{}, err
	}

	if len(result.Team) > 0 {
		var userView []userH.UserViewModel
		
		for _, val := range result.Team {
			teamRes,_ := p.teamUsecase.FindOneTeamHandler(val)
			for _, item := range teamRes.Players {
				user,_ := p.userUsescase.FindOneUserByUid(item)
				resUser := userH.UserViewModel{
					Uid:           user.Uid.Hex(),
					FirstName:     user.FirstName,
					LastName:      user.LastName,
					Email:         user.Email,
					Username:      user.Username,
					IsBanned:      user.IsBanned,
					Avatar:        user.Avatar,
					Language:      user.Language,
					Point:         user.Point,
					Roles:         user.Roles,
					TypeConnexion: user.TypeConnexion,
					Created:       user.Created,
				}
				userView = append(userView, resUser)
			}

		}
	}

	user,_ := p.userUsescase.FindOneUserByUid(result.User)
	partViewModel := partViewModel{
		Uid:   result.Uid.Hex(),
		Date:  result.Date,
		IsWin: false,
		User: userH.UserViewModel{
			Uid:           user.Uid.Hex(),
			FirstName:     user.FirstName,
			LastName:      user.LastName,
			Email:         user.Email,
			Username:      user.Username,
			IsBanned:      user.IsBanned,
			Avatar:        user.Avatar,
			Language:      user.Language,
			Point:         user.Point,
			Roles:         user.Roles,
			TypeConnexion: user.TypeConnexion,
			Created:       user.Created,
		},
		Wagger: wHandler.WaggerViewModel{
			Uid:          result.Wagger.Uid.Hex(),
			Date:         result.Wagger.Date,
			Title:        result.Wagger.Title,
			Price:        result.Wagger.Price,
			DeadlineDate: result.Wagger.DeadlineDate,
			Statut:       result.Wagger.Statut,
		},
	}

	return partViewModel, nil
}

func (p *partUsecase) FindAllPartUserWaggerHandler(userUid primitive.ObjectID, pageNumber int64, limit int64) ([]partWaggerViewModel, error) {
	results, err := p.partRepository.FindPartUserRepo(pageNumber, limit, userUid)

	if err != nil {
		return []partWaggerViewModel{}, err
	}

	var res []partWaggerViewModel
	var userView []userH.UserViewModel

	for _, result := range results {
		user,_ := p.userUsescase.FindOneUserByUid(result.User)
		userViewmodel := userH.UserViewModel{
			Uid:           user.Uid.Hex(),
			FirstName:     user.FirstName,
			LastName:      user.LastName,
			Email:         user.Email,
			Username:      user.Username,
			IsBanned:      user.IsBanned,
			Avatar:        user.Avatar,
			Language:      user.Language,
			Point:         user.Point,
			Roles:         user.Roles,
			TypeConnexion: user.TypeConnexion,
			Created:       user.Created,
		}
		userView := append(userView, userViewmodel)
		partWagger := partWaggerViewModel{
			Uid:   result.Uid.Hex(),
			Date:  result.Date,
			User:  userView,
			IsWin: result.IsWin,
			Wagger: wHandler.WaggerViewModel{
				Uid:              result.Wagger.Uid.Hex(),
				Date:             result.Wagger.Date,
				Title:            result.Wagger.Title,
				Description:      result.Wagger.Description,
				Price:            result.Wagger.Price,
				DeadlineDate:     result.Wagger.DeadlineDate,
				GameWay:          result.Wagger.GameWay,
				PriceParticipate: result.Wagger.PriceParticipate,
				Game:             tHandler.GameViewModel{},
				Plateform:        []tHandler.PlateformViewModel{},
				Format:           result.Wagger.Format,
				IsPublic:         result.Wagger.IsPublic,
				Statut:           result.Wagger.Statut,
				Records:          0,
				Participant:      result.Wagger.Participant,
				Rules:            result.Wagger.Rules,

				Server:            result.Wagger.Server,
				TchatVocal:        result.Wagger.TchatVocal,
				Region:            result.Wagger.Region,
				Spectateur:        result.Wagger.Spectateur,
				Maps: 				result.Wagger.Maps,
			},
			NumberPartConfirmed: result.NumberPartConfirmed,
		}
		res = append(res, partWagger)
	}

	return res, nil
}

func (p *partUsecase) FindPartTournamentHandler(tournament tHandler.TournamentViewModel)([]partViewModelTournament,error) {
	objectId, err := primitive.ObjectIDFromHex(tournament.Uid)
	results, err := p.partRepository.FindAllPartByTournamentRepo(objectId)
	if err != nil {
		return []partViewModelTournament{}, err
	}

	var res []partViewModelTournament
	var viewPart partViewModelTournament
	
	if len(results) > 0 {
		var plateform []tHandler.PlateformViewModel
	
		for _, result := range results {
			for _, value := range result.Tournament.Plateform {
				arrayPl := tHandler.PlateformViewModel{
					value.Uid.Hex(),
					value.Name,
					value.Description,
				}
				plateform = append(plateform, arrayPl)
			}
			user,_ := p.userUsescase.FindOneUserByUid(result.User)
			viewPartSuccess := partViewModelTournament {
				Uid: result.Uid.Hex(),
				Date:result.Date,
				User:userH.UserViewModel{
					Uid:           user.Uid.Hex(),
					FirstName:     user.FirstName,
					LastName:      user.LastName,
					Email:         user.Email,
					Username:      user.Username,
					IsBanned:      user.IsBanned,
					Avatar:        user.Avatar,
					Language:      user.Language,
					Point:         user.Point,
					Roles:         user.Roles,
					TypeConnexion: user.TypeConnexion,
					Created:       user.Created,
				},
				IsWin:result.IsWin,
				NumberPartConfirmed:result.NumberPartConfirmed,
				Tournament: tournament,
			}
	
			res = append(res, viewPartSuccess)
		}
	} else {
		viewPart.Uid = ""
		viewPart.Date = ""
		viewPart.User = userH.UserViewModel{}
		viewPart.IsWin = false
		viewPart.NumberPartConfirmed = false
		viewPart.Tournament = tournament
		res = append(res, viewPart)
	}
	
	return res, nil
}

func (p *partUsecase) LeavePartTournamentHandler(partUid string,userUId string)(interface{}, error) {
	user,err := p.userUsescase.FindOneUserByUid(userUId)
	part,err := p.FindPartHandler(partUid)

	if err != nil {
		return 0, err
	}

	var plateform string

	for key,item := range part.Tournament.Plateform {
		if key > 0 {
			plateform = fmt.Sprintf("%s%s",item.Name,"-")
		} else {
			plateform = fmt.Sprintf("%s",item.Name)
		}
	}

	message := fmt.Sprintf("%s%s%s%s%s","Ta demande de quitter au tournoi",plateform,"-",part.Tournament.Game.Name,"a bien été effectué avec succes")

	mailer := external.ToMailer{
		Email: user.Email,
		Firstname: user.FirstName,
		Lastname: user.LastName,
		Subject: "Confirmation de quitter au tournoi",
		Message: message,
	}

	mailer.InitialeMailjet()
	objectId, err := primitive.ObjectIDFromHex(partUid)
	rec, err := p.partRepository.RemovedPartRepo(objectId)

	if err != nil {
		return 0, err
	}

	return rec, nil
}