import gql from "graphql-tag"


export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password)
    }
`
export const XBoxToken = gql`
	query GetAccessTokenXbox($code: String!) {
        GetAccessTokenXbox(code: $code) {
			AccessToken
			RefreshToken
		}
    }
`

export const XboxProfil = gql`
	query GetProfilUserXbox($accessToken: String!) {
		GetProfilUserXbox(accessToken: $accessToken) {
				DisplayName
				Surname
				userPrincipalName
				Id
				Mail
				PreferredLanguage
			}
	}
`

export const TwitchProfil = gql`
	query GetAccessTokenTwitch($code: String!) {
		GetAccessTokenTwitch(code: $code) {
				access_token
				refresh_token
				expires_in
			}

	}
`
export const Deconnect = gql`
	mutation Deconnected($id:String){
		Deconnected(id:$id)
	}
`
