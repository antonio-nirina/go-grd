import gql from "graphql-tag"

export const GET_ALL_TEAMS = gql`
	query FindAllTeam($limit: Int!,$pageNumber:Int!) {
		FindAllTeam(limit: $limit,pageNumber:$pageNumber) {
			uid
			name
			logo
			banniere
			creationDate
			logo
			records
			tag
			creator
		}
	}
`


export const GET_ONE_TEAM = gql`
	query FindOneTeam($uid: String!) {
		FindOneTeam(uid: $uid) {
			uid
			name
			logo
			banniere
			tag
			players{
				uid
				email
				username
				avatar
			}
			creationDate
			creator
		}
	}

`


export const GET_ONE_TEAM_BY_USER = gql`
	query FindTeamByUser($uid: String!) {
		FindTeamByUser(uid: $uid) {
			uid
			name
			logo
			tag
			creationDate
			players{
				uid
				email
				username
				avatar
			}
			banniere
			creator
		}
	}
`

export const GET_PART_TEAM_Tournament = gql`
	query FindTournamentParticipate($uid: String!) {
		FindTournamentParticipate(uid:$uid){
			uid
			date
			user{uid}
			numberPartConfirmed
			tournament{uid}
			team{
				uid
				name
			}
			isWin
		}
	}
`
