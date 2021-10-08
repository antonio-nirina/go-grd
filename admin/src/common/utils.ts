interface token{
	access_token :string
	refresh_token :string
}

export const getAccessToken = function() :token|null  {
	const token = localStorage.getItem("access_token_twitch")
	if (token) {
		return JSON.parse(token)
	}
	return null
}