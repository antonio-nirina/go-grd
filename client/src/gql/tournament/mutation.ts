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
		$price:Float,
		$deadlineDate:String,
		$priceParticipate:Float,
		$rules:String){
		saveTournament(
			title:$title,
			uidGame:$uidGame,
			uidPalteforme:$uidPalteforme,
			description:$description,
			numberParticipate:$numberParticipate,
			numberTeam:$numberTeam,
			price:$price,
			rules:$rules,
			deadlineDate:$deadlineDate,
			priceParticipate:$priceParticipate)
	}
`

