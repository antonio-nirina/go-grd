import gql from "graphql-tag"

export const GET_ALL_GAMES = gql`
	query FindAllGame {
		FindAllGame {
		uid
		image
		logo
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
		logo
	}
}`

export const GET_ALL_GAME_TWITCH = gql`
	query FindGameTwicth($nameGame: String) {
		FindGameTwicth(nameGame: $nameGame) {
			uid
			image
			logo
			slug
			name
	}
}`
