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
export const UPDATE_PASSWORD = gql`
	mutation updatedPasswordUser($token:String,$newPassword:String) {
		updatedPasswordUser(token:$token,newPassword:$newPassword)
	}
`
export const UPDATE_AVATAR = gql`
	mutation updatedAvatar($avatarInput:userAvatarType) {
		updatedAvatar(avatarInput:$avatarInput){
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

export const INCOMING_FRIENDS = gql`
	mutation requestFriend($idRequest:String,$idSender:String) {
		requestFriend(idRequest:$idRequest,idSender:$idSender)
	}
`

export const ACCETEPED_FRIENDS = gql`
	mutation AcceptedRequestFriend($idRequest:String,$idSender:String) {
		AcceptedRequestFriend(idRequest:$idRequest,idSender:$idSender)
	}
`
export const UPDATED_USER_GAME = gql`
	mutation updatedGameUser($games:GameInputType,$plateforms:GameInputType,$uidUser:String) {
		updatedGameUser(games:$games,plateforms:$plateforms,uidUser:$uidUser)
	}
`