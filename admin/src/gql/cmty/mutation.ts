import gql from "graphql-tag"

export const CREATE_PUBLICATION = gql`
	mutation createPublication($uidUser:String,$title:String,$content:String){
		createPublication(uidUser:$uidUser,title:$title,content:$content)
	}
`
