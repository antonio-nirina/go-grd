import jwt from "jsonwebtoken"
import {ACCESS_TOKEN} from "../utils"

export const USER_CONNECTED = "user_connected"

export interface UserType {
	uid:string|""
	username:string|""
	email:string|""
	avatar:string|""
	firstname:string|""
	language:string|""
	lastname:string|""
	id:string|""
	created:string|""
}

export const sendUserConectedAction = function(data:string) {
	let tokenData = jwt.decode(data)

	return {
   		type:USER_CONNECTED,
   		res:tokenData??""
 	}
}

export const changeLanguageUserConnected = function(user:UserType,lang:string) {
	const newUserObject:UserType = {
		uid:user.uid,
		username:user.username,
		email:user.email,
		avatar:user.avatar,
		firstname:user.firstname,
		language:lang,
		lastname:user.lastname,
		id:user.id,
		created:user.created,
	}
	return {
		type:USER_CONNECTED,
		res:newUserObject??""
  	}
}

export const changeProfilUserConnected = function(user:any) {
	const newUserObject:UserType = {
		uid:user.uid,
		username:user.username,
		email:user.email,
		avatar:user.avatar,
		firstname:user.firstname,
		language:user.language,
		lastname:user.lastname,
		id:user.id,
		created:user.created
	}
	return {
		type:USER_CONNECTED,
		res:newUserObject??""
  	}
}

export const removeDataUser = function() {
	localStorage.removeItem(ACCESS_TOKEN)
	localStorage.removeItem("userConnected")
	return {
		type:USER_CONNECTED,
		res:{}
  	}
}
