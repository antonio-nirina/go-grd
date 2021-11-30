import React,{useEffect,useState} from "react"
import {Link,useHistory } from "react-router-dom"
import { faChevronCircleUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {Tournament} from "../../models/tournament"
import {dateStringToJoinT} from "../../tools/dateConvert"
// import { Wagger } from "../../models/wagger"


export type HeaderTournamentType = {
	data:any,//Tournament|Wagger|undefined,
	isTournament:boolean,
	isWagger:boolean
}

const HeaderTournament = function({data,isTournament,isWagger}:HeaderTournamentType) {
	const [uriJoin, setUriJoin] = useState<string>("")
	const [uriRules, setUriRules] = useState<string>("")
	const [uid, setUid] = useState<string>("")
	const params = useHistory<any>()

	useEffect(() => {
		if(params) setUid(params.location.search.split("=")[1])

		if(isTournament) {
			setUriJoin("join-tournament")
			setUriRules("tournament-rules")
		} else if(isWagger) {
			setUriJoin("joingame")
			setUriRules("waggers-rules")
		}
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
				<li><Link to={`${uriJoin}/?uid=${uid}&tournament=${isTournament}&wagger=${isWagger}`} id="general">Général</Link></li>
				<li><Link to={`/tableau?uid=${uid}&tournament=${isTournament}&wagger=${isWagger}`} id="tableau">Tableau</Link></li>
				<li><Link to={`/${uriRules}?uid=${uid}&tournament=${isTournament}&wagger=${isWagger}`} id="rule">Règles</Link></li>
			</div>
		</>
	)
}

export default HeaderTournament

