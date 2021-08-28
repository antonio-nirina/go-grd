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
		organizer
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
		organizer
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
