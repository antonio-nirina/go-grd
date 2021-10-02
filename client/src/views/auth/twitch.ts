import {TWITCH_OUATH,TWITCH_REDIRECT,TWITCH_REDIRECT_PR} from "../commons/url"
import {createApolloClient as client} from "../../config/apollo-client"
import {TwitchProfil} from "../../gql/user/auth"
import {TokenType,SendToken} from "./utils"

export const TWITCH_TOKEN = "twitch_token"

export const SigingTwitch = function() {
	const REDIRECT_URI_TWITCH = process.env.NODE_ENV === "development" ? encodeURI(TWITCH_REDIRECT) : encodeURI(TWITCH_REDIRECT_PR)
	let uri = `${TWITCH_OUATH}&redirect_uri=${REDIRECT_URI_TWITCH}`
	// window.open(uri,"","width=600,height=400")
	window.open(uri,"")
	
	window.addEventListener('message', event => receiveMessageCodeTwitch(event), false)
}

const receiveMessageCodeTwitch = function(event: any) {
	console.log("event", event)
	if (TWITCH_REDIRECT !== event.origin) {
		return ""
	}

	const { data } = event

	if (data) getTokenUser(data.split("=")[1])
}

export const getTokenUser = async function(code: string) {
	console.log("code",code)
	try {
		const data = await client().query({query:TwitchProfil,variables:{code:code}})
		console.log("data",data)
		const token:TokenType = {
			access_token: data.data.GetAccessTokenTwitch.AccessToken,
			refresh_token:data.data.GetAccessTokenTwitch.RefreshToken,
			type:"twitch"
		}

		SendToken(token)
		window.location.pathname = "/profile"
	} catch(errors) {
		console.log("errors_get_one_match", errors)
	}
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
