import gql from "graphql-tag"

export const CREATED_WAGGER = gql`
	mutation createWagger(
		$date:String,
		$title:String,
		$description:String,
		$uidGame:String,
		$uidPalteforme:String,
		$price:Float,
		$deadlineDate:String,
		$gameWay:String,
		$priceParticipate:Float,
		$format:String,
		$isPublic:Boolean
		$participant:Int
		$rules:String
		){
		createWagger(
			date:$date,
			title:$title,
			description:$description,
			uidGame:$uidGame,
			uidPalteforme:$uidPalteforme,
			price:$price,
			deadlineDate:$deadlineDate,
			gameWay:$gameWay,
			priceParticipate:$priceParticipate,
			isPublic:$isPublic,
			participant:$participant,
			rules:$rules,
			format:$format)
	}
`

