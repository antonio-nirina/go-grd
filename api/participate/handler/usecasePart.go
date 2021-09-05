package handler

import (
	"github.com/thoussei/antonio/api/participate/entity"
	"github.com/thoussei/antonio/api/participate/repository"
	tHandler "github.com/thoussei/antonio/api/tournament/handler"
	userH "github.com/thoussei/antonio/api/user/handler"
	teamH "github.com/thoussei/antonio/api/teams/handler"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UsecasePart interface {
	SavedPartHandler(*entity.Participate) (interface{}, error)
	FindPartHandler(idQuery string) (partViewModel, error)
	FindAllPartHandler(pageNumber int64,limit int64) ([]partViewModel, error)
	FindPartUserHandler(pageNumber int64,limit int64,userUid primitive.ObjectID) ([]partViewModel, error)
	UpdatedPartUserHandler(partUid string, userUid primitive.ObjectID) (interface{}, error)
	FindPartUserLeagueHandler(uidUser primitive.ObjectID,leagueUid string) (partViewModel, error)
	FindPartUserTournamentHandler(uidUser primitive.ObjectID,tournamentUid string,isTeam bool) (partViewModel, error)
	RemovedPartHandler(idQuery string) (interface{}, error)
}
type partUsecase struct {
	partRepository repository.RepositoryPart
}

func NewUsecasePart(r repository.RepositoryPart) UsecasePart {
	return &partUsecase{
		partRepository: r,
	}
}

func (p *partUsecase) SavedPartHandler(part *entity.Participate) (interface{}, error){
	_,err := p.partRepository.SavedPartRepo(part)

	if err != nil {
		return 0, err
	}

	return "Ok",nil
}

func (p *partUsecase) FindPartHandler(idQuery string) (partViewModel, error){
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

	for _,val := range result.Team {
		for _,item := range val.Players {
			resUser := userH.UserViewModel{
				Uid:item.Uid.Hex(),
				FirstName:item.FirstName,
				LastName:item.LastName,
				Email:item.Email,
				Username:item.Username,
				IsBanned:item.IsBanned,
				Avatar:item.Avatar,
				Language:item.Language,
				Point:item.Point,
				Roles:item.Roles,
				TypeConnexion:item.TypeConnexion,
				Created:item.Created,
			}
			userView = append(userView,resUser)
		}
		resTeam := teamH.TeamViewModel{
			Uid:val.Uid.Hex(),
			Name:val.Name,
			CreationDate:val.CreationDate,
			Players:userView,
			Description:val.Description,
			IsBlocked:val.IsBlocked,
			Logo:val.Logo,
			Creator:userH.UserViewModel{
				Uid:val.Creator.Uid.Hex(),
				FirstName:val.Creator.FirstName,
				LastName:val.Creator.LastName,
				Email:val.Creator.Email,
				Username:val.Creator.Username,
				IsBanned:val.Creator.IsBanned,
				Avatar:val.Creator.Avatar,
				Language:val.Creator.Language,
				Point:val.Creator.Point,
				Roles:val.Creator.Roles,
				TypeConnexion:val.Creator.TypeConnexion,
				Created:val.Creator.Created,
			},
			Records:0,
		}

		teamView = append(teamView,resTeam)
	}
	
	
	partViewModel := partViewModel{
		Uid: result.Uid.Hex(),
		Date:result.Date,
		Team:teamView,
		User:userH.UserViewModel{
			Uid:result.User.Uid.Hex(),
			FirstName:result.User.FirstName,
			LastName:result.User.LastName,
			Email:result.User.Email,
			Username:result.User.Username,
			IsBanned:result.User.IsBanned,
			Avatar:result.User.Avatar,
			Language:result.User.Language     ,
			Point:result.User.Point,         
			Roles:result.User.Roles      	 ,
			TypeConnexion:result.User.TypeConnexion   ,
			Created:result.User.Created, 		
		},
		Tournament:tHandler.TournamentViewModel{
			result.Tournament.Uid.Hex(),
			result.Tournament.Title,
			result.Tournament.Date,
			result.Tournament.Info,
			result.Tournament.Statut,
			result.Tournament.NumberParticipate,
			result.Tournament.NumberTeam,
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
			tHandler.PlateformViewModel{
				result.Tournament.Plateform.Uid.Hex(),
				result.Tournament.Plateform.Description,
				result.Tournament.Plateform.Name,
			},
			result.Tournament.Rules,
			result.Tournament.IsPublic,
		},
	}

	return partViewModel,nil
}

func (p *partUsecase) FindAllPartHandler(pageNumber int64,limit int64) ([]partViewModel, error){
	results, err := p.partRepository.FindAllPartRepo(pageNumber,limit)

	if err != nil {
		return []partViewModel{}, err
	}

	var res []partViewModel
	var teamView []teamH.TeamViewModel
	var userView []userH.UserViewModel

	for _,result := range results {
		for _,val := range result.Team {
			for _,item := range val.Players {
				resUser := userH.UserViewModel{
					Uid:item.Uid.Hex(),
					FirstName:item.FirstName,
					LastName:item.LastName,
					Email:item.Email,
					Username:item.Username,
					IsBanned:item.IsBanned,
					Avatar:item.Avatar,
					Language:item.Language,
					Point:item.Point,
					Roles:item.Roles,
					TypeConnexion:item.TypeConnexion,
					Created:item.Created,
				}
				userView = append(userView,resUser)
			}
			resTeam := teamH.TeamViewModel{
				Uid:val.Uid.Hex(),
				Name:val.Name,
				CreationDate:val.CreationDate,
				Players:userView,
				Description:val.Description,
				IsBlocked:val.IsBlocked,
				Logo:val.Logo,
				Creator:userH.UserViewModel{
					Uid:val.Creator.Uid.Hex(),
					FirstName:val.Creator.FirstName,
					LastName:val.Creator.LastName,
					Email:val.Creator.Email,
					Username:val.Creator.Username,
					IsBanned:val.Creator.IsBanned,
					Avatar:val.Creator.Avatar,
					Language:val.Creator.Language,
					Point:val.Creator.Point,
					Roles:val.Creator.Roles,
					TypeConnexion:val.Creator.TypeConnexion,
					Created:val.Creator.Created,
				},
				Records:0,
			}
			teamView = append(teamView,resTeam)
		}
		
		partView := partViewModel{
			Uid: result.Uid.Hex(),
			Date:result.Date,
			Team:teamView,
			User:userH.UserViewModel{
				Uid:result.User.Uid.Hex(),
				FirstName:result.User.FirstName,
				LastName:result.User.LastName,
				Email:result.User.Email,
				Username:result.User.Username,
				IsBanned:result.User.IsBanned,
				Avatar:result.User.Avatar,
				Language:result.User.Language     ,
				Point:result.User.Point,         
				Roles:result.User.Roles      	 ,
				TypeConnexion:result.User.TypeConnexion   ,
				Created:result.User.Created, 		
			},
			Tournament:tHandler.TournamentViewModel{
				result.Tournament.Uid.Hex(),
				result.Tournament.Title,
				result.Tournament.Date,
				result.Tournament.Info,
				result.Tournament.Statut,
				result.Tournament.NumberParticipate,
				result.Tournament.NumberTeam,
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
				tHandler.PlateformViewModel{
					result.Tournament.Plateform.Uid.Hex(),
					result.Tournament.Plateform.Description,
					result.Tournament.Plateform.Name,
				},
				result.Tournament.Rules,
				result.Tournament.IsPublic,
			},		
		}

		res = append(res, partView)
	}
	
	return res,nil
}

func (p *partUsecase) FindPartUserHandler(pageNumber int64,limit int64,userUid primitive.ObjectID) ([]partViewModel, error){
	results, err := p.partRepository.FindPartUserRepo(pageNumber,limit,userUid)

	if err != nil {
		return []partViewModel{}, err
	}

	var res []partViewModel
	var teamView []teamH.TeamViewModel
	var userView []userH.UserViewModel

	for _,result := range results {
		for _,val := range result.Team {
			for _,item := range val.Players {
				resUser := userH.UserViewModel{
					Uid:item.Uid.Hex(),
					FirstName:item.FirstName,
					LastName:item.LastName,
					Email:item.Email,
					Username:item.Username,
					IsBanned:item.IsBanned,
					Avatar:item.Avatar,
					Language:item.Language,
					Point:item.Point,
					Roles:item.Roles,
					TypeConnexion:item.TypeConnexion,
					Created:item.Created,
				}
				userView = append(userView,resUser)
			}
			resTeam := teamH.TeamViewModel{
				Uid:val.Uid.Hex(),
				Name:val.Name,
				CreationDate:val.CreationDate,
				Players:userView,
				Description:val.Description,
				IsBlocked:val.IsBlocked,
				Logo:val.Logo,
				Creator:userH.UserViewModel{
					Uid:val.Creator.Uid.Hex(),
					FirstName:val.Creator.FirstName,
					LastName:val.Creator.LastName,
					Email:val.Creator.Email,
					Username:val.Creator.Username,
					IsBanned:val.Creator.IsBanned,
					Avatar:val.Creator.Avatar,
					Language:val.Creator.Language,
					Point:val.Creator.Point,
					Roles:val.Creator.Roles,
					TypeConnexion:val.Creator.TypeConnexion,
					Created:val.Creator.Created,
				},
				Records:0,
			}
			teamView = append(teamView,resTeam)
		}
		
		partView := partViewModel{
			Uid: result.Uid.Hex(),
			Date:result.Date,
			Team:teamView,
			User:userH.UserViewModel{
				Uid:result.User.Uid.Hex(),
				FirstName:result.User.FirstName,
				LastName:result.User.LastName,
				Email:result.User.Email,
				Username:result.User.Username,
				IsBanned:result.User.IsBanned,
				Avatar:result.User.Avatar,
				Language:result.User.Language     ,
				Point:result.User.Point,         
				Roles:result.User.Roles      	 ,
				TypeConnexion:result.User.TypeConnexion   ,
				Created:result.User.Created, 		
			},
			Tournament:tHandler.TournamentViewModel{
				result.Tournament.Uid.Hex(),
				result.Tournament.Title,
				result.Tournament.Date,
				result.Tournament.Info,
				result.Tournament.Statut,
				result.Tournament.NumberParticipate,
				result.Tournament.NumberTeam,
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
				tHandler.PlateformViewModel{
					result.Tournament.Plateform.Uid.Hex(),
					result.Tournament.Plateform.Description,
					result.Tournament.Plateform.Name,
				},
				result.Tournament.Rules,
				result.Tournament.IsPublic,
			},		
		}

		res = append(res, partView)
	}
	
	return res,nil
}

func (p *partUsecase) UpdatedPartUserHandler(partUid string, userUid primitive.ObjectID) (interface{}, error) {
	objectId, err := primitive.ObjectIDFromHex(partUid)

	if err != nil {
		return nil, err
	}
	 
	_,err = p.partRepository.UpdatedPartUserRepo(objectId)
	
	if err != nil {
		return nil, err
	}

	return "Ok",nil
}

func (p *partUsecase) FindPartUserLeagueHandler(userUid primitive.ObjectID,leagueUid string) (partViewModel, error){
	objectId, err := primitive.ObjectIDFromHex(leagueUid)
	
	if err != nil {
		return partViewModel{}, err
	}

	result, err := p.partRepository.FindPartByLeagueRepo(userUid,objectId)
<<<<<<< HEAD

=======
>>>>>>> 52ae50743f4a11b2e9604555c22bcd0fd55a4e6c
	if err != nil {
		return partViewModel{}, err
	}

	var teamView []teamH.TeamViewModel
	var userView []userH.UserViewModel

	for _,val := range result.Team {
		for _,item := range val.Players {
			resUser := userH.UserViewModel{
				Uid:item.Uid.Hex(),
				FirstName:item.FirstName,
				LastName:item.LastName,
				Email:item.Email,
				Username:item.Username,
				IsBanned:item.IsBanned,
				Avatar:item.Avatar,
				Language:item.Language,
				Point:item.Point,
				Roles:item.Roles,
				TypeConnexion:item.TypeConnexion,
				Created:item.Created,
			}
			userView = append(userView,resUser)
		}
		resTeam := teamH.TeamViewModel{
			Uid:val.Uid.Hex(),
			Name:val.Name,
			CreationDate:val.CreationDate,
			Players:userView,
			Description:val.Description,
			IsBlocked:val.IsBlocked,
			Logo:val.Logo,
			Creator:userH.UserViewModel{
				Uid:val.Creator.Uid.Hex(),
				FirstName:val.Creator.FirstName,
				LastName:val.Creator.LastName,
				Email:val.Creator.Email,
				Username:val.Creator.Username,
				IsBanned:val.Creator.IsBanned,
				Avatar:val.Creator.Avatar,
				Language:val.Creator.Language,
				Point:val.Creator.Point,
				Roles:val.Creator.Roles,
				TypeConnexion:val.Creator.TypeConnexion,
				Created:val.Creator.Created,
			},
			Records:0,
		}

		teamView = append(teamView,resTeam)
	}
	
	
	partViewModel := partViewModel{
		Uid: result.Uid.Hex(),
		Date:result.Date,
		Team:teamView,
		User:userH.UserViewModel{
			Uid:result.User.Uid.Hex(),
			FirstName:result.User.FirstName,
			LastName:result.User.LastName,
			Email:result.User.Email,
			Username:result.User.Username,
			IsBanned:result.User.IsBanned,
			Avatar:result.User.Avatar,
			Language:result.User.Language     ,
			Point:result.User.Point,         
			Roles:result.User.Roles      	 ,
			TypeConnexion:result.User.TypeConnexion   ,
			Created:result.User.Created, 		
		},
		Tournament:tHandler.TournamentViewModel{
			result.Tournament.Uid.Hex(),
			result.Tournament.Title,
			result.Tournament.Date,
			result.Tournament.Info,
			result.Tournament.Statut,
			result.Tournament.NumberParticipate,
			result.Tournament.NumberTeam,
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
			tHandler.PlateformViewModel{
				result.Tournament.Plateform.Uid.Hex(),
				result.Tournament.Plateform.Description,
				result.Tournament.Plateform.Name,
			},
			result.Tournament.Rules,
			result.Tournament.IsPublic,
		},
	}

	return partViewModel,nil
}

func (p *partUsecase) FindPartUserTournamentHandler(uidUser primitive.ObjectID,tournamentUid string,isTeam bool) (partViewModel, error){
	objectId, err := primitive.ObjectIDFromHex(tournamentUid)

	if err != nil {
		return partViewModel{}, err
	}

	result, err := p.partRepository.FindPartByTournamentRepo(uidUser,objectId,isTeam)

	if err != nil {
		return partViewModel{}, err
	}

	var teamView []teamH.TeamViewModel
	
	if len(result.Team) > 0 {
		var userView []userH.UserViewModel

		for _,val := range result.Team {
			for _,item := range val.Players {
				resUser := userH.UserViewModel{
					Uid:item.Uid.Hex(),
					FirstName:item.FirstName,
					LastName:item.LastName,
					Email:item.Email,
					Username:item.Username,
					IsBanned:item.IsBanned,
					Avatar:item.Avatar,
					Language:item.Language,
					Point:item.Point,
					Roles:item.Roles,
					TypeConnexion:item.TypeConnexion,
					Created:item.Created,
				}
				userView = append(userView,resUser)
			}
			resTeam := teamH.TeamViewModel{
				Uid:val.Uid.Hex(),
				Name:val.Name,
				CreationDate:val.CreationDate,
				Players:userView,
				Description:val.Description,
				IsBlocked:val.IsBlocked,
				Logo:val.Logo,
				Creator:userH.UserViewModel{
					Uid:val.Creator.Uid.Hex(),
					FirstName:val.Creator.FirstName,
					LastName:val.Creator.LastName,
					Email:val.Creator.Email,
					Username:val.Creator.Username,
					IsBanned:val.Creator.IsBanned,
					Avatar:val.Creator.Avatar,
					Language:val.Creator.Language,
					Point:val.Creator.Point,
					Roles:val.Creator.Roles,
					TypeConnexion:val.Creator.TypeConnexion,
					Created:val.Creator.Created,
				},
				Records:0,
			}

			teamView = append(teamView,resTeam)
		}
	}

	partViewModel := partViewModel{
		Uid: result.Uid.Hex(),
		Date:result.Date,
		Team:teamView,
		User:userH.UserViewModel{
			Uid:result.User.Uid.Hex(),
			FirstName:result.User.FirstName,
			LastName:result.User.LastName,
			Email:result.User.Email,
			Username:result.User.Username,
			IsBanned:result.User.IsBanned,
			Avatar:result.User.Avatar,
			Language:result.User.Language,
			Point:result.User.Point,         
			Roles:result.User.Roles,
			TypeConnexion:result.User.TypeConnexion,
			Created:result.User.Created, 		
		},
		Tournament:tHandler.TournamentViewModel{
			result.Tournament.Uid.Hex(),
			result.Tournament.Title,
			result.Tournament.Date,
			result.Tournament.Info,
			result.Tournament.Statut,
			result.Tournament.NumberParticipate,
			result.Tournament.NumberTeam,
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
			tHandler.PlateformViewModel{
				result.Tournament.Plateform.Uid.Hex(),
				result.Tournament.Plateform.Description,
				result.Tournament.Plateform.Name,
			},
			result.Tournament.Rules,
			result.Tournament.IsPublic,
		},
	}

	return partViewModel,nil
}

func (p *partUsecase) RemovedPartHandler(idQuery string) (interface{}, error){
	objectId, err := primitive.ObjectIDFromHex(idQuery)
	_,err = p.partRepository.RemovedPartRepo(objectId)

	if err != nil {
		return 0, err
	}

	return "Ok",nil
}