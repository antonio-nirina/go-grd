import {createApolloClient as client} from "../config/apollo-client"
import {TwitchProfil,Twitch_STREAMING} from "../gql/cmty/query"
import {SetTokenCookies} from "../common/utils"

export const TWITCH_OUATH = "https://id.twitch.tv/oauth2/authorize?client_id=hy3s04cw7m9qofg7thik89lii2inr0&response_type=code&scope=user:read:broadcast%20user:read:email%20chat:read:email%20chat:edit"

export const SigingAdminTwitch = function(){
    const REDIRECT_URI_TWITCH = process.env.REACT_APP_URI
    let uri = `${TWITCH_OUATH}&redirect_uri=${REDIRECT_URI_TWITCH}`
	window.open(uri,"","width=600,height=400")
   	window.addEventListener('message', event => receiveMessageCodeTwitch(event), false)
}

const receiveMessageCodeTwitch = function(event: any) {

	if (process.env.REACT_APP_URI !== event.origin) {
		return ""
	}

	const { data } = event
	if (data) getTokenUser(data.split("=")[1])
}

export const getTokenUser = async function(code: string) {
	try {
		const data = await client().query({query:TwitchProfil,variables:{code:code}})
		if(data.data) {
			const token = {
				access_token: data.data.GetAccessTokenTwitchAdmin.access_token,
				refresh_token:data.data.GetAccessTokenTwitchAdmin.refresh_token,
				type:"twitch"
			}

			// localStorage.setItem("access_token_twitch",JSON.stringify(token))
			SetTokenCookies(token)
			window.location.reload()
		}

	} catch(errors) {
		console.log("errors_get_one_match", errors)
	}
}

export const getStreamByGame = async function(accessToken:string,idGame:string,refresh_token:string) {
	try {
		const data = await client().query({query:Twitch_STREAMING,variables:{accessToken:accessToken,gameId:idGame,refreshToken:refresh_token}})
		if(data.data) {
			return data.data.FindAllStreaming
		}

	} catch(errors) {
		console.log("errors_get_one_match", errors)
	}
}
