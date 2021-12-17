import gql from "graphql-tag"


export const CREATE_ASSIST = gql`
	mutation createAssistContent($title:String,$assistInput:[SubjectAssistInput]){
		createAssistContent(title:$title,assistInput:$assistInput)
	}
`

export const CREATE_SUBJECT = gql`
	mutation createSubjectContent($title:String,$description:String){
		createSubjectContent(title:$title,description:$description)
	}
`

