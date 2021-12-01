import Cookies from 'js-cookie'

export const ACCESS_TOKEN_TWITCH = "access_token_twitch"
interface token{
	access_token :string
	refresh_token :string
}


export interface TokenType {
	access_token:string|""
	refresh_token:string|""
	type:string|""
}

export const getAccessToken = function() :token|null  {
	const token = localStorage.getItem("access_token_twitch")
	if (token) {
		return JSON.parse(token)
	}
	return null
}

export const SetTokenCookies = function(token:TokenType) {
	Cookies.set(ACCESS_TOKEN_TWITCH, encodeCookieContent(token))
}

/**
 * @function encodeCookieContent
 * @param { string|object } data - The string or object to encode
 * @returns { string } The encoded string
 */
export const encodeCookieContent = (data:any) => {
    if (typeof data === 'string') {
        return btoa(data)
    } else {
        return btoa(JSON.stringify(data))
    }
}

/**
 * @function decodeCookieContent
 * @param { string } data - The string to decode
 * @returns { object } the JSON parsed data
 */
export const decodeCookieContent = function(data:any):TokenType {
    try {
        return JSON.parse(data)
    } catch (e) {
        try {
            return JSON.parse(atob(data))
        } catch (e) {
            return data
        }
    }
}

export const GetCookie = function(key = "") {
	let data
	var k = key ? key : ACCESS_TOKEN_TWITCH
	let cookieData = Cookies.get(k)

	if(cookieData) data = decodeCookieContent(cookieData)


	return data
}
