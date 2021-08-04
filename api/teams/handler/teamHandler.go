package handler

import (
	"github.com/thoussei/antonio/api/team/entity"
	"github.com/thoussei/antonio/api/team/repository"
	userHandler "github.com/thoussei/antonio/api/user/handler"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UsecaseTeam interface {
	SavedTeamHandler(team *entity.Team) (interface{}, error)
	FindTeamHandler(idQuery string) (TeamViewModel, error)
	FindAllTeamHandler() ([]TeamViewModel, error)
	UpdatedTeamHandler(team *entity.Team) (interface{}, error)
}

type TeamViewModel struct {
	Uid           			string 						`json:"uid"`
	Name 		  			string 						`json:"name"`
	CreationDate 		  	string            			`json:"creationDate"`
	Players 	 	  		[]userHandler.UserViewModel `json:"players"`
	Description 		  	string            			`json:"description"`
	IsBlocked 		  		bool 						`json:"isBlocked"`
	Logo   					string            			`json:"logo"`
	Creator   				userHandler.UserViewModel    `json:"creator"`
}

type teamUsecase struct {
	teamRepository repository.RepositoryHome
}

func NewUsecaseTeam(t repository.RepositoryTeam) UsecaseTeam {
	return &teamUsecase{
		teamRepository: t,
	}
}

func (t *teamUsecase) SavedTeamHandler(team *entity.Team) (interface{}, error) {
	_,err := t.teamRepository.SavedRepoTeamHandler(team)

	if err != nil {
		return 0, err
	}

	return "Ok",nil
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

	teamViewModel := TeamViewModel{
		Uid:result.Uid.Hex(),
		Name:result.Name,
		CreationDate:result.CreationDate,
		Players: result.Players,
		Description:result.Description,
		IsBlocked:result.IsBlocked,
		Logo:result.Logo,
		Creator:result.Creator,      			
	}

	return teamViewModel,nil
}

func (t *teamUsecase) FindAllTeamHandler() ([]TeamViewModel, error) {
	result, err := t.teamRepository.FindAllTeamRepo()

	if err != nil {
		return []TeamViewModel{}, err
	}

	var res []TeamViewModel

	for _,val := range result {
		teamViewModel := TeamViewModel{
			Uid:val.Uid.Hex(),
			Name:val.Name,
			CreationDate:val.CreationDate,
			Players: val.Players,
			Description:val.Description,
			IsBlocked:val.IsBlocked,
			Logo:val.Logo,
			Creator:val.Creator,   		
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