import gql from "graphql-tag"

// GetAllNotification

export const GET_ALL_LEAGUE = gql`
	query FindAllLeague($limit: Int!,$pageNumber:Int!) {
		FindAllLeague(limit: $limit,pageNumber:$pageNumber){
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
		isPublic
		numberGroup
		organizer
		isTeam
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

export const GET_ONE_LEAGUE = gql`
	query FindOneLeague($uid: String!) {
		FindOneLeague(uid: $uid){
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
		numberGroup
		organizer
		isTeam
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

export const GET_LEAGUE_GAME = gql`
	query FindLeagueByGame($slugGame: String!,$limit: Int!,$pageNumber:Int!) {
		FindLeagueByGame(slugGame: $slugGame,limit: $limit,pageNumber:$pageNumber){
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
		isPublic
		isTeam
		numberGroup
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
