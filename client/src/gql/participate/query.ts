import gql from "graphql-tag"

// GetAllNotification

export const GET_PART_USER = gql`
	query FindPartByUser($uidUser:String,$limit:Int!,$pageNumber:Int!) {
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
			team{
				uid
				players{
					uid
				}
			}
		}
	}`

export const GET_PART_TOURNAMENT = gql`
	query FindPartByUserTournament($uidUser: String,$uidTournament:String) {
		FindPartByUserTournament(uidUser: $uidUser,uidTournament:$uidTournament) {
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
				game{
					uid
				}
				plateform{
					uid
					name
				}
			}
			team{
				uid
				players{
					uid
				}
			}
		}
	}`

