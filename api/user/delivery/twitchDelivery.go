package delivery

import (
	"fmt"

	"github.com/graphql-go/graphql"
	"github.com/joho/godotenv"
	"github.com/thoussei/antonio/api/external"
	game "github.com/thoussei/antonio/api/games/entity"
	"github.com/thoussei/antonio/api/user/entity"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

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

type notificationTwitchApi struct {
	Email bool `json:"email"`
	Push  bool `json:"push"`
}

func (r *resolver) GetAccessTokenTwitchApi(params graphql.ResolveParams) (interface{}, error) {
	err := godotenv.Load()
	if err != nil {
		external.Logger("Error loading .env file")
	}

	// commonDelevery
	accesTokens, err := external.GetAccessTokenTwitch(params.Args["code"].(string))

	if err != nil {
		return nil, err
	}

	userTwitch, err := external.GetUserTwitchApi(accesTokens.AccessToken)
	user, err := r.userHandler.FindUserByEmail(userTwitch.Email)

	if err != nil {
		external.Logger(fmt.Sprintf("%v", err))
	}

	var twitchAccount []entity.Accounts
	accounts := entity.Accounts{
		Uid:    primitive.NewObjectID(),
		Id:     userTwitch.Id,
		Name:   "Twitch",
		Profil: userTwitch.DisplayName,
		Logo:   "",
	}

	twitchAccount = append(twitchAccount, accounts)
	checkTwitchAccount := false

	if len(user.Accounts) > 0 {
		for _, acc := range user.Accounts {
			if acc.Name == "Twitch" {
				checkTwitchAccount = true
			}
		}
	}

	if user.Uid.Hex() != "" && !checkTwitchAccount {
		user.Accounts = twitchAccount
		_, err = r.userHandler.UpdatedUser(&user)
	} else if user.Uid.Hex() == "" && !checkTwitchAccount {
		userTwitch := &entity.User{
			Uid:           primitive.NewObjectID(),
			FirstName:     userTwitch.DisplayName,
			LastName:      "",
			Password:      "",
			Username:      userTwitch.Login,
			Email:         userTwitch.Email,
			IsBanned:      false,
			Avatar:        "",
			Language:      "fr",
			Point:         entity.POINT,
			IdGameAccount: []game.GameAccount{},
			Roles:         roles,
			TypeConnexion: "twitch",
			Accounts:      twitchAccount,
		}

		r.userHandler.SavedUser(userTwitch)
	}

	return accesTokens, nil
}
