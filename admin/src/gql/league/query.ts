import gql from "graphql-tag"

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
		records
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