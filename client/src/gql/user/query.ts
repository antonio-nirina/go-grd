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

export const GET_ALL_USER = gql`
	query GetUsers($idUserConnected: String!,$limit: Int!,$pageNumber:Int!) {
		GetUsers(idUserConnected: $idUserConnected,limit: $limit,pageNumber:$pageNumber){
		username
		avatar
		uid
		email
	}
}`

export const GET_GAME_USER = gql`
	query GetGameOneUserQuery($uid: String!) {
		GetGameOneUserQuery(uid: $uid){
			uid
			email
			game {
				uid
				image
				logo
				slug
				name
			}
	}
}`

export const GET_ALL_USER_FILTER = gql`
	query GetUserByUsername($username: String!) {
		GetUserByUsername(username: $username){
		username
		avatar
		uid
	}
}`
