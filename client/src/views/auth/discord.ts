const uriDisc = "https://canary.discord.com/api/oauth2/authorize?client_id=849049427200049202&permissions=0&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code&scope=identify%20email%20connections%20webhook.incoming%20bot%20activities.read"
export const AuthDiscord = function() {
    window.open(uriDisc,"")
}