import gql from "graphql-tag"

// GetAllNotification

export const GET_ALL_NOTIFICATIONS= gql`
	query GetAllNotifications($idUser: String!) {
		GetAllNotifications(idUser: $idUser){
		_id
		uid
		title
		content
		type
		statut
		user{
			uid
			email
			username
			avatar
		}
		userRequest{
			uid
			email
			username
			avatar
		}
	}
}`
