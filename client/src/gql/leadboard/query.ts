import gql from "graphql-tag"


export const GET_ALL_BOARD = gql`
query FindAllRate {
	FindAllRate{
		user{
			uid
			email
			username
			avatar
		}
		score
	}
}`
