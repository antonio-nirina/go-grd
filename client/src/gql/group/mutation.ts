import gql from "graphql-tag"

export const CREATE_GROUP = gql`
	mutation saveGroup($idUsers:uidGroupUser,$lead:String,$subject:String){
		saveGroup(idUsers:$idUsers,lead:$lead,subject:$subject)
	}
`
