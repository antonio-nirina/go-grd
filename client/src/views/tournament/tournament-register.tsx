import React,{useEffect,useState, useMemo} from "react"
import {useMutation,useQuery} from "@apollo/client"
// import {useHistory } from "react-router-dom"
import { useSelector,useDispatch } from "react-redux"

import {SAVED_PART,LEAVE_PART_TOURNAMENT} from "../../gql/participate/mutation"
import {Translation} from "../../lang/translation"
import {RootState} from "../../reducer"
import {checkInTeam} from "../league/utils"
import {RegisterTournamentAction,Input} from "../tournament/action/tournamentAction"
import {Tournament} from "../models/tournament"
import {GET_RECORDS_PART} from "../../gql/participate/query"
import {GET_PART_USER_ALL} from "../../gql/participate/query"

export interface RegisterType {
	uid:string|null
	tournament:Tournament|undefined
	isUserSingup:Boolean
	part:string
	isOpen:Boolean
	numberPart:number
	confirmed:number
}

// Isopen close Register
const RegisterTournament: React.FC<RegisterType> = function({tournament,uid,isUserSingup,part,isOpen,numberPart,confirmed}) {
	const dispatch = useDispatch()
	// const history = useHistory()
	const [isAuthorize,setIsAuthorize] = useState<boolean>(true)
	const [isPartTournament,setIsPartTournament] = useState<boolean>(false)
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const userSingupTournament = useSelector((state:RootState) => state.tournamentSingin)
	// let message:string = Translation(userConnectedRedux.user.language).tournament.notify ?? ""
	const [savedPartTournament]  = useMutation(SAVED_PART)
	const [leavePartTournament]  = useMutation(LEAVE_PART_TOURNAMENT)

	const {loading,error,data} 	= useQuery(GET_RECORDS_PART, {
		variables: {
			uid:uid,
		},
	})

	const {loading:loadingUserPart,error:errorUserPart,data:dataUserPart} = useQuery(GET_PART_USER_ALL, {
		variables: {
			uidUser:userConnectedRedux.user.uid,
			limit:0,
			pageNumber:0,
		},
	})

	useEffect(()=>{
		if(!loading && !error && data) {
			dispatch(RegisterTournamentAction(
				{
					uidTournament:uid,
					userUid:userConnectedRedux.user.uid,
					part:isUserSingup?true:false,
					numberPart:data.FindPartCount.recordsPart,
					confirmed:data.FindPartCount.recordsConfirmed?data.FindPartCount.recordsConfirmed:0
				}
			)
			)
		}

		if(!loadingUserPart && !errorUserPart && dataUserPart) {
			let dateInit = new Date()
			dataUserPart.FindPartByUser.forEach(function(el:any,index:number) {
				let dateNext
				dateNext = new Date(el.date).getTime() - dateInit.getTime()
				const diffDate = new Date(dateNext)
				if((diffDate.getUTCDate() - 1 > 0) || (diffDate.getHours() < 3)) {
					setIsAuthorize(false)
				}
			})
		}
	},[isUserSingup,uid,userConnectedRedux,dispatch,loading,error,data,loadingUserPart,errorUserPart,dataUserPart])

	useMemo(()=> {
		if(userSingupTournament.tournament.length > 0) {
			userSingupTournament.tournament.forEach(function(e:Input) {
				if(e.uidTournament === uid && e.userUid === userConnectedRedux.user.uid && e.part) setIsPartTournament(true)
			})
		}
	},[userSingupTournament,userConnectedRedux,uid,setIsPartTournament])
	const leaveTournament = async function(){
		if(part) {
			const leav = await leavePartTournament({ variables: { uid: part} })
			if(leav.data.removePartTournament) {
				const param:Input = {
					uidTournament:uid,
					userUid:userConnectedRedux.user.uid,
					part:false,
					numberPart:leav.data.removePartTournament,
					confirmed:0
				}
				dispatch(RegisterTournamentAction(param))
			}
		}
	}

	const notify = async function(){
		let isError:boolean = false

		if(tournament?.isTeam) {
			const check = await checkInTeam(userConnectedRedux.user.uid)
			if(!check) {
				isError = true
				// message = Translation(userConnectedRedux.user.language).tournament.notifyError
			}
		}

		if(!isError) {
			const saved = await savedPartTournament({ variables: { uidUser: userConnectedRedux.user.uid,date:(new Date().toLocaleString()),tournamentUid:uid,teamsUid:{uid:[]} } })

			if(saved.data.createPartMatch) {
				let sumPart = 0
				userSingupTournament.tournament.forEach(function(e:Input){
					sumPart = sumPart + e.numberPart
				})
				const param:Input = {
					uidTournament:uid,
					userUid:userConnectedRedux.user.uid,
					part:true,
					numberPart:sumPart+parseInt(saved.data.createPartMatch),
					confirmed:0
				}
				dispatch(RegisterTournamentAction(param))
			}
		}
	}

	return (
		<>
			{isPartTournament  ?
				<button className="btn light-blue" onClick={leaveTournament}>
					{
						Translation(userConnectedRedux.user.language).tournament.cancelParticipate
					}
				</button>
				:
				<button className="btn bg-red" onClick={notify} disabled={isAuthorize ? false : true}>
					{
						Translation(userConnectedRedux.user.language).tournament.participate
					}
				</button>
			}
			{!isAuthorize ? <div style={{"color":"#dd0000","fontWeight":"bold"}}>{Translation(userConnectedRedux.user.language).tournament.notAUthorizePart}</div> : <></>}
		</>
	)
}

export default RegisterTournament

