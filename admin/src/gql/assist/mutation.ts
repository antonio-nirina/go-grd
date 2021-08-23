import gql from "graphql-tag"


export const CREATE_ASSIST = gql`
	mutation createAssistContent($underTitle:String,$location:String,$title:String,$content:String){
		createAssistContent(underTitle:$underTitle,location:$location,title:$title,content:$content)
	}
`

export const CREATE_SUBJECT = gql`
	mutation createSubjectContent($title:String,$description:String){
		createSubjectContent(title:$title,description:$description)
	}
`
