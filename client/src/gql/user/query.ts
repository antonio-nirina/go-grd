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
