import React,{useEffect,useState} from "react"
import {Link,useHistory } from "react-router-dom"
import { faChevronCircleUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {Tournament} from "../../models/tournament"
import {dateStringToJoinT} from "../../tools/dateConvert"
// import { Wagger } from "../../models/wagger"
import { NameRoutes } from "../../commons/route-list"

export type HeaderTournamentType = {
	data:any,//Tournament|Wagger|undefined,
	isTournament:boolean,
	isWagger:boolean,
	isPart:boolean
}

const HeaderTournament = function({data,isTournament,isWagger,isPart}:HeaderTournamentType) {
	const [uriJoin, setUriJoin] = useState<string>("")
	const [uriRules, setUriRules] = useState<string>("")
	const [match, setMatch] = useState<string>("")
	const [board, setUriBoard] = useState<string>("")
	const params = useHistory<any>()

	useEffect(() => {
		let uid = params.location.search.split("=")[1]
		if(!/tournament/.test(params.location.search) && isTournament) {
			uid = `${params.location.search.split("=")[1]}&tournament`
		}
		if(!/wagger/.test(params.location.search) && isWagger) {
			uid = `${params.location.search.split("=")[1]}&wagger`
		}
		if(isTournament) {
			setUriJoin(`${NameRoutes.joinTournament}?uid=${uid}=${isTournament}&wagger=${isWagger}`)
			setUriRules(`${NameRoutes.tournamentRules}?uid=${uid}=${isTournament}&wagger=${isWagger}`)
		} else if(isWagger) {
			setUriJoin(`${NameRoutes.joingame}?uid=${uid}=${isTournament}&wagger=${isWagger}`)
			setUriRules(`${NameRoutes.waggerRules}?uid=${uid}=${isTournament}&wagger=${isWagger}`)
		}
		setUriBoard(`${NameRoutes.board}?uid=${uid}=${isTournament}&wagger=${isWagger}`)
		setMatch(`${NameRoutes.matchTournament}?uid=${uid}=${isTournament}&wagger=${isWagger}`)

	},[isTournament,params,isWagger])

	return (
		<>
			<div className="part">
				<div className="back">
				<Link to="#"><i><FontAwesomeIcon icon={faChevronCircleUp} size="xs" /></i>Retour</Link>
				</div>
				<div className="header-part">
				<img className="item-left" src={data?.game.logo} alt={data?.game.slug} />
				<div className="join-title">
					<h2>{data?.title} - {data?.gameWay} - {data?.game.name}</h2>
					<p>
						<span>{isTournament ? dateStringToJoinT(data?.dateStart) : dateStringToJoinT(data?.date)}</span>
						<span>{isTournament || isWagger ? data?.gameWay : ""}</span>
						<span>{isTournament || isWagger ?data?.game.name : ""}</span>
						<span>{ isTournament || isWagger ? (data?.plateform && data?.plateform.length > 0 ? "Cross-Play" : data?.plateform[0]) : ""} </span>
					</p>
				</div>
				</div>
			</div>
			<div className="bar-menu-top">
				<li><Link to={uriJoin} id="general">Général</Link></li>
				<li><Link to={board} id="tableau">Tableau</Link></li>
				<li><Link to={uriRules} id="rule">Règles</Link></li>
				{isPart ? <li><Link to={match} id="match">Matchs</Link></li> : <></>}
			</div>
		</>
	)
}

export default HeaderTournament

