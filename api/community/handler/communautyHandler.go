package handler

import (
	"github.com/thoussei/antonio/api/community/entity"
	"github.com/thoussei/antonio/api/community/repository"
	"github.com/thoussei/antonio/api/external"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UsecaseCmty interface {
	CreatePublicationHandler(cmty *entity.Communauty) (interface{}, error)
	FindCmtyHandler(idQuery string) (CmtyViewModel, error)
	FindAllCmtyHandler(pageNumber int64, limit int64) ([]CmtyViewModel, error)
	FindAllCmtyGameHandler(accessToken string, refreshToken string) ([]CmtyGameTwitchViewModel, error)
	FindAllStreamingHandler(accessToken string, id string, refreshToken string) ([]CmtystreamingViewModelTwitch, error)
	FindAllGamesTwitch() ([]CmtyGameTwitchViewModel, error)
	FindOneGamesTwitch(id string) (entity.TwitchGame, error)
}

type cmtytUsecase struct {
	cmtyRepository repository.RepositoryCmty
}

func NewUsecaseCmty(r repository.RepositoryCmty) UsecaseCmty {
	return &cmtytUsecase{
		cmtyRepository: r,
	}
}

func (c *cmtytUsecase) CreatePublicationHandler(cmty *entity.Communauty) (interface{}, error) {

	_, err := c.cmtyRepository.SavedCmtyRepo(cmty)

	if err != nil {
		return 0, err
	}

	return "Ok", nil
}

func (c *cmtytUsecase) FindCmtyHandler(idQuery string) (CmtyViewModel, error) {
	objectId, err := primitive.ObjectIDFromHex(idQuery)

	if err != nil {
		return CmtyViewModel{}, err
	}

	result, err := c.cmtyRepository.FindCmtyRepo(objectId)

	if err != nil {
		return CmtyViewModel{}, err
	}

	gameViews := CmtyGameTwitchViewModel{
		Id:        result.Game.Id,
		BoxArtUrl: result.Game.BoxArtUrl,
		Name:      result.Game.Name,
	}

	cmtyViewModel := CmtyViewModel{
		Uid:       result.Uid.Hex(),
		Streaming: result.Streaming,
		Game:      gameViews,
		Statut:    result.Statut,
	}

	return cmtyViewModel, nil
}

func (c *cmtytUsecase) FindAllCmtyHandler(pageNumber int64, limit int64) ([]CmtyViewModel, error) {
	result, err := c.cmtyRepository.FindAllCmtyRepo(pageNumber, limit)

	if err != nil {
		return []CmtyViewModel{}, err
	}

	var res []CmtyViewModel

	for _, val := range result {

		gameViews := CmtyGameTwitchViewModel{
			Id:        val.Game.Id,
			BoxArtUrl: val.Game.BoxArtUrl,
			Name:      val.Game.Name,
		}
		cmtyViewModel := CmtyViewModel{
			Uid:       val.Uid.Hex(),
			Streaming: val.Streaming,
			Game:      gameViews,
			Statut:    val.Statut,
		}

		res = append(res, cmtyViewModel)
	}

	return res, nil
}

func (c *cmtytUsecase) FindAllCmtyGameHandler(accessToken string, refreshToken string) ([]CmtyGameTwitchViewModel, error) {
	// check token if isvalid
	nwAcces, _ := external.ValidateToken(accessToken)

	if !nwAcces {
		refr, err := external.RefressToken(refreshToken)

		if err != nil {
			return []CmtyGameTwitchViewModel{}, err
		}

		accessToken = refr.AccessToken
	}
	result, err := c.cmtyRepository.FindAllGAmeTwitchRepo()

	if err != nil {
		return []CmtyGameTwitchViewModel{}, err
	}
	var res []CmtyGameTwitchViewModel
	var gameTwitchViews CmtyGameTwitchViewModel

	if len(result) == 0 {
		gamesTwitch, err := external.GetAllGameTwitch(accessToken)

		if err != nil {
			return []CmtyGameTwitchViewModel{}, err
		}

		for _, val := range gamesTwitch {
			gameTwitcch := &entity.TwitchGame{
				Uid:       primitive.NewObjectID(),
				Name:      val.Name,
				Id:        val.Id,
				BoxArtUrl: val.BoxArtUrl,
			}

			_, err = c.cmtyRepository.SaveGameTwitchRepository(gameTwitcch)

			if err != nil {
				return []CmtyGameTwitchViewModel{}, err
			}
		}

		for _, val := range gamesTwitch {
			gameTwitchViews = CmtyGameTwitchViewModel{
				Name:      val.Name,
				Id:        val.Id,
				BoxArtUrl: val.BoxArtUrl,
			}

			res = append(res, gameTwitchViews)
		}

	} else {
		for _, val := range result {
			gameTwitchViews = CmtyGameTwitchViewModel{
				Name:      val.Name,
				Id:        val.Id,
				BoxArtUrl: val.BoxArtUrl,
			}

			res = append(res, gameTwitchViews)
		}
	}

	return res, nil
}

func (c *cmtytUsecase) FindAllStreamingHandler(accessToken string, id string, refreshToken string) ([]CmtystreamingViewModelTwitch, error) {
	// check token if isvalid
	nwAcces, _ := external.ValidateToken(accessToken)

	if !nwAcces {
		refr, err := external.RefressToken(refreshToken)
		if err != nil {
			return []CmtystreamingViewModelTwitch{}, err
		}

		accessToken = refr.AccessToken
	}

	streams, err := external.GetStreamingListByGame(accessToken, id)

	if err != nil {
		return []CmtystreamingViewModelTwitch{}, err
	}

	var res []CmtystreamingViewModelTwitch

	for _, val := range streams {
		streamTwitchViews := CmtystreamingViewModelTwitch{
			Id:              val.Id,
			Url:             val.Url,
			EmbedUrl:        val.EmbedUrl,
			BroadcasterId:   val.BroadcasterId,
			BroadcasterName: val.BroadcasterName,
			CreatorId:       val.CreatorId,
			CreatorName:     val.CreatorName,
			VideoId:         val.VideoId,
			ViewerCount:     val.ViewerCount,
			GameId:          val.GameId,
			Language:        val.Language,
			Title:           val.Title,
			CreatedAt:       val.CreatedAt,
			ThumbnailUrl:    val.ThumbnailUrl,
			Duration:        0,
		}

		res = append(res, streamTwitchViews)
	}

	return res, nil
}

func (c *cmtytUsecase) FindAllGamesTwitch() ([]CmtyGameTwitchViewModel, error) {
	result, err := c.cmtyRepository.FindAllGAmeTwitchRepo()

	if err != nil {
		return []CmtyGameTwitchViewModel{}, err
	}

	var res []CmtyGameTwitchViewModel
	for _, val := range result {
		gameTwitchViews := CmtyGameTwitchViewModel{
			Name:      val.Name,
			Id:        val.Id,
			BoxArtUrl: val.BoxArtUrl,
		}

		res = append(res, gameTwitchViews)
	}

	return res, nil
}

func (c *cmtytUsecase) FindOneGamesTwitch(id string) (entity.TwitchGame, error) {
	val, err := c.cmtyRepository.FindOneGamesTwitchRepo(id)

	if err != nil {
		return entity.TwitchGame{}, err
	}

	return val, nil
}
