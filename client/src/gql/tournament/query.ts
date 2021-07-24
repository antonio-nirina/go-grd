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
		numberTeam
		deadlineDate
		date
		price
		priceParticipate
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
		numberParticipate
		numberTeam
		deadlineDate
		date
		price
		priceParticipate
		rules
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
	query FindTournamentByGame($uidGame: String!,$limit: Int!,$pageNumber:Int!) {
		FindTournamentByGame(uidGame: $uidGame,limit: $limit,pageNumber:$pageNumber){
		uid
		title
		statut
		description
		numberParticipate
		numberTeam
		deadlineDate
		date
		price
		priceParticipate
		rules
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
