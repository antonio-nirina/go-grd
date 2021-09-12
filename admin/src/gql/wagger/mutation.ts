import gql from "graphql-tag"

export const CREATED_WAGGER = gql`
	mutation createWagger(
		$date:String,
		$title:String,
		$description:String,
		$price:Float,
		$deadlineDate:String,
		$gameWay:String,
		$priceParticipate:Float,
		$format:String,
		$isPublic:Boolean
		$participant:Int
		){
		createWagger(
			date:$date,
			title:$title,
			description:$description,
			price:$price,
			deadlineDate:$deadlineDate,
			gameWay:$gameWay,
			priceParticipate:$priceParticipate,
			isPublic:$isPublic,
			participant:$participant,
			format:$format)
	}
`

