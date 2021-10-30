package delivery

import (
	"fmt"

	"github.com/graphql-go/graphql"
	"github.com/joho/godotenv"
	"github.com/thoussei/antonio/api/external"
)

func (r *resolver) GetAccessTokenDiscordApi(params graphql.ResolveParams) (interface{}, error) {
	err := godotenv.Load()
	if err != nil {
		external.Logger("Error loading .env file")
	}

	code, _ := params.Args["code"].(string)
	fmt.Println(code)
	accesTokens, err := external.GetAccessTokenAndRefreshDiscord(code, "", false)

	if err != nil {
		return nil, err
	}

	user, err := external.GetUserConnectedDiscord(accesTokens.AccessToken)
	if err != nil {
		return nil, err
	}

	return user, nil
}
