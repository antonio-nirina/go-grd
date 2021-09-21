import gql from "graphql-tag"

export const GET_ALL_CMTY = gql`
query FindAllCmty($limit: Int!,$pageNumber:Int!) {
	FindAllCmty(limit: $limit,pageNumber:$pageNumber){
		uid
		title
		user{
			uid
			email
			username
			avatar
		}
		content
	}
}`

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
