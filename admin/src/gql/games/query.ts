import gql from "graphql-tag"

export const GET_ALL_GAMES = gql`
	query FindAllGame {
		FindAllGame {
		uid
		image
		logo
		notes
		slug
		name
	}
}`


export const GET_ALL_PLATEFORM = gql`
	query FindAllPlateform {
		FindAllPlateform {
		uid
		description
		name
	}
}`
