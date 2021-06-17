import gql from "graphql-tag"

// GetAllNotification

export const GET_ALL_NOTIFICATIONS= gql`
	query GetAllNotifications($idUser: String!) {
		GetAllNotifications(idUser: $idUser){
		_id
		title
		content
		statut
		type
		user{
			email
			username
			avatar
		}
	}
}`
