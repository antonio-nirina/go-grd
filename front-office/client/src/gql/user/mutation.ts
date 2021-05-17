import gql from "graphql-tag"


export const CREATED_USER = gql`
	mutation createdUser($userInput: userInputType) {
		createdUser(userInput: $userInput){
		uid
		email
	}
}
`
export const UPDATED_USER = gql`
	mutation updatedUser($userUpated: userUpdatedType) {
		updatedUser(userUpated: $userUpated){
			firstname
			email
			language
			lastname
			username
			created
			avatar
	}
}
`
