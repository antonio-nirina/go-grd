import gql from "graphql-tag"

// GetAllNotification

export const GET_PART_USER = gql`query FindPartByUser($uidUser:String,$limit: Int!,$pageNumber:Int!) {
		FindPartByUser(uidUser:$uidUser,limit: $limit,pageNumber:$pageNumber){
			uid
			date
			user{
				uid
				username
				avatar
			}
			tournament{
				uid
				title
				date
				plateform{
					uid
					name
				}
			}
		}
}`
