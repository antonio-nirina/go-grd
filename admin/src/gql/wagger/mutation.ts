import gql from "graphql-tag"

export const CREATED_WAGGER = gql`
	mutation createWagger(
		$date:String,
		$title:String,
		$description:String,
		$uidGame:String,
		$uidPalteforme:String,
		$price:String,
		$deadlineDate:String,
		$gameWay:String,
		$priceParticipate:String,
		$format:String,
		$isPublic:Boolean
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
			rules:$rules,
			format:$format)
	}
`

