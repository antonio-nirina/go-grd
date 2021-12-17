import gql from "graphql-tag"

export const GET_ALL_ASSIST= gql`
	query FindAllAsist {
		FindAllAsist{
			uid
			title
			underTitle{
				title
				content
				tag
			}
			statut
	}
}`

export const GET_ONE_ASSIST= gql`
	query FindOneAsist($uid: String!) {
		FindOneAsist(uid: $uid){
			uid
			title
			underTitle{
				title
				content
				tag
			}
			statut
	}
}`



