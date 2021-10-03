package handler

import (
	"github.com/thoussei/antonio/api/community/entity"
	"github.com/thoussei/antonio/api/community/repository"
	"github.com/thoussei/antonio/api/external"
	gameHanlder "github.com/thoussei/antonio/api/games/handler"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UsecaseCmty interface {
	CreatePublicationHandler(cmty *entity.Communauty) (interface{}, error)
	FindCmtyHandler(idQuery string) (CmtyViewModel, error)
	FindAllCmtyHandler(pageNumber int64, limit int64) ([]CmtyViewModel, error)
	FindAllCmtyGameHandler(accessToken string) ([]CmtyGameTwitchViewModel, error)
	FindAllStreamingHandler(accessToken string, id string) ([]CmtystreamingViewModelTwitch, error)
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

	gameViews := gameHanlder.GameViewModel{
		Uid:   result.Game.Uid.Hex(),
		Name:  result.Game.Name,
		Image: result.Game.Image,
		Logo:  result.Game.Logo,
		Notes: result.Game.Notes,
		Slug:  result.Game.Slug,
	}

	cmtyViewModel := CmtyViewModel{
		Uid:       result.Uid.Hex(),
		Streaming: result.Streaming,
		Game:      gameViews,
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

		gameViews := gameHanlder.GameViewModel{
			Uid:   val.Game.Uid.Hex(),
			Name:  val.Game.Name,
			Image: val.Game.Image,
			Logo:  val.Game.Logo,
			Notes: val.Game.Notes,
			Slug:  val.Game.Slug,
		}
		cmtyViewModel := CmtyViewModel{
			Uid:       val.Uid.Hex(),
			Streaming: val.Streaming,
			Game:      gameViews,
		}

		res = append(res, cmtyViewModel)
	}

	return res, nil
}

func (c *cmtytUsecase) FindAllCmtyGameHandler(accessToken string) ([]CmtyGameTwitchViewModel, error) {
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

func (c *cmtytUsecase) FindAllStreamingHandler(accessToken string, id string) ([]CmtystreamingViewModelTwitch, error) {
	streams, err := external.GetStreamingListByGame(accessToken, id)

	if err != nil {
		return []CmtystreamingViewModelTwitch{}, err
	}

	var res []CmtystreamingViewModelTwitch

	for _, val := range streams {
		streamTwitchViews := CmtystreamingViewModelTwitch{
			Id:           val.Id,
			UserId:       val.UserId,
			UserLogin:    val.UserLogin,
			UserName:     val.UserName,
			GameId:       val.GameId,
			GameName:     val.GameName,
			Type:         val.Type,
			Title:        val.Title,
			ViewerCount:  val.ViewerCount,
			StartedAt:    val.StartedAt,
			Language:     val.Language,
			ThumbnailUrl: val.ThumbnailUrl,
			//	TagIds:       val.TagIds,
			IsMature: val.IsMature,
		}

		res = append(res, streamTwitchViews)
	}

	return res, nil

}
