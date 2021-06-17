import {TWITCH_OUATH,TWITCH_REDIRECT} from "../commons/url"
import {createApolloClient as client} from "../../config/apollo-client"
import {TwitchProfil} from "../../gql/user/auth"
import {TokenType} from "./utils"

export const TWITCH_TOKEN = "twitch_token"

export const SigingTwitch = function() {
	const REDIRECT_URI_TWITCH = encodeURI(TWITCH_REDIRECT)
	let uri = `${TWITCH_OUATH}&redirect_uri=${REDIRECT_URI_TWITCH}`
	window.open(uri,"","width=600,height=400")
	window.addEventListener('message', event => receiveMessageCode(event), false)
}

const receiveMessageCode = function(event: any) {
	if (TWITCH_REDIRECT !== event.origin) {
		return ""
	}

	const { data } = event

	if (data) getTokenUser(data.split("=")[1])
}

export const getTokenUser = async function(code: string) {
	try {
		const data = await client().query({query:TwitchProfil,variables:{code:code}})
		console.log(data)
		const token:TokenType = {
			access_token: data.data.GetAccessTokenXbox.AccessToken,
			refresh_token:data.data.GetAccessTokenXbox.RefreshToken,
			type:"twitch"
		}

		SendTokenTwitch(token)
		window.location.pathname = "/profil"
	} catch(errors) {
		console.log("errors_get_one_match", errors)
	}
}

export const SendTokenTwitch = function(token:TokenType) {
	localStorage.setItem(TWITCH_TOKEN,JSON.stringify(token))
}

/*

{
  "access_token": "<user access token>",
  "refresh_token": "<refresh token>",
  "expires_in": <number of seconds until the token expires>,
  "scope": ["<your previously listed scope(s)>"],
  "token_type": "bearer"
}


*/
