import {GetCookie} from "../auth/utils"

export const ACCESS_TOKEN = 'access_token'

export const getAccessToken = function() {
	const token = GetCookie(ACCESS_TOKEN)
	if(!token) return ""
	if (token) {
		return token.access_token
	}

}

export const getDataByToken = function() {
	const user = GetCookie("userConnected")
	if(!user) return undefined

	return user.roles
}
