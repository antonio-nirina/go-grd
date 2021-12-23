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

export const GET_ALL_BOARD_WEEK = gql`
query FindRateInWeek {
	FindRateInWeek{
		user{
			uid
			email
			username
			avatar
		}
		score
	}
}`
