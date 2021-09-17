import gql from "graphql-tag"

// GetAllNotification

export const GET_ALL_WAGER = gql`
	query FindAllWagger($limit: Int!,$pageNumber:Int!) {
		FindAllWagger(limit: $limit,pageNumber:$pageNumber){
			uid
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
			isPublic
			records
			gameWay
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

export const GET_ONE_WAGGER = gql`
	query FindOneWagger($uid: String!) {
		FindOneWagger(uid: $uid){
			uid
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
			isPublic
			records
			rules
			gameWay
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
