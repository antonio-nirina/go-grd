import {TWITCH_OUATH,TWITCH_REDIRECT,TWITCH_REDIRECT_PR} from "../commons/url"
import {createApolloClient as client} from "../../config/apollo-client"
import {TwitchProfil} from "../../gql/user/auth"
import {TokenType} from "./utils"

export const TWITCH_TOKEN = "twitch_token"

export const SigingTwitch = function() {
	const REDIRECT_URI_TWITCH = process.env.NODE_ENV === "development" ? encodeURI(TWITCH_REDIRECT) : encodeURI(TWITCH_REDIRECT_PR)
	let uri = `${TWITCH_OUATH}&redirect_uri=${REDIRECT_URI_TWITCH}`
	window.open(uri,"","width=600,height=400")
	
	window.addEventListener('message', event => receiveMessageCodeTwitch(event), false)
}

const receiveMessageCodeTwitch = function(event: any) {
	
	if (TWITCH_REDIRECT !== event.origin) {
		return ""
	}

	const { data } = event
	if (data) getTokenUser(data.split("=")[1])
}

export const getTokenUser = async function(code: string) {
	try {
		const data = await client().query({query:TwitchProfil,variables:{code:code}})
		if(data.data) {
			const token:TokenType = {
				access_token: data.data.GetAccessTokenTwitch.access_token,
				refresh_token:data.data.GetAccessTokenTwitch.refresh_token,
				type:"twitch"
			}
			
			// SendToken(token)
			localStorage.setItem("access_token_twitch",JSON.stringify(token))
			window.location.pathname = "/"
		}
		
	} catch(errors) {
		console.log("errors_get_one_match", errors)
	}
}

