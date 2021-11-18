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
		creator{
			uid
			email
			username
			avatar
		}
	}
}`


export const GET_ONE_TEAM = gql`
	query FindOneTeam($idTeam: String!) {
		FindOneTeam(idTeam: $idTeam) {
		uid
		name
		logo
		banniere
		creationDate
		creator{
			uid
			email
			username
			avatar
		}
	}
}`


export const GET_ONE_TEAM_BY_USER = gql`
	query FindTeamByUser($uid: String!) {
		FindTeamByUser(uid: $uid) {
		uid
		name
		logo
		creationDate
		players
		banniere
		creator{
			uid
			email
			username
			avatar
		}
	}
}`
