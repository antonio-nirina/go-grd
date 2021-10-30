import {TWITCH_OUATH,URI_REDIRECT,URI_REDIRECT_PR} from "../commons/url"
import {createApolloClient as client} from "../../config/apollo-client"
import {TwitchProfil,DiscordProfil} from "../../gql/user/auth"
import {TokenType} from "./utils"

export const TWITCH_TOKEN = "twitch_token"

export const SigingTwitch = function() {
	const REDIRECT_URI_TWITCH = process.env.NODE_ENV === "development" ? encodeURI(URI_REDIRECT) : encodeURI(URI_REDIRECT_PR)
	let uri = `${TWITCH_OUATH}&redirect_uri=${REDIRECT_URI_TWITCH}`
	window.open(uri,"","width=600,height=400")
	
	window.addEventListener('message', event => receiveMessageCode(event,true,false), false)
}

export const receiveMessageCode = function(event: any,isTwitch:boolean,isDiscord:boolean) {
	
	if (URI_REDIRECT !== event.origin) {
		return ""
	}

	const { data } = event
	if (data) getTokenUser(data.split("=")[1],isTwitch,isDiscord)
}

export const getTokenUser = async function(code: string,isTwitch:boolean,isDiscord:boolean) {
	let type = ""
	let data:any
	let token:TokenType ={
		access_token:"",
		refresh_token:"",
		type:""
	}
	let access_token = ""
	if(isDiscord){
		type = "discord"
		access_token = "access_token_discord"
	}
	if(isTwitch) {
		type = "twitch"
		access_token = "access_token_twitch"
	}
	
	try {
		if(isDiscord) {
			data = await client().query({query:DiscordProfil,variables:{code:code}})
		}
		if(isTwitch) {
			data = await client().query({query:TwitchProfil,variables:{code:code}})
		}

		if(data.data) {
			token.type = type
			if(isDiscord){
				token.access_token = data.data.GetAccessTokenDiscord.access_token
				token.refresh_token = data.data.GetAccessTokenDiscord.refresh_token		
			}
			if(isTwitch) {
				token.access_token = data.data.GetAccessTokenTwitch.access_token
				token.refresh_token = data.data.GetAccessTokenTwitch.refresh_token
			}
			
			// SendToken(token)
			localStorage.setItem(access_token,JSON.stringify(token))
			window.location.pathname = "/"
		}
		
	} catch(errors) {
		console.log("errors", errors)
	}
}

