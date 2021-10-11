import gql from "graphql-tag"

export const CREATE_PUBLICATION = gql`
	mutation createPublication($streaming:[StreamingInput],$uidGame:String){
		createPublication(streaming:$streaming,uidGame:$uidGame)
	}
`
