import {receiveMessageCode} from "./twitch"

export const DISCORD_TOKEN = "discord_token"


const uriDisc = "https://discord.com/api/oauth2/authorize?client_id=849049427200049202&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code&scope=identify%20email%20connections"
export const AuthDiscord = function() {
    //const REDIRECT_URI_TWITCH = process.env.NODE_ENV === "development" ? encodeURI(URI_REDIRECT) : encodeURI(URI_REDIRECT_PR)
	window.open(uriDisc,"","width=600,height=400")
	window.addEventListener('message', event => receiveMessageCode(event,false,true), false)
}