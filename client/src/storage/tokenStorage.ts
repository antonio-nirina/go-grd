export const ACCESS_TOKEN = 'access_token'

export const getAccessToken = function() {
	const token = localStorage.getItem(ACCESS_TOKEN)
	if(!token) return ""
	if (token) {
		const data = JSON.parse(token)

		return data.access_token
	}

}

export const getAccessTokenTwitch = function() {
	const token = localStorage.getItem("access_token_twitch")
	if(!token) return ""
	if (token) {
		const data = JSON.parse(token)

		return data.access_token
	}
}

export const getAccessTokenDiscord = function() {
	const token = localStorage.getItem("access_token_discord")
	if(!token) return ""
	if (token) {
		const data = JSON.parse(token)

		return data.access_token
	}
}

export const getDataByToken = function() {
	const user:string|null = localStorage.getItem("userConnected")
	if(!user) return undefined

	return JSON.parse(user).roles
}
