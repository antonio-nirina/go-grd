import gql from "graphql-tag"

export const CREATE_PUBLICATION = gql`
	mutation createPublication($uidUser:String,$title:String,$content:String,$uidGame:String){
		createPublication(uidUser:$uidUser,title:$title,content:$content,uidGame:$uidGame)
	}
`
