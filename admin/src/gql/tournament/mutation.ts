import gql from "graphql-tag"

export const CREATED_TOURNAMENT = gql`
	mutation saveTournament(
		$date:String,
		$title:String,
		$uidGame:String,
		$uidPalteforme:String,
		$description:String,
		$numberParticipate:Int,
		$numberTeam:Int,
		$price:String,
		$deadlineDate:String,
		$priceParticipate:String,
		$laps:String,
		$server:String,
		$format:String,
		$spectateur:String,
		$region:String,
		$maps:String,
		$rules:String){
		saveTournament(
			date:$date,
			title:$title,
			uidGame:$uidGame,
			uidPalteforme:$uidPalteforme,
			description:$description,
			numberParticipate:$numberParticipate,
			numberTeam:$numberTeam,
			price:$price,
			rules:$rules,
			deadlineDate:$deadlineDate,
			laps:$laps,
			server:$server,
			format:$format,
			spectateur:$spectateur,
			region:$region,
			maps:$maps,
			priceParticipate:$priceParticipate)
	}
`

