package delivery

import (
	"encoding/json"

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
	accesTokens, err := external.GetAccessTokenDiscord(code)

	if err != nil {
		return nil, err
	}

	data, _ := json.Marshal(accesTokens)

	return data, nil
}
