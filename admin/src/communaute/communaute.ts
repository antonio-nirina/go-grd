import {createApolloClient as client} from "../config/apollo-client"
import {TwitchProfil} from "../gql/cmty/query"

export const TWITCH_OUATH = "https://id.twitch.tv/oauth2/authorize?client_id=hy3s04cw7m9qofg7thik89lii2inr0&response_type=code&scope=user:read:broadcast%20user:read:email"

export const SigingAdminTwitch = function(){
    const REDIRECT_URI_TWITCH = process.env.REACT_URI
    let uri = `${TWITCH_OUATH}&redirect_uri=${REDIRECT_URI_TWITCH}`
	window.open(uri,"","width=600,height=400")
    window.addEventListener('message', event => receiveMessageCodeTwitch(event), false)
}

const receiveMessageCodeTwitch = function(event: any) {
	
	if (process.env.REACT_URI !== event.origin) {
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
				access_token: data.data.GetAccessTokenTwitch.access_token,
				refresh_token:data.data.GetAccessTokenTwitch.refresh_token,
				type:"twitch"
			}

			localStorage.setItem("access_token_twitch",JSON.stringify(token))
			window.location.pathname = "/admin/communaute"
		}
		
	} catch(errors) {
		console.log("errors_get_one_match", errors)
	}
}