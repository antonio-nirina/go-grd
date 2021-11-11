import React,{useState,useEffect} from "react"
import {useMutation} from "@apollo/client"

import {SAVED_PART,LEAVE_PART_TOURNAMENT} from "../../gql/participate/mutation"
import {Tournament} from "../models/tournament"

import {ParticipateTournament} from "../models/participate"

import Paiement from "../commons/paiement"

export type PartTournamentType = {
	tournament:Tournament|undefined,
	parts:ParticipateTournament[]|undefined
}

const PartTournament:React.FC<PartTournamentType> = function ({tournament,parts}) {
	const [showClose, setShowClose] = useState(false)
	const [teamPart,setTeamPart] = useState<string>("")
	const [message,setMessage] = useState<string>("")

	const [showPaiement, setShowPaiement] = useState<boolean>(false)

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

	const onShowConfirmed = function() {
		setShowPaiement(!showPaiement)
	}

	const [leavePartTournament]  = useMutation(LEAVE_PART_TOURNAMENT)

	return (
		<div className="item-info-right">
			<div className="join-all">
				<p className="team-bar-title">{teamPart}</p>
				<span style={{"color":"#dd0000"}}>{message}</span>
				<button className="btn bg-red" onClick={onShowConfirmed}>{!showPaiement ? "Rejoindre" : "Quitter"}</button>
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
			<Paiement
				isShow={showPaiement}
				tournament={tournament}
			/>
		</div>
	)
}

export default PartTournament
