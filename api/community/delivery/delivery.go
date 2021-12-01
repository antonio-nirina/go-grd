package delivery

import (
	"encoding/json"

	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/community/entity"
	"github.com/thoussei/antonio/api/community/handler"
	"github.com/thoussei/antonio/api/external"
	gameHandler "github.com/thoussei/antonio/api/games/handler"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type inputAdCmty struct {
	Streaming []entity.DataStreaming `json:"streaming"`
}

type CmtyResolve interface {
	CreatePublicationResolve(params graphql.ResolveParams) (interface{}, error)
	FindCmtyResolver(params graphql.ResolveParams) (interface{}, error)
	FindAllCmtytResolver(params graphql.ResolveParams) (interface{}, error)
	FindAllGameTwitchResolver(params graphql.ResolveParams) (interface{}, error)
	FindAllStreamingTwitchResolver(params graphql.ResolveParams) (interface{}, error)

	EditStatutPublicationResolve(params graphql.ResolveParams) (interface{}, error)
	RemovePublicationResolve(params graphql.ResolveParams) (interface{}, error)
}

type cmty struct {
	cmtyHandler     handler.UsecaseCmty
	cmtyGameHandler gameHandler.UsecaseGameInterface
}

func NewResolverCmty(cmtyUseCase handler.UsecaseCmty, cmtyGame gameHandler.UsecaseGameInterface) CmtyResolve {
	return &cmty{
		cmtyHandler:     cmtyUseCase,
		cmtyGameHandler: cmtyGame,
	}
}

func (c *cmty) CreatePublicationResolve(params graphql.ResolveParams) (interface{}, error) {
	var streams []entity.DataStreaming
	jsonString, _ := json.Marshal(params.Args)
	inputs := inputAdCmty{}
	json.Unmarshal([]byte(jsonString), &inputs)
	for _, val := range inputs.Streaming {
		streams = append(streams, val)
	}
	uidGame, _ := params.Args["uidGame"].(string)
	game, err := c.cmtyHandler.FindOneGamesTwitch(uidGame)

	if err != nil {
		return nil, err
	}

	cmty := &entity.Communauty{
		Uid:       primitive.NewObjectID(),
		Streaming: streams,
		Game:      game,
		Statut:    false,
	}

	res, err := c.cmtyHandler.CreatePublicationHandler(cmty)

	if err != nil {
		return nil, err
	}

	return res, nil
}

func (c *cmty) FindCmtyResolver(params graphql.ResolveParams) (interface{}, error) {
	uid, _ := params.Args["uid"].(string)
	res, err := c.cmtyHandler.FindCmtyHandler(uid)

	if err != nil {
		return nil, err
	}

	return res, nil
}

func (c *cmty) FindAllCmtytResolver(params graphql.ResolveParams) (interface{}, error) {
	limit, _ := params.Args["limit"].(int)
	pageNumber, _ := params.Args["pageNumber"].(int)
	res, err := c.cmtyHandler.FindAllCmtyHandler(int64(pageNumber), int64(limit))

	if err != nil {
		return nil, err
	}

	return res, nil
}

func (c *cmty) FindAllGameTwitchResolver(params graphql.ResolveParams) (interface{}, error) {
	accessToken, _ := params.Args["accessToken"].(string)
	refreshToken, _ := params.Args["refreshToken"].(string)
	res, err := c.cmtyHandler.FindAllCmtyGameHandler(accessToken, refreshToken)

	if err != nil {
		return nil, err
	}

	return res, nil
}

func (c *cmty) FindAllStreamingTwitchResolver(params graphql.ResolveParams) (interface{}, error) {
	gameName, _ := params.Args["gameName"].(string)
	accessToken, _ := params.Args["accessToken"].(string)
	refreshToken, _ := params.Args["refreshToken"].(string)

	if accessToken == "" && refreshToken == "" {
		token, _ := external.GetHmsetRedis("access_token_twitch", "key")
		oauth := external.HandleTokenInRedis(token)
		accessToken = oauth.AccessToken
		refreshToken = oauth.RefreshToken
	}

	gameView,err := c.cmtyGameHandler.FindGameTwitchHandler(gameName)
	
	if err != nil {
		return nil, err
	}

	res, err := c.cmtyHandler.FindAllStreamingHandler(accessToken, gameView.Slug, refreshToken)

	if err != nil {
		return nil, err
	}

	return res, nil
}

func (c *cmty) EditStatutPublicationResolve(params graphql.ResolveParams) (interface{}, error) {
	uid, _ := params.Args["uid"].(string)
	statut, _ := params.Args["statut"].(bool)
	_, err := c.cmtyHandler.FindCmtyHandler(uid)

	if err != nil {
		return nil, err
	}

	res, err := c.cmtyHandler.EditPublicationHandler(uid,statut)

	if err != nil {
		return nil, err
	}

	return res, nil

}

func (c *cmty) RemovePublicationResolve(params graphql.ResolveParams) (interface{}, error) {
	uid, _ := params.Args["uid"].(string)
	_, err := c.cmtyHandler.FindCmtyHandler(uid)

	if err != nil {
		return nil, err
	}

	res, err := c.cmtyHandler.RemovePublicationHandler(uid)

	if err != nil {
		return nil, err
	}

	return res, nil
}
