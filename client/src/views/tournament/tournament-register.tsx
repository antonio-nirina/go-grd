import React,{useEffect} from "react"
import {useMutation} from "@apollo/client"
import {useHistory } from "react-router-dom"
import { useSelector,useDispatch } from "react-redux"

import {SAVED_PART,LEAVE_PART_TOURNAMENT} from "../../gql/participate/mutation"
import {Translation} from "../../lang/translation"
import {RootState} from "../../reducer"
import {checkInTeam} from "../league/utils"
import {RegisterTournamentAction,Input} from "../tournament/action/tournamentAction"
import {Tournament} from "../models/tournament"

export interface RegisterType {
	uid:string|null
	tournament:Tournament|undefined
	isUserSingup:Boolean
	part:string
}

const RegisterTournament: React.FC<RegisterType> = function({tournament,uid,isUserSingup,part}) {
	const dispatch = useDispatch()
	const history = useHistory()
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const userSingupTournament = useSelector((state:RootState) => state.tournamentSingin)
	// let message:string = Translation(userConnectedRedux.user.language).tournament.notify ?? ""
	const [savedPartTournament]  = useMutation(SAVED_PART)
	const [leavePartTournament] = useMutation(LEAVE_PART_TOURNAMENT)

	useEffect(()=>{
		dispatch(RegisterTournamentAction({
			uidTournament:uid,
			userUid:userConnectedRedux.user.uid,
			part:isUserSingup?true:false
		}))
	},[isUserSingup])

	const leaveTournament = async function(){
		const param:Input = {
			uidTournament:uid,
			userUid:userConnectedRedux.user.uid,
			part:false
		}

		if(part) {
			dispatch(RegisterTournamentAction(param))
			// await leavePartTournament({ variables: { uid: part} })
		}
	}

	const notify = async function(){
		let isError:boolean = false
		const param:Input = {
			uidTournament:uid,
			userUid:userConnectedRedux.user.uid,
			part:true
		}

		if(tournament?.isTeam) {
			const check = await checkInTeam(userConnectedRedux.user.uid)
			if(!check) {
				isError = true
				// message = Translation(userConnectedRedux.user.language).tournament.notifyError
			}
		}

		if(!isError) {
			const saved = await savedPartTournament({ variables: { uidUser: userConnectedRedux.user.uid,date:(new Date().toLocaleString()),tournamentUid:uid,teamsUid:{uid:[]} } })
			dispatch(RegisterTournamentAction(param))
			if(saved.data.createPartMatch) history.push(`/info?uid=${uid}`)
		}
	}

	return (
		<>
			{userSingupTournament.tournament.part  ?
				<button className="btn light-blue" onClick={leaveTournament}>
					{
						Translation(userConnectedRedux.user.language).tournament.cancelParticipate
					}
				</button>
				:
				<button className="btn bg-red" onClick={notify}>
					{
						Translation(userConnectedRedux.user.language).tournament.participate
					}
				</button>
			}
		</>
	)
}

export default RegisterTournament
