import gql from "graphql-tag"



export const UPDATED_HOME_PAGE_CONTENT = gql`
	mutation updateHomeContent($uid:String){
		updateHomeContent(uid:$uid)
	}
`
export const CREATE_HOME_PAGE_CONTENT = gql`
	mutation
		createHome($homeInput:HomeInputType){
			createHome(homeInput:$homeInput)
		}

`
