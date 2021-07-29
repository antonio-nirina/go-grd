package handler

import (
	"github.com/thoussei/antonio/api/participate/entity"
	"github.com/thoussei/antonio/api/participate/repository"
	tHandler "github.com/thoussei/antonio/api/tournament/handler"
	userH "github.com/thoussei/antonio/api/user/handler"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UsecasePart interface {
	SavedPartHandler(*entity.Participate) (interface{}, error)
	FindPartHandler(idQuery string) (partViewModel, error)
	FindAllPartHandler(pageNumber int64,limit int64) ([]partViewModel, error)
	FindPartUserHandler(pageNumber int64,limit int64,userUid primitive.ObjectID) ([]partViewModel, error)
	UpdatedPartUserHandler(partUid string, userUid primitive.ObjectID) (interface{}, error)
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

	
	partViewModel := partViewModel{
		Uid: result.Uid.Hex(),
		Date:result.Date,
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

	for _,result := range results {
		partView := partViewModel{
			Uid: result.Uid.Hex(),
			Date:result.Date,
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

	for _,result := range results {
		partView := partViewModel{
			Uid: result.Uid.Hex(),
			Date:result.Date,
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