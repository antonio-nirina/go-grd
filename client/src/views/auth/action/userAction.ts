import jwt from "jsonwebtoken"

export const USER_CONNECTED = "user_connected"

export interface UserType {
	email:string|""
	avatar:string|""
	roles:Array<string>
	firstname:string|""
	language:string|""
	lastname:string|""
	isBaned:Boolean
	id:string|""
}

export const sendUserConectedAction = function(data:string) {
	let tokenData = jwt.decode(data)

	return {
   		type:USER_CONNECTED,
   		res:tokenData??""
 	}
}
