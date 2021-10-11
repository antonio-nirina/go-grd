import gql from "graphql-tag"

export const TwitchProfil = gql`
    query GetAccessTokenTwitchAdmin($code: String!) {
        GetAccessTokenTwitchAdmin(code: $code) {
                access_token
                refresh_token
            }

    }
`

export const Twitch_GAMES = gql`
    query FindAllGAmeTwitch($accessToken: String!,$refreshToken:String) {
        FindAllGAmeTwitch(accessToken: $accessToken,refreshToken:$refreshToken) {
                uid
                id
                name
                box_art_url
            }

    }
`

export const Twitch_STREAMING = gql`
    query FindAllStreaming($accessToken: String,$gameId:String,$refreshToken:String) {
        FindAllStreaming(accessToken: $accessToken,gameId:$gameId,refreshToken:$refreshToken) {
                uid
                id
                videoId
                gameId
                title
                viewerCount
                createdAt
                creatorName
                thumbnailUrl
            }

    }
`

export const GET_ALL_CMTY = gql`
	query FindAllCmty($limit: Int!,$pageNumber:Int!) {
		FindAllCmty(limit: $limit,pageNumber:$pageNumber){
            uid
            statut
            streaming{
                id
                videoId
                gameId
                title
                viewerCount
                createdAt
                creatorName
                thumbnailUrl
				createdAt
            }
            game{
                uid
                name
                box_art_url
            }
	}
}`
