import {createApolloClient as client} from "../../config/apollo-client"
import {GET_ALL_USER_FILTER} from "../../gql/user/query"
import {User} from "../models/tournament"


export const GetUserFilter = async function(username:string) : Promise<User[]|null> {
	try {
		const data = await client().query({query:GET_ALL_USER_FILTER,variables:{username:username}})
		if(data) {
			return data.data.GetUserByUsername
		}
	} catch(errors) {
		console.log("errors_user_connected", errors)
	}

	return null
}
