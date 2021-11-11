import React from "react"
import { Link } from "react-router-dom"
import { faChevronCircleUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Tournament} from "../../models/tournament"
import {dateStringToJoinT,dateStringToDHString} from "../../tools/dateConvert"


type HeaderTournamentType = {
	tournament:Tournament|undefined,
	isTournament:boolean
}

const HeaderTournament = function({tournament,isTournament}:HeaderTournamentType) {
	return (
		<>
			<div className="part">
				<div className="back">
				<Link to="#"><i><FontAwesomeIcon icon={faChevronCircleUp} size="xs" /></i>Retour</Link>
				</div>
				<div className="header-part">
				<img className="item-left" src={tournament?.game.logo} alt={tournament?.game.slug} />
				<div className="join-title">
					<h2>{tournament?.title} - {tournament?.gameWay} - {tournament?.game.name}</h2>
					<p>
					<span>{dateStringToJoinT(tournament?.dateStart)}</span>
					<span>{tournament?.gameWay}</span>
					<span>{tournament?.game.name}</span>
					<span>{tournament?.plateform && tournament?.plateform.length > 0 ? "Cross-Play" : tournament?.plateform[0]} </span>
					</p>
				</div>
				</div>
			</div>
			<div className="bar-menu-top">
				<li><Link to={`/join-tournament?uid=${tournament?.uid}`} className={isTournament ? "active":""}>Général</Link></li>
				<li><Link to="/tableau">Tableau</Link></li>
				<li><Link to="/waggers-rules">Règles</Link></li>
			</div>
		</>
	)
}

export default HeaderTournament

