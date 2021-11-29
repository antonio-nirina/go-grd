import React,{useState,useEffect} from "react"
import {useMutation} from "@apollo/client"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

import {SAVED_PART,LEAVE_PART_TOURNAMENT} from "../../gql/participate/mutation"
import {Tournament} from "../models/tournament"
import {ParticipateTournament} from "../models/participate"
import ContentPaiement from "../commons/contentPaiement"
import {checkInTeam} from "../league/utils"
import {RootState} from "../../reducer"
import {Translation} from "../../lang/translation"
import { NameRoutes } from "../commons/route-list"



export type PartTournamentType = {
	tournament:Tournament|undefined,
	parts:ParticipateTournament[]|undefined,
}


const PartTournament:React.FC<PartTournamentType> = function ({tournament,parts}) {
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const [showClose, setShowClose] = useState(false)
	const [isPart,setIsPart] = useState<boolean>(false)
	const [teamPart,setTeamPart] = useState<string>("")
	const [message,setMessage] = useState<string>("")
	const [partUid,setPartUid] = useState<string>("")
	const [partData,setPartData] = useState<string[]>([])
	const [showPaiement, setShowPaiement] = useState<boolean>(false)
	const [leavePartTournament]  = useMutation(LEAVE_PART_TOURNAMENT)

	useEffect(() => {
		if(tournament?.isTeam) {
			setTeamPart(`Equipes ${parts && parts?.length > 1 ? parts?.length : 0}/ ${tournament.numberParticipate}`)
		} else if(!tournament?.isTeam) {
			setTeamPart("One to one")
		}
		if(parts && parts?.length > 1) {
			parts.forEach(function(part:ParticipateTournament) {

			})
		}
		parts?.forEach(function(part:ParticipateTournament){
			if(part.user.uid === userConnectedRedux.user.uid) {
				setPartUid(part.uid)
				setIsPart(true)
			}
		})
		let arrayUser:string[] = []
		parts?.forEach(function(part:ParticipateTournament){
			arrayUser.push(part.user.username)
		})

		if(parts && arrayUser.length < parts[0].tournament.numberParticipate){
			for (let index = arrayUser.length; index < parts[0].tournament.numberParticipate; index++) {
				arrayUser.push("Emplacement libre")
			}
		}
		setPartData(arrayUser)

	},[tournament])

	const onShowConfirmed = async function() {
		const check = await checkInTeam(userConnectedRedux.user.uid)
		if(!check && tournament?.isTeam) {
			setMessage(Translation(userConnectedRedux.user.language).tournament.notifyError)
		} else {
			setShowPaiement(!showPaiement)
		}
	}

	const handleClose = function() {
		setShowPaiement(false)
		setMessage("")
	}

	const handleLeave = async function() {
		const leave = await leavePartTournament({variables:{uid:partUid,userUid:userConnectedRedux.user.uid}})
		if(leave.data) setMessage("Votre desincription a été effectué")
		setIsPart(false)
	}


	return (
		<div className="item-info-right">
			<div className="join-all">
				<p className="team-bar-title">{teamPart}</p>
				<span style={{"color":"#dd0000","fontSize":"11px","fontWeight":"bold"}}>{message}</span>
				{tournament && parseInt(tournament?.priceParticipate) ?
					<button className="btn bg-red" onClick={onShowConfirmed}>{!showPaiement && !isPart ? "Rejoindre" : (isPart ? "Quitter le tournois" : "Quitter")}</button>
					:
					(!isPart ?
						<Link className="btn bg-red" to={`${NameRoutes.confirmedJoinTournament}?uid=${tournament?.uid}`} >
							{!showPaiement && !isPart ? "Rejoindre" : "Quitter"}
						</Link>
						:
						<button style={{"cursor":"pointer"}} className="btn bg-red" onClick={handleLeave}>Quitter le tournois</button>
					)
				}
				<div className="profil-join">
					{partData?.map(function(element:string,index:number){
						return (
							<p key={index}>{element}</p>
						)
					})}

					<p className="free-emplacement"><span>{!showClose ? "Emplacement Libre" : "Gotaga - CapelaJr"}</span></p>
				</div>
			</div>
			<div className="join-all join-canal">
				<p className="team-bar-title">Rejoindre le canal discord</p>
				<button className="btn bg-red discolor">Rejoindre</button>
			</div>
				{showPaiement ? <ContentPaiement handleClosePayement={handleClose}  /> : <></>}
		</div>
	)
}

export default PartTournament
