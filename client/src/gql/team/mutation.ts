import gql from "graphql-tag"

export const SAVED_NEW_TEAM = gql`
mutation createTeam(
	$name:String,
	$creationDate:String,
	$players:String,
	$creator:String,
	$tag:String,
	$description:String){
	createTeam(
		name:$name,
		creationDate:$creationDate,
		players:$players,
		creator:$creator,
		tag:$tag,
		description:$description) {
			uid
			name
			logo
			banniere
			creationDate
			description
			logo
			tag
			players{
				uid
				email
				username
				avatar
			}
			records
			creator{
				uid
				email
				username
				avatar
			}
		}
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
