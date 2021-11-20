package handler

import (
	"github.com/thoussei/antonio/api/teams/entity"
	"github.com/thoussei/antonio/api/teams/repository"
	userHandler "github.com/thoussei/antonio/api/user/handler"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UsecaseTeam interface {
	SavedTeamHandler(team *entity.Team) (TeamViewModel, error)
	FindTeamHandler(idQuery string) (TeamViewModel, error)
	FindOneTeamHandler(idQuery string) (entity.Team, error)
	FindAllTeamHandler(pageNumber int64,limit int64) ([]TeamViewModel, error)
	UpdatedTeamHandler(team *entity.Team) (interface{}, error)
	FindTeamByUserHandler(idQuery string) ([]TeamViewModel, error)
	UpdatedAllTeamHandler(team *entity.Team) (interface{}, error)
}

type TeamViewModel struct {
	Uid           			string 						`json:"uid"`
	Name 		  			string 						`json:"name"`
	CreationDate 		  	string            			`json:"creationDate"`
	Players 	 	  		[]userHandler.UserViewModel `json:"players"`
	Description 		  	string            			`json:"description"`
	IsBlocked 		  		bool 						`json:"isBlocked"`
	Logo   					string            			`json:"logo"`
	Tag   					string            			`json:"tag"`
	Banniere   					string            	`json:"banniere"`
	Creator   				string `json:"creator"` //userHandler.UserViewModel    `json:"creator"`
	Records   					int            			`json:"records"`
}

type teamUsecase struct {
	teamRepository repository.RepositoryTeam
}

func NewUsecaseTeam(t repository.RepositoryTeam) UsecaseTeam {
	return &teamUsecase{
		teamRepository: t,
	}
}

func (t *teamUsecase) SavedTeamHandler(team *entity.Team) (TeamViewModel, error) {
	_,err := t.teamRepository.SavedRepoTeam(team)

	if err != nil {
		return TeamViewModel{}, err
	}

	user := userHandler.UserViewModel{
		Uid:team.Creator.Uid.Hex(),
		FirstName:team.Creator.FirstName,
		LastName:team.Creator.LastName,
		Email:team.Creator.Email,
		Username:team.Creator.Username,
		IsBanned:team.Creator.IsBanned,
		Avatar:team.Creator.Avatar,
		Language:team.Creator.Language,
		Point:team.Creator.Point,
		Roles:team.Creator.Roles,
		TypeConnexion:team.Creator.TypeConnexion,
		Created:team.Creator.Created,
	}
	var players []userHandler.UserViewModel
	players = append(players,user)
	
	teamViewModel := TeamViewModel{
		Uid:team.Uid.Hex(),
		Name:team.Name,
		CreationDate:team.CreationDate,
		Players: players,
		Description:team.Description,
		IsBlocked:team.IsBlocked,
		Logo:team.Logo,
		Creator:user.Username,
		Banniere: team.Banniere,
		Tag: team.Tag,      			
	}

	return teamViewModel,nil
}

func (t *teamUsecase) FindTeamHandler(idQuery string) (TeamViewModel, error) {
	objectId, err := primitive.ObjectIDFromHex(idQuery)
	
	if err != nil {
		return TeamViewModel{}, err
	}

	result, err := t.teamRepository.FindTeamRepo(objectId)

	if err != nil {
		return TeamViewModel{}, err
	}

	user := userHandler.UserViewModel{
		Uid:result.Uid.Hex(),
		FirstName:result.Creator.FirstName,
		LastName:result.Creator.LastName,
		Email:result.Creator.Email,
		Username:result.Creator.Username,
		IsBanned:result.Creator.IsBanned,
		Avatar:result.Creator.Avatar,
		Language:result.Creator.Language,
		Point:result.Creator.Point,
		Roles:result.Creator.Roles,
		TypeConnexion:result.Creator.TypeConnexion,
		Created:result.Creator.Created,
	}

	var players []userHandler.UserViewModel

	for _,val := range result.Players{
		pls := userHandler.UserViewModel{
			Uid:val.Uid.Hex(),
			FirstName:val.FirstName,
			LastName:val.LastName,
			Email:val.Email,
			Username:val.Username,
			IsBanned:val.IsBanned,
			Avatar:val.Avatar,
			Language:val.Language,
			Point:val.Point,
			Roles:val.Roles,
			TypeConnexion:val.TypeConnexion,
			Created:val.Created,
		}

		players = append(players,pls)
	}

	teamViewModel := TeamViewModel{
		Uid:result.Uid.Hex(),
		Name:result.Name,
		CreationDate:result.CreationDate,
		Players: players,
		Description:result.Description,
		IsBlocked:result.IsBlocked,
		Logo:result.Logo,
		Creator:user.Username,
		Tag: result.Tag,   
		Banniere: result.Banniere,   			
	}

	return teamViewModel,nil
}

func (t *teamUsecase) FindOneTeamHandler(idQuery string) (entity.Team, error){
	objectId, err := primitive.ObjectIDFromHex(idQuery)
	
	if err != nil {
		return entity.Team{}, err
	}

	result, err := t.teamRepository.FindTeamRepo(objectId)

	if err != nil {
		return entity.Team{}, err
	}

	return result,nil

}

func (t *teamUsecase) FindAllTeamHandler(pageNumber int64,limit int64) ([]TeamViewModel, error) {
	result, err := t.teamRepository.FindAllTeamRepo(pageNumber,limit)

	if err != nil {
		return []TeamViewModel{}, err
	}

	records,err := t.teamRepository.CountTeamRepository()

	if err != nil {
		return []TeamViewModel{}, err
	}

	var res []TeamViewModel
	var players []userHandler.UserViewModel

	for _,val := range result {
		for _,value := range val.Players{
			pls := userHandler.UserViewModel{
				Uid:value.Uid.Hex(),
				FirstName:value.FirstName,
				LastName:value.LastName,
				Email:value.Email,
				Username:value.Username,
				IsBanned:value.IsBanned,
				Avatar:value.Avatar,
				Language:value.Language,
				Point:value.Point,
				Roles:value.Roles,
				TypeConnexion:value.TypeConnexion,
				Created:value.Created,
			}

			players = append(players,pls)
		}

		user := userHandler.UserViewModel{
			Uid:val.Uid.Hex(),
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
		}

		teamViewModel := TeamViewModel{
			Uid:val.Uid.Hex(),
			Name:val.Name,
			CreationDate:val.CreationDate,
			Players: players,
			Description:val.Description,
			IsBlocked:val.IsBlocked,
			Logo:val.Logo,
			Creator:user.Username,
			Records:records,
			Tag: val.Tag,  
			Banniere: val.Banniere, 		
		}

		res = append(res, teamViewModel)
	}
	
	return res,nil
}

func (t *teamUsecase) UpdatedTeamHandler(team *entity.Team) (interface{}, error) {
	
	_,err := t.teamRepository.UpdatedRepoTeam(team)
	
	if err != nil {
		return nil, err
	}

	return "Ok",nil
}

func (t *teamUsecase) CountTeamHandler()(int) {
	records,err := t.teamRepository.CountTeamRepository()

	if err != nil {
		return 0
	}
	
	return records
}

func (t *teamUsecase) FindTeamByUserHandler(idQuery string) ([]TeamViewModel, error) {
	objectId, err := primitive.ObjectIDFromHex(idQuery)
	
	if err != nil {
		return []TeamViewModel{}, err
	}

	result, err := t.teamRepository.FindTeamByUserRepo(objectId)

	if err != nil {
		return []TeamViewModel{}, err
	}

	var res []TeamViewModel
	var players []userHandler.UserViewModel

	for _,val := range result {
		for _,value := range val.Players{
			pls := userHandler.UserViewModel{
				Uid:value.Uid.Hex(),
				FirstName:value.FirstName,
				LastName:value.LastName,
				Email:value.Email,
				Username:value.Username,
				IsBanned:value.IsBanned,
				Avatar:value.Avatar,
				Language:value.Language,
				Point:value.Point,
				Roles:value.Roles,
				TypeConnexion:value.TypeConnexion,
				Created:value.Created,
			}

			players = append(players,pls)
		}

		user := userHandler.UserViewModel{
			Uid:val.Uid.Hex(),
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
		}

		teamViewModel := TeamViewModel{
			Uid:val.Uid.Hex(),
			Name:val.Name,
			CreationDate:val.CreationDate,
			Players: players,
			Description:val.Description,
			IsBlocked:val.IsBlocked,
			Logo:val.Logo,
			Creator:user.Username,
			Records:0, 
			Tag: val.Tag,
			Banniere: val.Banniere,   		
		}

		res = append(res, teamViewModel)
	}
	
	return res,nil
}

func (t *teamUsecase) UpdatedAllTeamHandler(team *entity.Team) (interface{}, error) {
	_,err := t.teamRepository.UpdatedRepoTeam(team)
	
	if err != nil {
		return nil, err
	}

	return "Ok",nil
}