import {createApolloClient as client} from "../../config/apollo-client"
import {XBoxToken} from "../../gql/user/auth"


const URL_REDIRECT = "http://localhost:3000"

const REDIRECT_URI = encodeURI(URL_REDIRECT)
const BASE_URI = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?response_type=code&client_id=43ecdb9b-5301-4d89-ab72-52daca2f648b&redirect_uri=${REDIRECT_URI}&response_mode=query
&scope=offline_access%20user.read%20mail.read`
// const BASE_URI = `https://login.live.com/oauth20_authorize.srf?response_type=code&client_id=43ecdb9b-5301-4d89-ab72-52daca2f648b&approval_prompt=auto&redirect_uri=${REDIRECT_URI}&scope=Xboxlive.signin+Xboxlive.offline_access`
export const ACCESS_TOKEN = "access_token"
export interface TokenType {
	access_token:string|""
	refresh_token:string|""
	type:string|""
}
export const checkValidEmail = (mail: string) => {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return Boolean(mail && re.test(mail))
}

export const Siging = function() {
	window.open(BASE_URI,"","width=600,height=400")
	window.addEventListener('message', event => receiveMessage(event), false)
}

const receiveMessage = function(event: any) {
	if (URL_REDIRECT !== event.origin) {
		return ""
	}

	const { data } = event
	console.log(data)
	if (data) getTokenUser(data.split("=")[1])
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
	localStorage.setItem(ACCESS_TOKEN,JSON.stringify(token))
}




