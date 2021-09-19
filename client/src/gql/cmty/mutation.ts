import gql from "graphql-tag"

export const CREATE_PUBLICATION = gql`
	mutation createPublication($uidUser:String,$title:String,$content:String,$imageType:String,$files:String){
		createPublication(uidUser:$uidUser,title:$title,content:$content,imageType:$imageType,files:$files)
	}
`
