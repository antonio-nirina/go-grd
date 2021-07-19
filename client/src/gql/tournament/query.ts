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
