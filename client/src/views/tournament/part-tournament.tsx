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


export type PartTournamentType = {
	tournament:Tournament|undefined,
	parts:ParticipateTournament[]|undefined,
}


const PartTournament:React.FC<PartTournamentType> = function ({tournament,parts}) {
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const [showClose, setShowClose] = useState(false)
	const [teamPart,setTeamPart] = useState<string>("")
	const [message,setMessage] = useState<string>("")

	const [showPaiement, setShowPaiement] = useState<boolean>(false)

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
	},[])

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

	const [leavePartTournament]  = useMutation(LEAVE_PART_TOURNAMENT)

	return (
		<div className="item-info-right">
			<div className="join-all">
				<p className="team-bar-title">{teamPart}</p>
				<span style={{"color":"#dd0000","fontSize":"11px","fontWeight":"bold"}}>{message}</span>
				{tournament && parseInt(tournament?.priceParticipate) ?
					<button className="btn bg-red" onClick={onShowConfirmed}>{!showPaiement ? "Rejoindre" : "Quitter"}</button>
					:
					<Link className="btn bg-red" to={`/confirmed-join/tournament?uid=${tournament?.uid}`} >
						Rejoindre
					</Link>
				}
				<div className="profil-join">
					<p>Skouinar - <span>TonioPlancha</span></p>
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
