import React,{useEffect,useState} from "react"
import {useQuery,useMutation} from "@apollo/client"
import { useSelector,useDispatch } from "react-redux"
import { ToastContainer, toast } from 'react-toastify'

import {SAVED_PART,LEAVE_PART_TOURNAMENT} from "../../gql/participate/mutation"
import {Translation} from "../../lang/translation"
import {RootState} from "../../reducer"
import {checkInTeam} from "../league/utils"
import {RegisterTournamentAction,Input} from "../tournament/action/tournamentAction"
import {Tournament} from "../models/tournament"

export interface RegisterType {
	uid:string|null
	tournament:Tournament|undefined
}

const RegisterTournament: React.FC<RegisterType> = function({tournament,uid}) {
	const dispatch = useDispatch()
	const [isUserSingup,setIsUserSingup] = useState<boolean>(false)
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const userSingupTournament = useSelector((state:RootState) => state.tournamentSingin)
	let message:string = Translation(userConnectedRedux.user.language).tournament.notify ?? ""

	const [savedPartTournament]  = useMutation(SAVED_PART)
	const [leavePartTournament] = useMutation(LEAVE_PART_TOURNAMENT)

	const leaveTournament = async function(){
		const param:Input = {
			uidTournament:uid,
			userUid:userConnectedRedux.user.uid,
			part:false
		}
		const messageLeave:string = Translation(userConnectedRedux.user.language).tournament.leave ?? ""
		// await leavePartTournament({ variables: { uid: part} })
		dispatch(RegisterTournamentAction(param))

		toast(messageLeave,{
			className: 'light-blue',
			position: "top-left",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		})
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
				message = Translation(userConnectedRedux.user.language).tournament.notifyError
			}
		}

		if(!isError) {
			await savedPartTournament({ variables: { uidUser: userConnectedRedux.user.uid,date:(new Date().toLocaleString()),tournamentUid:uid,teamsUid:{uid:[]} } })
			dispatch(RegisterTournamentAction(param))
		}

		toast(message,{
			className: 'light-blue',
			position: "top-left",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		})
	}


	return (
		<>
			{!userSingupTournament.tournament.part && isUserSingup ?
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
