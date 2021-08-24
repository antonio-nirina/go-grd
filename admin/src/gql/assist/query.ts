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

export const GET_ALL_SUBJECT= gql`
	query FindAllSubject {
		FindAllSubject{
		uid
		title
		description
		statut
	}
}`

export const GET_ONE_SUBJECT= gql`
	query FindOneSubject($uid: String!) {
		FindOneSubject(uid: $uid){
		uid
		title
		description
		statut
	}
}`
