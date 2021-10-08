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
                video_id
                game_id
                title
                viewer_count
                created_at
                creator_name
                thumbnail_url
                game_name
            }

    }
`
