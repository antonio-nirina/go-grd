import gql from "graphql-tag"

// GetAllNotification

export const GET_ALL_TOURNAMENT= gql`
	query FindAllTournament($limit: Int!,$pageNumber:Int!) {
		FindAllTournament(limit: $limit,pageNumber:$pageNumber){
		uid
		title
		statut
		description
		numberParticipate
		deadlineDate
		dateStart
		price
		priceParticipate
		isPublic
		spectateur
		laps
		game{
			uid
			name
			image
			logo
			slug
		}
		plateform{
			uid
			description
			name
		}
	}
}`

export const GET_ONE_TOURNAMENT = gql`
	query FindOneTournament($uid: String!) {
		FindOneTournament(uid: $uid){
		uid
		title
		statut
		description
		deadlineDate
		dateStart
		price
		priceParticipate
		numberParticipate
		rules
		laps
		gameWay
		spectateur
		game{
			uid
			name
			image
			logo
			slug
		}
		plateform{
			uid
			description
			name
		}
	}
}`

export const GET_TOURNAMENT_GAME = gql`
	query FindTournamentByGame($slugGame: String!,$limit: Int!,$pageNumber:Int!) {
		FindTournamentByGame(slugGame: $slugGame,limit: $limit,pageNumber:$pageNumber){
		uid
		title
		statut
		description
		numberParticipate
		deadlineDate
		dateStart
		price
		priceParticipate
		rules
		isPublic
		spectateur
		laps
		game{
			uid
			name
			image
			logo
			slug
		}
		plateform{
			uid
			description
			name
		}
	}
}`
