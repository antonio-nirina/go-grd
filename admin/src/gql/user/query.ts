import gql from "graphql-tag"

// GetAllFriends

export const GET_ALL_FRIENDS= gql`
	query GetAllFriends($email: String!) {
		GetAllFriends(email: $email){
		count
		email
		username
		avatar
		id
		isConnected
	}
}`

export const GET_ALL_STREAMING = gql`
	query GetStreaming($uid: String!) {
		GetStreaming(uid: $uid){
		count
		email
		id
	}
}`

export const GET_ALL_USER = gql`
	query GetUsers($idUserConnected: String!,$limit: Int!,$pageNumber:Int!) {
		GetUsers(idUserConnected: $idUserConnected,limit: $limit,pageNumber:$pageNumber){
		username
		avatar
		uid
		email
		created
	}
}`
