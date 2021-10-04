package delivery

import (
	"encoding/json"
	"fmt"

	"github.com/graphql-go/graphql"
	"github.com/joho/godotenv"
	"github.com/thoussei/antonio/api/external"
	game "github.com/thoussei/antonio/api/games/entity"
	"github.com/thoussei/antonio/api/user/entity"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type oauthTokenTwitch struct {
	AccessToken  string   `json:"access_token"`
	RefreshToken string   `json:"refresh_token"`
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

	code, _ := params.Args["code"].(string)
	accesTokens, err := external.GetAccessTokenTwitch(code)

	if err != nil {
		return nil, err
	}
	data, _ := json.Marshal(accesTokens)
	external.SetHmsetRedis("access_token_twitch", "key", data)
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

func (r *resolver) GetAccessUserTwitchApi(params graphql.ResolveParams) (interface{}, error) {
	accesToken, _ := params.Args["accessToken"].(string)
	user, err := external.GetUserTwitchApi(accesToken)

	if err != nil {
		return nil, err
	}

	return user, nil
}
func (r *resolver) GetAccessTokenTwitchAdmin(params graphql.ResolveParams) (interface{}, error) {
	err := godotenv.Load()
	if err != nil {
		external.Logger("Error loading .env file")
	}

	accessToken, _ := external.GetHmsetRedis("access_token_twitch", "key")
	oauth := oauthTokenTwitch{}
	fmt.Println("accessToken",accessToken)
	if len(accessToken) > 0 && accessToken[0] != nil{
		nAccessToken := fmt.Sprintf("%v", accessToken[0])
		json.Unmarshal([]byte(nAccessToken),&oauth)
		check, _ := external.ValidateToken(oauth.AccessToken)
		if !check {
			refresh, _ := external.RefressToken(oauth.RefreshToken)
			oauth.AccessToken = refresh.AccessToken
			oauth.RefreshToken = refresh.RefreshToken
		}
	} else {
		code, _ := params.Args["code"].(string)
		fmt.Println("code",code)
		newToken, _ := external.GetAccessTokenTwitch(code)
		fmt.Println("newToken",newToken)
		data,_:= json.Marshal(newToken)
		external.SetHmsetRedis("access_token_twitch", "key",data)
		oauth.AccessToken = newToken.AccessToken
		oauth.RefreshToken = newToken.RefreshToken
	}
fmt.Println(oauth)
	return oauth, nil
}
