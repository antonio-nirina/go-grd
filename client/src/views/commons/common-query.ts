import {createApolloClient as client} from "../../config/apollo-client"
import {GET_ALL_USER_FILTER} from "../../gql/user/query"
import {User} from "../models/tournament"
import {GET_ONE_TEAM_BY_USER,GET_PART_TEAM_Tournament} from "../../gql/team/query"
import { ParticipateTournament } from "../models/participate"
import {TeamModel} from "../models/team"

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

export const GetTeamUser = async function(uid:string,uidTournament:string) : Promise<TeamModel|undefined> {
	try {
		const data = await client().query({query:GET_ONE_TEAM_BY_USER,variables:{uid:uid}})
		const partTeam = await client().query({query:GET_PART_TEAM_Tournament,variables:{uid:uidTournament}})
		if(data && partTeam) {
			let teamUser:TeamModel|undefined

			for (let index = 0; index < partTeam.data.FindTournamentParticipate.length; index++) {
				for (let k = 0; k < data.data.FindTeamByUser.length; k++) {
					if(partTeam.data.FindTournamentParticipate[index].team.uid === data.data.FindTeamByUser[k].uid) {
						teamUser = data.data.FindTeamByUser[k]
						break
					}
				}

			}
			return teamUser
		}
	} catch(errors) {
		console.log("errors_user_connected", errors)
	}
}
