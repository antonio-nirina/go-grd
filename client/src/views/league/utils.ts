import {createApolloClient as client} from "../../config/apollo-client"
import {GET_ONE_TEAM_BY_USER} from "../../gql/team/query"

export const checkInTeam = async function(userId:string) {
	try {
		const data = await client().query({query:GET_ONE_TEAM_BY_USER,variables:{uid:userId}})
		return data.data.FindTeamByUser ? true : false
	} catch(errors) {
		console.log("errors_user_connected", errors)
	}

	return false
}
