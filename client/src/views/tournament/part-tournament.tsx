import React,{useState} from "react"
import {useQuery,useMutation} from "@apollo/client"

import {SAVED_PART,LEAVE_PART_TOURNAMENT} from "../../gql/participate/mutation"
import {Tournament} from "../models/tournament"

export type PartTournamentType = {
	tournament:Tournament|undefined,
	uid:string|null
}

const PartTournament:React.FC<PartTournamentType> = function ({tournament,uid}) {
	const [showClose, setShowClose] = useState(false)
	const [savedPartTournament]  = useMutation(SAVED_PART)
	const [leavePartTournament]  = useMutation(LEAVE_PART_TOURNAMENT)
	const onShowClose = function(){
    	setShowClose(!showClose)
  	}

	return (
		<div className="item-info-right">
				<div className="join-all">
					<p className="team-bar-title">{!showClose! ? "Equipes 1/2" : "Equipes 2/2"}</p>
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
