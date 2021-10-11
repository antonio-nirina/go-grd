import gql from "graphql-tag"

export const EDIT_STATUT_PUBLICATION  = gql`
	mutation EditStatutPublication($statut:Boolean,$uid:String){
		EditStatutPublication(statut:$statut,uid:$uid)
	}
`

export const CREATE_PUBLICATION = gql`
	mutation createPublication($streaming:[StreamingInput],$uidGame:String){
		createPublication(streaming:$streaming,uidGame:$uidGame)
	}
`

export const REMOVE_PUBLICATION = gql`
	mutation RemovePublication($uid:String){
		RemovePublication(uid:$uid)
	}
`
