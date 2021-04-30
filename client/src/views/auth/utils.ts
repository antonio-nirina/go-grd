
const REDIRECT_URI = encodeURI("http://localhost:3000/ligue")
const BASE_URI = `https://login.live.com/oauth20_authorize.srf?response_type=code&client_id=43ecdb9b-5301-4d89-ab72-52daca2f648b&approval_prompt=auto&redirect_uri=${REDIRECT_URI}&scope=Xboxlive.signin+Xboxlive.offline_access`

export const checkValidEmail = (mail: string) => {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return Boolean(mail && re.test(mail))
}

export const Siging = function() {
	window.open(BASE_URI,"","width=800,height=400")
}
