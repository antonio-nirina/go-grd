import gql from "graphql-tag"

export const CREATED_WAGGER = gql`
	mutation saveWagger(
		$date:String,
		$title:String,
		$description:String,
		$price:Float,
		$deadlineDate:String,
		$gameWay:String,
		$priceParticipate:Float,
		$format:String,
		$isPublic:Boolean
		){
		saveWagger(
			date:$date,
			title:$title,
			description:$description,
			price:$price,
			deadlineDate:$deadlineDate,
			gameWay:$gameWay,
			type:$entry,
			priceParticipate:$priceParticipate,
			isPublic:$isPublic,
			format:$format)
	}
`

