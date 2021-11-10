import gql from "graphql-tag"

export const CREATED_TOURNAMENT = gql`
	mutation saveTournament(
		$date:String,
		$title:String,
		$uidGame:String,
		$uidPalteforme:String,
		$description:String,
		$numberParticipate:Int,
		$price:String,
		$deadlineDate:String,
		$priceParticipate:String,
		$laps:String,
		$server:String,
		$format:String,
		$spectateur:String,
		$region:String,
		$maps:String,
		$isPublic:Boolean,
		$isTeam:Boolean,
		$gameWay:String,
		$rules:String){
		saveTournament(
			date:$date,
			title:$title,
			uidGame:$uidGame,
			uidPalteforme:$uidPalteforme,
			description:$description,
			numberParticipate:$numberParticipate,
			price:$price,
			rules:$rules,
			deadlineDate:$deadlineDate,
			laps:$laps,
			server:$server,
			format:$format,
			spectateur:$spectateur,
			region:$region,
			gameWay:$gameWay,
			maps:$maps,
			isTeam:$isTeam,
			isPublic:$isPublic,
			priceParticipate:$priceParticipate)
	}
`

