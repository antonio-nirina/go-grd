import gql from "graphql-tag"

// GetAllNotification

export const GET_SUPPORT = gql`
	query FindOneSupport($uid:String) {
		FindOneSupport(uid:$uid){
			uid
			firstname
			lastname
			content

		}
	}`
