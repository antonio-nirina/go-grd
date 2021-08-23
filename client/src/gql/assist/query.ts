import gql from "graphql-tag"

export const GET_ALL_ASSIST= gql`
	query FindAllAsist {
		FindAllAsist{
		uid
		title{
			uid
			title
			description
		}
		content
		underTitle
		statut
	}
}`

export const GET_ONE_ASSIST= gql`
	query FindOneAsist($uid: String!) {
		FindOneAsist(uid: $uid){
		uid
		title{
			uid
			title
			description
		}
		content
		underTitle
		statut
	}
}`
