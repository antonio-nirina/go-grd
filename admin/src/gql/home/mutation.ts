import gql from "graphql-tag"

export const CREATE_HOME_PAGE_CONTENT = gql`
	mutation createHomeContent($underTitle:String,$location:String,$title:String,$content:String){
		createHomeContent(underTitle:$underTitle,location:$location,title:$title,content:$content)
	}
`

export const UPDATED_HOME_PAGE_CONTENT = gql`
	mutation updateHomeContent($uid:String){
		updateHomeContent(uid:$uid)
	}
`
export const CREATE_PAGE_ASSIST = gql`
	mutation
		createHome($homeInput:HomeInputType){
			createHome(homeInput:$homeInput)
		}

`
