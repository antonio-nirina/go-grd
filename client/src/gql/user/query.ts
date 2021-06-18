import gql from "graphql-tag"

// GetAllFriends

export const GET_ALL_FRIENDS= gql`
	query GetAllFriends($email: String!) {
		GetAllFriends(email: $email){
		count
		email
		id
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
	query GetUsers($idUserConnected: String!) {
		GetUsers(idUserConnected: $idUserConnected){
		username
		avatar
		uid
		email
	}
}`
