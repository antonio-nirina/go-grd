import gql from "graphql-tag"

export const SAVED_NEW_TEAM = gql`
mutation createTeam(
	$name:String,
	$creationDate:String,
	$players:String,
	$logo:String,
	$creator:String,
	$tag:String,
	$bann:String,
	$bannType:String,
	$logoType:String,
	$description:String){
	createTeam(
		name:$name,
		creationDate:$creationDate,
		players:$players,
		logo:$logo,
		creator:$creator,
		tag:$tag,
		bann:$bann,
		bannType:$bannType,
		description:$description,
		logoType:$logoType)
	}
`

export const UPDATED_ALL_TEAM = gql`
mutation updatedAllTeam(
	$name:String,
	$creationDate:String,
	$players:String,
	$logo:String,
	$creator:String,
	$tag:String,
	$logoType:String,
	$bann:String,
	$bannType:String,
	$description:String){
	createTeam(
		name:$name,
		bann:$bann,
		bannType:$bannType,
		creationDate:$creationDate,
		players:$players,
		logo:$logo,
		creator:$creator,
		tag:$tag,
		description:$description,
		logoType:$logoType)
	}
`
