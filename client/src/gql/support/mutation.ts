import gql from "graphql-tag"

export const SAVED_SUPPORT = gql`
	mutation createSupport($created:String,$updated:String,$firstname:String,$lastname:String,$content:String){
		createSupport(created:$created,updated:$updated,firstname:$firstname,lastname:$lastname,content:$content)
}`
