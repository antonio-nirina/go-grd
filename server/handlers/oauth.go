package handlers

type OauthTokenDiscord struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
	// TokenType    string `json:"token_type"`
	// Scope        string `json:"scope"`
	ExpiresIn int `json:"expires_in"`
}
