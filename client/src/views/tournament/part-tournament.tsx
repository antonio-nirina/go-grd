import React,{useState,useEffect} from "react"
import {useMutation} from "@apollo/client"
import { useSelector } from "react-redux"
import {SAVED_PART,LEAVE_PART_TOURNAMENT} from "../../gql/participate/mutation"
import {Tournament} from "../models/tournament"
import {Team} from "../models/team"
import {ParticipateTournament} from "../models/participate"
import {RootState} from "../../reducer"
import {checkInTeam} from "../league/utils"
import {Translation} from "../../lang/translation"

export type PartTournamentType = {
	tournament:Tournament|undefined,
	parts:ParticipateTournament[]|undefined
}

const PartTournament:React.FC<PartTournamentType> = function ({tournament,parts}) {
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const [showClose, setShowClose] = useState(false)
	const [teamPart,setTeamPart] = useState<string>("")
	const [message,setMessage] = useState<string>("")
	const [teamUserPart,setTeamUserPart] = useState<string[]>([])

	useEffect(() => {
		if(tournament?.isTeam) {
			setTeamPart(`Equipes ${parts && parts?.length > 1 ? parts?.length : 0}/ ${tournament.numberParticipate}`)
		} else {
			setTeamPart("One to one")
		}
		if(parts && parts?.length > 1) {
			parts.forEach(function(part:ParticipateTournament) {

			})
		}

	},[])
	const [savedPartTournament]  = useMutation(SAVED_PART)
	const [leavePartTournament]  = useMutation(LEAVE_PART_TOURNAMENT)
	const onShowClose = async function(){
    	setShowClose(!showClose)
		let isError:boolean = false
		let arrayUidTeam:string[] = []
		if(tournament?.isTeam) {
			const check = await checkInTeam(userConnectedRedux.user.uid)
			if(!check) {
				isError = true
				setMessage(Translation(userConnectedRedux.user.language).tournament.notifyError)
			}

			check.forEach(function(team:Team) {
				arrayUidTeam.push(team.uid)
			})
		}
		if(!isError) {
			const saved = await savedPartTournament({ variables: { uidUser: userConnectedRedux.user.uid,date:(new Date().toLocaleString()),tournamentUid:tournament?.uid,teamsUid:{uid:arrayUidTeam.length > 0 ? arrayUidTeam[0] : ""} } })
		}

  	}

	return (
		<div className="item-info-right">
				<div className="join-all">
					<p className="team-bar-title">{teamPart}</p>
					<span style={{"color":"#dd0000"}}>{message}</span>
					<button className="btn bg-red" onClick={onShowClose}>{!showClose ? "Rejoindre" : "Quitter"}</button>
					<button className={showClose ? "btn bg-green-light":"d-none"}>Lancer</button>
					<div className="profil-join">
						<p>Skouinar - <span>TonioPlancha</span></p>
						<p className="free-emplacement"><span>{!showClose ? "Emplacement Libre" : "Gotaga - CapelaJr"}</span></p>
					</div>
				</div>
				<div className="join-all join-canal">
					<p className="team-bar-title">Rejoindre le canal discord</p>
					<button className="btn bg-red discolor">Rejoindre</button>
				</div>
		</div>
	)
}

export default PartTournament
