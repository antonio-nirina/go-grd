import {createApolloClient as client} from "../../config/apollo-client"
import {GET_ONE_TEAM_BY_USER,GET_PART_TEAM_Tournament} from "../../gql/team/query"
import {TeamModel} from "../models/team"
import {SAVED_PART} from "../../gql/participate/mutation"
import { ParticipateTournament } from "../models/participate"

export interface PartTournament  {
	uidUser:string
	date:string
	tournamentUid:string
	teamsUid:string
}


export const checkInTeam = async function(uidTournament:string|undefined,userId:string) : Promise<number|null> {
	let count:number = 0

	try {
		const data = await client().query({query:GET_ONE_TEAM_BY_USER,variables:{uid:userId}})
		const partTeam = await client().query({query:GET_PART_TEAM_Tournament,variables:{uid:uidTournament}})
		if(data && partTeam) {
			let isPart = false
			let uidTeam:string[] 		= []
			let uidTeamPart:string[] 	= []

			data.data.FindTeamByUser.forEach(function(part:TeamModel){
				uidTeam.push(part.uid)
				for (let index = 0; index < part.players.length; index++) {
					count++
				}
			})
			partTeam.data.FindTournamentParticipate.forEach(function(element:ParticipateTournament) {
				uidTeamPart.push(element.team.uid)
			})
			uidTeamPart.forEach(function(uid:string){
				if(uidTeam.includes(uid)){
					isPart = true
				}
			})

			if(count > 0 && isPart){
				count = 2
			}

			return count
		}
	} catch(errors) {
		console.log("errors_user_connected", errors)
	}

	return null
}

export const GetTeamUtils = async function(userId:string): Promise<TeamModel[]|null>{
	try {
		const data = await client().query({query:GET_ONE_TEAM_BY_USER,variables:{uid:userId}})

		if(data) {
			return data.data.FindTeamByUser
		}
	} catch(errors) {
		console.log("errors_user_connected", errors)
	}
	return null
}

export const SavedPartTournament = async function(variable:PartTournament) : Promise<number> {
	try {
		const data = await client().mutate({mutation:SAVED_PART,variables:variable})
		if(data) {
			return data.data.createPartMatch
		}
	} catch (error) {
		console.log("errors_user_connected", error)
	}
	return 0
}
