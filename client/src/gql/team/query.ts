import gql from "graphql-tag"

export const GET_ALL_TEAMS = gql`
	query FindAllTeam($limit: Int!,$pageNumber:Int!) {
		FindAllTeam(limit: $limit,pageNumber:$pageNumber) {
		uid
		name
		logo
		creationDate
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
	query FindTeamByUser($idUser: String!) {
		FindTeamByUser(idUser: $idUser) {
		uid
		name
		logo
		creationDate
		creator{
			uid
			email
			username
			avatar
		}
	}
}`
