import gql from "graphql-tag"


export const CREATE_ASSIST = gql`
	mutation createAssistContent($underTitle:String,$location:String,$title:String,$content:String){
		createHomeContent(underTitle:$underTitle,location:$location,title:$title,content:$content)
	}
`
