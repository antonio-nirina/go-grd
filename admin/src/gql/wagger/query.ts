import gql from "graphql-tag"

// GetAllNotification

export const GET_ALL_WAGER = gql`
	query FindAllWagger($limit: Int!,$pageNumber:Int!) {
		FindAllWagger(limit: $limit,pageNumber:$pageNumber){
			date,
			title,
			description,
			price,
			deadlineDate,
			gameWay,
			priceParticipate,
			format
			statut
			participant
	}
}`
