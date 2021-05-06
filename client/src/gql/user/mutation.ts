import gql from "graphql-tag"


export const CREATED_USER = gql`
	mutation createdUser($userInput: userInputType) {
		createdUser(userInput: $userInput){
		uid
		email
	}
}
`
