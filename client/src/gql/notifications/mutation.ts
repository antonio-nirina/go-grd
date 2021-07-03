import gql from "graphql-tag"

export const UPDATED_NOTIFICATION = gql`
	mutation updateNotification($uid:String){
		updateNotification(uid:$uid) {
			title
			content
		}
	}
`
