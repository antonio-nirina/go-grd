import gql from "graphql-tag"

export const CREATED_LEAGUE = gql`
	mutation saveLeague(
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
		$numberGroup:Int,
		$organizer:String,
		$rules:String){
		saveLeague(
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
			numberGroup:$numberGroup,
			organizer:$organizer,
			priceParticipate:$priceParticipate)
	}
`
