import gql from "graphql-tag"

export const SAVED_NEW_TEAM = gql`
mutation createTeam($name:String,$creationDate:String,$players:[String],$logo:String,$creator:String,$tag:String,$description:String){
	createTeam(name:$name,creationDate:$creationDate,players:$players,logo:$logo,creator:$creator,tag:$tag,description:$description)
	}
`
