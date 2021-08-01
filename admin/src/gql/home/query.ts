import gql from "graphql-tag"

export const GET_ALL_HOME= gql`
	query FindAllHome {
		FindAllHome{
		uid
		title
		content
		location
		statut
		underTitle
	}
}`

export const GET_ONE_HOME = gql`
	query FindOneHome($uid: String!) {
		FindOneHome(uid: $uid){
		uid
		title
		content
		location
		statut
		underTitle
	}
}`
