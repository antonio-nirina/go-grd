package delivery

import (
	"github.com/graphql-go/graphql"
	"github.com/joho/godotenv"
	"github.com/thoussei/antonio/api/external"
	game "github.com/thoussei/antonio/api/games/entity"
	"github.com/thoussei/antonio/api/user/entity"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (r *resolver) GetAccessTokenDiscordApi(params graphql.ResolveParams) (interface{}, error) {
	err := godotenv.Load()
	if err != nil {
		external.Logger("Error loading .env file")
	}

	code, _ := params.Args["code"].(string)
	accesTokens, err := external.GetAccessTokenAndRefreshDiscord(code, "", false)

	if err != nil {
		return nil, err
	}

	userDiscord, err := external.GetUserConnectedDiscord(accesTokens.AccessToken)
	if err != nil {
		return nil, err
	}
	user, err := r.userHandler.FindUserByEmail(userDiscord.Email)
	var discordAccount []entity.Accounts
	accounts := entity.Accounts{
		Uid:    primitive.NewObjectID(),
		Id:     userDiscord.Id,
		Name:   "Discord",
		Profil: userDiscord.Username,
		Logo:   "",
	}

	discordAccount = append(discordAccount, accounts)
	checkDiscordAccount := false

	if len(user.Accounts) > 0 {
		for _, acc := range user.Accounts {
			if acc.Name == "Discord" {
				checkDiscordAccount = true
			}
		}
	}

	if user.Uid.Hex() != "" && !checkDiscordAccount {
		user.Accounts = discordAccount
		_, err = r.userHandler.UpdatedUser(&user)
	} else if user.Uid.Hex() == "" && !checkDiscordAccount {
		userDisc := &entity.User{
			Uid:           primitive.NewObjectID(),
			FirstName:     "",
			LastName:      "",
			Password:      "",
			Username:      userDiscord.Username,
			Email:         userDiscord.Email,
			IsBanned:      false,
			Avatar:        "",
			Language:      "fr",
			Point:         entity.POINT,
			IdGameAccount: []game.GameAccount{},
			Roles:         roles,
			TypeConnexion: "twitch",
			Accounts:      discordAccount,
		}

		r.userHandler.SavedUser(userDisc)
	}
	return accesTokens, nil
}

func (r *resolver) GetAccessUserDiscordApi(params graphql.ResolveParams) (interface{}, error) {
	accesToken, _ := params.Args["accessToken"].(string)
	user, err := external.GetUserConnectedDiscord(accesToken)

	if err != nil {
		return nil, err
	}

	return user, nil
}
