import gql from "graphql-tag"

// GetAllNotification

export const GET_PART_USER = gql`
	query FindPartByUser($uidUser:String,$limit:Int!,$pageNumber:Int!) {
		FindPartByUser(uidUser:$uidUser,limit: $limit,pageNumber:$pageNumber){
			uid
			date
			isWin
			user{
				uid
				username
				avatar
			}

			tournament{
				uid
				title
				dateStart
				deadlineDate
				price
				gameWay
				format
				numberParticipate
				plateform{
					uid
					name
				}
				game{
					uid
					name
					logo
				}
			}
			team{
				uid

			}
		}
	}`

export const GET_PART_TOURNAMENT = gql`
	query FindPartByUserTournament($uidUser: String,$uidTournament:String) {
		FindPartByUserTournament(uidUser: $uidUser,uidTournament:$uidTournament) {
			uid
			date
			isWin
			user{
				uid
				username
				avatar
			}
			tournament{
				uid
				title
				statut
				description
				deadlineDate
				dateStart
				price
				priceParticipate
				rules
				laps
				isTeam
				isPublic
				gameWay
				numberParticipate
				spectateur
				server
				format
				game{
					uid
					name
					image
					logo
					slug
				}
				plateform{
					uid
					description
					name
				}
			}
		}
	}`

export const GET_RECORDS_PART = gql`
	query FindPartCount($uid: String) {
		FindPartCount(uid: $uid) {
			recordsPart
			recordsConfirmed
		}
	}

`
export const GET_PART_USER_ALL = gql`
	query FindPartByUser($uidUser:String,$limit:Int,$pageNumber:Int) {
		FindPartByUser(uidUser:$uidUser,limit:$limit,pageNumber:$pageNumber) {
			uid
			date
			isWin
			user{
				uid
				username
				avatar
			}
		}
	}
`

export const GET_PART_USER_WAGGER = gql`
	query FindPartByUserWagger($uidUser: String,$uidWagger:String) {
		FindPartByUserWagger(uidUser: uidUser,uidWagger:$uidWagger) {
			uid
			date
			isWin
			user{
				uid
				username
				avatar
			}
			wagger{
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
	}
`
export const GET_PART_ALL_USER_WAGGER = gql`
query FindAllPart($limit:Int!,$pageNumber:Int!) {
	FindAllPart(limit: $limit,pageNumber:$pageNumber){
			uid
			date
			isWin
			user{
				uid
				username
				email
			}
			wagger{
				uid
				title
				date
				price
				game{
					uid
				}
				plateform{
					uid
					name
				}
			}
		}
	}
`
export const GET_PART_ONE_TOURNAMENT = gql`
	query FindTournamentParticipate($uid:String) {
		FindTournamentParticipate(uid:$uid){
			uid
			date
			isWin
			team{
				name
				tag
				uid
			}
			user{
				uid
				username
				avatar
			}
			tournament{
				uid
				title
				statut
				description
				deadlineDate
				dateStart
				price
				priceParticipate
				rules
				laps
				isTeam
				isPublic
				gameWay
				numberParticipate
				spectateur
				server
				format
				game{
					uid
					name
					image
					logo
					slug
				}
				plateform{
					uid
					description
					name
				}
			}
		}
	}`

	export const GET_TOURNAMENT_PART = gql`
		query FindPartAllTournament{
			FindPartAllTournament{
				tournament{
					uid
					title
					statut
					description
					numberParticipate
					deadlineDate
					dateStart
					gameWay
					price
					priceParticipate
					isPublic
					isTeam
					spectateur
					laps
					game{
						uid
						name
						image
						logo
						slug
					}
				}
				recordsPart
			}
		}
	`
