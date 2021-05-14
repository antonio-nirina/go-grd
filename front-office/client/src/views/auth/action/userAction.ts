import jwt from "jsonwebtoken"
import {ACCESS_TOKEN} from "../utils"

export const USER_CONNECTED = "user_connected"

export interface UserType {
	username:string|""
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

export const sendUserConnectedXboxAction = function(user:any) {
	const newUserObject:UserType = {
		username:user.Username,
		email:user.Email,
		avatar:"",
		roles:[],
		firstname:user.Surname,
		language:user.PreferredLanguage,
		lastname:user.DisplayName,
		isBaned:false,
		id:user.Id
	}
	return {
		type:USER_CONNECTED,
		res:newUserObject??""
  	}
}

export const changeLanguageUserConnected = function(user:UserType,lang:string) {
	const newUserObject:UserType = {
		username:user.username,
		email:user.email,
		avatar:user.avatar,
		roles:user.roles,
		firstname:user.firstname,
		language:lang,
		lastname:user.lastname,
		isBaned:user.isBaned,
		id:user.id
	}
	return {
		type:USER_CONNECTED,
		res:newUserObject??""
  	}
}

export const sendProfilXboxOrPsn = function(user:UserType) {
	return {
		type:USER_CONNECTED,
		res:user??""
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
