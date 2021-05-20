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
export const FORGOT_PASSWORD = gql`
	mutation forgotPassword($email:String) {
		forgotPassword(email:$email)
	}
`
