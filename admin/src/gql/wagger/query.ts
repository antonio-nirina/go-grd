import gql from "graphql-tag"

// GetAllNotification

export const GET_ALL_WAGER = gql`
	query FindAllWager($limit: Int!,$pageNumber:Int!) {
		FindAllWager(limit: $limit,pageNumber:$pageNumber){
			date,
			title,
			description,
			price,
			deadlineDate,
			gameWay,
			entry,
			priceParticipate,
			format
			statut
	}
}`
