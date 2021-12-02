import gql from "graphql-tag"


export const GET_ALL_POST = gql`
query FindAllPost($limit: Int!,$pageNumber:Int!) {
	FindAllPost(limit: $limit,pageNumber:$pageNumber){
		uid
		user{
			uid
			email
			username
			avatar
		}
		content
		files
	}
}`

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

export const GET_ALL_STREAMING = gql`
	query FindAllStreaming($gameName:String,$refreshToken:String,$accessToken:String) {
		FindAllStreaming(gameName:$gameName,refreshToken:$refreshToken,accessToken:$accessToken){
			id
			userName
			thumbnailUrl
			title
			viewerCount
			StartedAt
			gameName
	}
}`
