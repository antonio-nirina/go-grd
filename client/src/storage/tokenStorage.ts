
export const ACCESS_TOKEN = 'access_token'

export const getAccessToken = function() {
	const token = localStorage.getItem(ACCESS_TOKEN)
	if(!token) return ""
	if (token) {
		const data = JSON.parse(token)

		return data.access_token
	}

}
