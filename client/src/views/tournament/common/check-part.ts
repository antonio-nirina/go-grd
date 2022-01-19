import {createApolloClient as client} from "../../../config/apollo-client"
import {GET_PART_ONE_TOURNAMENT} from "../../../gql/participate/query"
import {ParticipateTournament} from "../../models/participate"

export const CheckPartTournament = async function(uidTournament:string,userUid:string) {
	try {
		let isPart = false
		const result = await client().query({query:GET_PART_ONE_TOURNAMENT,variables:{uid:uidTournament}})
		const tournament = result.data.FindTournamentParticipate[0].tournament
		result.data.FindTournamentParticipate?.forEach(function(part:ParticipateTournament){
			if(part.user.uid === userUid) {
				isPart = true
			}
		})
		// check part user_connected if in Team part this tournament
		result.data.FindTournamentParticipate?.forEach(function(part:ParticipateTournament){
			if(tournament?.isTeam && part.user.uid === userUid) {
				isPart = true
			}
		})
		return isPart
	} catch(errors) {
		console.log("errors_user_connected", errors)
	}
}
