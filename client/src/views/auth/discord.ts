const uriDisc = "https://id.twitch.tv/oauth2/authorize?client_id=hy3s04cw7m9qofg7thik89lii2inr0&redirect_uri=http://localhost:3000&response_type=token&scope=user:read:broadcast%20user:read:email"

export const AuthDiscord = function() {
    window.open(uriDisc,"")
}