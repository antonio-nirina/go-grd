import jwt from "jsonwebtoken"
import Cookies from 'js-cookie'

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

export const sendUserConnectedXboxAction = function(user:any) {
	const newUserObject:UserType = {
		uid:user.uid,
		username:user.Username,
		email:user.Email,
		avatar:"",
		firstname:user.Surname,
		language:user.PreferredLanguage,
		lastname:user.DisplayName,
		id:user.Id,
		created:user.created
	}
	return {
		type:USER_CONNECTED,
		res:newUserObject??""
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

export const sendProfilXboxOrPsn = function(user:UserType) {
	return {
		type:USER_CONNECTED,
		res:user??""
  	}
}

export const removeDataUser = function() {
	Cookies.remove(ACCESS_TOKEN)
	Cookies.remove("userConnected")
	// localStorage.removeItem(ACCESS_TOKEN)
	// localStorage.removeItem("userConnected")
	return {
		type:USER_CONNECTED,
		res:{}
  	}
}
