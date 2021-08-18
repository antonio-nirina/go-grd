import Cookies from 'js-cookie'

import {createApolloClient as client} from "../config/apollo-client"
import {XBoxToken} from "../gql/user/auth"

export const ACCESS_TOKEN = "access_token"
export interface TokenType {
	access_token:string|""
	refresh_token:string|""
	type:string|""
}
export const checkValidEmail = (mail: string) => {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return Boolean(mail && re.test(mail))
}

export const getTokenUser = async function(code: string) {
	try {
		const data = await client().query({query:XBoxToken,variables:{code:code}})
		const token:TokenType = {
			access_token: data.data.GetAccessTokenXbox.AccessToken,
			refresh_token:data.data.GetAccessTokenXbox.RefreshToken,
			type:"xbox"
		}

		SendToken(token)
		window.location.pathname = "/"
	} catch(errors) {
		console.log("errors_get_one_match", errors)
	}
}

export const SendToken = function(token:TokenType) {
	Cookies.set(ACCESS_TOKEN, encodeCookieContent(token))
}

/**
 * @function encodeCookieContent
 * @param { string|object } data - The string or object to encode
 * @returns { string } The encoded string
 */
export const encodeCookieContent = function(data:any) {
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
export const decodeCookieContent = function(data:any) {
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
// check role admin
export const GetCookie = (key = "") => {
	var k = key ? key : ACCESS_TOKEN
	let cookieData = Cookies.get(k)
	if (!cookieData) {
		return null
	}
	const data = decodeCookieContent(cookieData)

	return data
}





