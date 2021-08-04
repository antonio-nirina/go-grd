package delivery

import (
	"strings"

	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/external"
	"github.com/thoussei/antonio/api/team/entity"
	"github.com/thoussei/antonio/api/team/handler"
	userEntity "github.com/thoussei/antonio/api/user/entity"
	userHandler "github.com/thoussei/antonio/api/user/handler"
	"go.mongodb.org/mongo-driver/bson/primitive"
)


type TeamResolver interface {
	SavedTeamResolver(params graphql.ResolveParams) (interface{}, error)
	FindTeamResolver(params graphql.ResolveParams) (interface{}, error)
	FindAllTeamResolver(params graphql.ResolveParams) (interface{}, error)
	UpdatedTeamByBannedResolver(params graphql.ResolveParams) (interface{}, error)
}

type team struct {
	teamHandler handler.UsecaseTeam
	teamUserHandler userHandler.Usecase
}

func NewResolverTeam(teamUseCase handler.UsecaseTeam,userTeam userHandler.Usecase) TeamResolver {
	return &team{
		teamHandler: teamUseCase,
		teamUserHandler:userTeam,
	}
}

func (t *team) SavedTeamResolver(params graphql.ResolveParams) (interface{}, error){
	var users [] userEntity.User 
	name, _ := params.Args["name"].(string)
	creationDate, _ := params.Args["creationDate"].(string)
	players, _ := params.Args["players"].(string)
	logo, _ := params.Args["logo"].(string)
	logoType, _ := params.Args["logoType"].(string)
	creator, _ := params.Args["creator"].(string)
	user,err := t.teamUserHandler.FindOneUserByUid(creator)
	
	if err != nil {
		return nil, err
	}

	arrays := strings.SplitAfter(players,"-")
	
	for _,val := range arrays {
		player,err := t.teamUserHandler.FindOneUserByUid(val)
	
		if err != nil {
			return nil, err
		}
		users = append(users, player)
	}
	upl := &external.FileUpload{}
	url,err := upl.HandleFileInBBApi(logo,logoType)
	
	if err != nil {
		return nil, err
	}

	team := &entity.Team{
		Uid: primitive.NewObjectID(),
		Name:name,
		CreationDate:creationDate,
		Players:users,
		Description:"",
		IsBlocked:false,
		Logo:url,
		Creator:user,   			
	}

	res,err := t.teamHandler.SavedTeamHandler(team)

	if err != nil {
		return nil, err
	}

	return res,nil
}

func (t *team) FindTeamResolver(params graphql.ResolveParams) (interface{}, error){
	idHome, _ := params.Args["uid"].(string)
	home,err := t.teamHandler.FindTeamHandler(idHome)

	if err != nil {
		return nil,err
	}

	return home,nil
}

func (t *team) FindAllTeamResolver(params graphql.ResolveParams) (interface{}, error){
	homes,err :=  t.teamHandler.FindAllTeamHandler()

	if err != nil {
		return nil,err
	}

	return homes,nil
}

func (t *team) UpdatedTeamByBannedResolver(params graphql.ResolveParams) (interface{}, error){
	uid, _ := params.Args["uid"].(string)
	objectId, err := primitive.ObjectIDFromHex(uid)
	team,err :=  t.teamHandler.FindTeamHandler(uid)

	if err != nil {
		return nil,err
	}

	newTeam := &entity.Team{
		Uid:objectId,
		Name:team.Name,
		CreationDate:team.CreationDate,
		Players: team.Players,
		Description:team.Description,
		IsBlocked:true,
		Logo:team.Logo,
		Creator:team.Creator,   	     			
	}
	 

	_,err = t.teamHandler.UpdatedTeamHandler(newTeam)

	return team,nil
}