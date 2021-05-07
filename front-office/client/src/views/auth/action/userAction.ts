export const USER_CONNECTED = "user_connected"

export const sendUserConectedAction = function(data:any) {
	return {
   		type:USER_CONNECTED,
   		res:data
 	}
}
