import gql from "graphql-tag"

export const CREATE_PUBLICATION = gql`
	mutation createPost($uidUser:String,$title:String,$content:String,$imageType:String,$files:String,$date:String){
		createPost(uidUser:$uidUser,title:$title,content:$content,imageType:$imageType,files:$files,date:$date)
	}
`
