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
