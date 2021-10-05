
export const getAccessToken = function() : string {
	const token = localStorage.getItem("access_token_twitch")
	if(!token) return ""
	if (token) {
		const data = JSON.parse(token)

		return data.access_token
	}
	return ""
}