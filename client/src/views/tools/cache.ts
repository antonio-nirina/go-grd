import {createApolloClient as client} from "../../config/apollo-client"
import { TeamModel } from "../models/team"
import {GET_ONE_TEAM} from "../../gql/team/query"

export const UpdatedCacheTeam =  function(data:TeamModel) {
	try {
		client().writeQuery({
			query: GET_ONE_TEAM,
			data
		})
		client().readQuery({
			query:GET_ONE_TEAM
		})
	} catch(err:unknown) {

	}
}
