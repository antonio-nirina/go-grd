package external

import (
	"crypto/tls"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"os"
)

const TWITCH_TOKEN = "https://id.twitch.tv/oauth2/token"
const TWITCH_TOKEN_USER = "https://api.twitch.tv/helix/user"
const TWITC_USER_ID = "https://api.twitch.tv/helix/users?id="       // GET
const TWITCH_STREAMING_USER = "https://api.twitch.tv/helix/streams" // GET
const TWITCH_GET_USER = "https://api.twitch.tv/helix/users"
const TWITCH_GAME_ALL = "https://api.twitch.tv/helix/games/top"
const TWITC_STREAM_GAME = "https://api.twitch.tv/helix/clips"
const TWITC_VALIDATE_TOKEN = "https://id.twitch.tv/oauth2/validate"
const TWITC_REFRESH_TOKEN = "https://id.twitch.tv/oauth2/token"

type DataToken struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
}

type oauthTokenTwitch struct {
	TokenType    string   `json:"token_type"`
	ExpiresIn    int      `json:"expires_in"`
	Scope        []string `json:"scope"`
	AccessToken  string   `json:"access_token"`
	RefreshToken string   `json:"refresh_token"`
}

type userTwitchApi struct {
	Data []usersTwicth
}

type usersTwicth struct {
	Id               string `json:"id"`
	Login            string `json:"login"`
	DisplayName      string `json:"display_name"`
	Email            string `json:"email"`
	Broadcaster_type string `json:"broadcaster_type"`
	Description      string `json:"description"`
	ProfileImageUrl  string `json:"profile_image_url"`
	OfflineImageUrl  string `json:"offline_image_url"`
	Type             string `json:"type"`
	ViewCount        int    `json:"view_count"`
	CreatedAt        string `json:"created_at"`
}

type userResultTwitch struct {
	Id              string `json:"id"`
	Login           string `json:"login"`
	DisplayName     string `json:"display_name"`
	Email           string `json:"email"`
	ProfileImageUrl string `json:"profile_image_url"`
	CreatedAt       string `json:"created_at"`
}

type GameTwitch struct {
	Data []GameElemmentTwitch
}

type GameElemmentTwitch struct {
	Id        string `json:"id"`
	Name      string `json:"name"`
	BoxArtUrl string `json:"box_art_url"`
}

type resultGameElement struct {
	Id        string `json:"id"`
	Name      string `json:"name"`
	BoxArtUrl string `json:"box_art_url"`
}

type streamingTwitch struct {
	Data []streamingElementTwitch
}

type streamingElementTwitch struct {
	Id           string   `json:"id"`
	Url       string   `json:"url"`
	EmbedUrl    string   `json:"embed_url"`
	BroadcasterId     string   `json:"broadcaster_id"`
	BroadcasterName       string   `json:"broadcaster_name"`
	CreatorId     string   `json:"creator_id"`
	CreatorName         string   `json:"creator_name"`
	VideoId        string   `json:"video_id"`
	ViewerCount  int      `json:"viewer_count"`
	GameId    string   `json:"game_id"`
	Language     string   `json:"language"`
	Title string   `json:"title"`
	CreatedAt       string `json:"created_at"`
	ThumbnailUrl     string     `json:"thumbnail_url"`
}

/*

	type streamingElementTwitch struct {
		Id           string   `json:"id"`
		UserId       string   `json:"user_id"`
		UserLogin    string   `json:"user_login"`
		UserName     string   `json:"user_name"`
		GameId       string   `json:"game_id"`
		GameName     string   `json:"game_name"`
		Type         string   `json:"type"`
		Title        string   `json:"title"`
		ViewerCount  int      `json:"viewer_count"`
		StartedAt    string   `json:"started_at"`
		Language     string   `json:"language"`
		ThumbnailUrl string   `json:"thumbnail_url"`
		TagIds       []string `json:"tag_ids"`
		IsMature     bool     `json:"is_mature"`
	}

*/

type hTTPClient struct {
	client *http.Client
}

var tr = &http.Transport{
	TLSClientConfig: &tls.Config{
		Renegotiation:      tls.RenegotiateOnceAsClient,
		InsecureSkipVerify: true,
	},
}

func twitchAccesstHttp() *hTTPClient {
	apiClient := &hTTPClient{}
	apiClient.client = http.DefaultClient
	apiClient.client.Transport = tr

	return apiClient
}

func GetAccessTokenTwitch(code string, redirectUri string) (*DataToken, error) {
	htppClient := twitchAccesstHttp()
	url := fmt.Sprintf("%s?client_id=%s&client_secret=%s&code=%s&grant_type=%s&redirect_uri=%s", TWITCH_TOKEN, os.Getenv("CLIENT_ID_TWITCH"), os.Getenv("CLIENT_SECRET_TWITCH"), code, "authorization_code", redirectUri)
	req, err := http.NewRequest("POST", url, nil)
	if err != nil {
		return &DataToken{}, err
	}

	resp, err := htppClient.client.Do(req)

	if err != nil {
		return &DataToken{}, err
	}

	resSuccess := &oauthTokenTwitch{}
	token := &DataToken{}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)

	if err != nil {
		return &DataToken{}, err
	}

	if resp.StatusCode == 200 {
		err = json.Unmarshal(body, resSuccess)
		if err != nil {
			Logger(fmt.Sprintf("%v", err))
		}

		token.AccessToken = resSuccess.AccessToken
		token.RefreshToken = resSuccess.RefreshToken

		return token, nil
	}

	return token, nil
}

func GetUserTwitchApi(accessToken string) (userResultTwitch, error) {
	respUser, err := requestTwitchApi(accessToken, TWITCH_GET_USER, "")

	if err != nil {
		return userResultTwitch{}, err
	}

	defer respUser.Body.Close()
	twitchBody, err := ioutil.ReadAll(respUser.Body)
	userTwitch := &userTwitchApi{}
	err = json.Unmarshal(twitchBody, userTwitch)

	if err != nil {
		Logger(fmt.Sprintf("%v", err))
	}

	res := userResultTwitch{
		Id:              userTwitch.Data[0].Id,
		Login:           userTwitch.Data[0].Login,
		DisplayName:     userTwitch.Data[0].DisplayName,
		Email:           userTwitch.Data[0].Email,
		ProfileImageUrl: userTwitch.Data[0].ProfileImageUrl,
		CreatedAt:       userTwitch.Data[0].CreatedAt,
	}

	return res, nil
}

func GetAllGameTwitch(accessToken string) ([]resultGameElement, error) {
	respUser, err := requestTwitchApi(accessToken, TWITCH_GAME_ALL, "")

	if err != nil {
		return []resultGameElement{}, err
	}

	defer respUser.Body.Close()
	twitchBody, err := ioutil.ReadAll(respUser.Body)
	gameTwitch := &GameTwitch{}
	err = json.Unmarshal(twitchBody, gameTwitch)

	if err != nil {
		Logger(fmt.Sprintf("%v", err))
	}

	var res []resultGameElement

	for _, val := range gameTwitch.Data {
		ares := resultGameElement{
			Id:        val.Id,
			Name:      val.Name,
			BoxArtUrl: val.BoxArtUrl,
		}
		res = append(res, ares)
	}

	return res, nil
}

func GetStreamingListByGame(accessToken string, id string) ([]streamingElementTwitch, error) {
	respUser, err := requestTwitchApi(accessToken, TWITC_STREAM_GAME+"?game_id="+id, "")

	if err != nil {
		return []streamingElementTwitch{}, err
	}

	defer respUser.Body.Close()
	twitchBody, err := ioutil.ReadAll(respUser.Body)
	streamsTwitch := &streamingTwitch{}
	err = json.Unmarshal(twitchBody, streamsTwitch)

	if err != nil {
		Logger(fmt.Sprintf("%v", err))
	}

	var res []streamingElementTwitch

	for _, val := range streamsTwitch.Data {
		// if val.ViewerCount > 0 {
			ares := streamingElementTwitch{
				Id:val.Id,
				Url:val.Url,
				EmbedUrl:val.EmbedUrl,
				BroadcasterId:val.BroadcasterId,
				BroadcasterName:val.BroadcasterName,
				CreatorId:val.CreatorId,
				CreatorName:val.CreatorName,
				VideoId:val.VideoId,
				ViewerCount:val.ViewerCount,
				GameId:val.GameId,
				Language:val.Language,
				Title:val.Title,
				CreatedAt:val.CreatedAt,
				ThumbnailUrl:val.ThumbnailUrl,
			}
			res = append(res, ares)
		//}		
	}

	return res, nil
}

func ValidateToken(accessToken string) (bool, error) {
	respUser, err := requestTwitchApi(accessToken, TWITC_VALIDATE_TOKEN, "")

	if err != nil {
		return false, err
	}

	defer respUser.Body.Close()
	if respUser.StatusCode == 200 {
		return true, nil
	}

	return false, nil
}

func RefressToken(refreshToken string) (*oauthTokenTwitch, error) {
	htppClient := twitchAccesstHttp()
	req, err := http.NewRequest("POST", TWITC_REFRESH_TOKEN, nil)
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded; param=value")
	respUser, err := htppClient.client.Do(req)
	data := url.Values{}
	data.Set("client_id", os.Getenv("CLIENT_ID_TWITCH"))
	data.Add("client_secret", os.Getenv("CLIENT_SECRET_TWITCH"))
	data.Add("grant_type", "refresh_token")
	data.Add("refresh_token", refreshToken)

	if err != nil {
		return &oauthTokenTwitch{}, err
	}

	defer respUser.Body.Close()
	twitchBody, err := ioutil.ReadAll(respUser.Body)
	streamsTwitch := &oauthTokenTwitch{}
	err = json.Unmarshal(twitchBody, streamsTwitch)

	if err != nil {
		Logger(fmt.Sprintf("%v", err))
	}

	return streamsTwitch, nil
}

func requestTwitchApi(accessToken string, url string, method string) (*http.Response, error) {
	_method := ""

	if method == "" {
		_method = "GET"
	} else {
		_method = method
	}
	htppClient := twitchAccesstHttp()
	reqUser, err := http.NewRequest(_method, url, nil)

	if accessToken != "" {
		reqUser.Header.Set("Authorization", "Bearer "+accessToken)
	}

	reqUser.Header.Set("Client-Id", os.Getenv("CLIENT_ID_TWITCH"))
	reqUser.Header.Set("Content-Type", "application/json")
	respUser, err := htppClient.client.Do(reqUser)

	if err != nil {
		return nil, err
	}

	return respUser, nil

}
