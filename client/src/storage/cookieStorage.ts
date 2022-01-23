import Cookies from 'js-cookie'
import { encodeCookieContent,decodeCookieContent } from '../views/auth/utils'

export const ACOUNT_Redirect = "account_redirect"
interface AccountRedirect {
	uidUser:string
	statut:boolean
}

export const SetAcountStorage = function(acount:AccountRedirect) {
	Cookies.set(ACOUNT_Redirect, encodeCookieContent(acount))
}

export const GetAcountStorage = function() {
	let data
	const cookie = Cookies.get(ACOUNT_Redirect)
	if(cookie) data = decodeCookieContent(cookie)

	return data
}
