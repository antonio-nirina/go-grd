import React,{useEffect,useState} from "react"
import parse from 'html-react-parser'
import {useQuery} from "@apollo/client"
import { useSelector } from "react-redux"
import {RootState} from "../../reducer"
import {Translation} from "../../lang/translation"
import {GET_ONE_LEAGUE} from "../../gql/league/query"
import Header from "../header/header"
import Footer from "../footer/footer"
import {League} from "../models/league"
import "../tournament/info.css"
import "../../assets/css/style.css"
import { Link } from "react-router-dom"
import {dateStringToDY} from "../tools/dateConvert"

const RulesLeague: React.FC = function(props:any) {
	const params = new URLSearchParams(props.location.search)
	const uid:string|null = params.get("uid")
	const [league, setLeague] = useState<League>()
	const [isOpen, setIsOpen] = useState<boolean>(true)
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const {loading,error,data} 	= useQuery(GET_ONE_LEAGUE, {
			variables: {
				uid:uid,
			},
	})

	useEffect(() => {
		if(!loading && !error && data) {
			setLeague(data.FindOneLeague)
		}

		const date1 = new Date()
		const date2 = new Date(data?.FindOneLeague.deadlineDate)
		const diff = (date2.getTime() - date1.getTime())/1000/60

		if (diff < 10 || diff <= 0) setIsOpen(false)

	},[loading,error,data])

  return(
  	<div className="Tournament info">
		<div className="container">
			<Header/>
			<div className="full-container">
				<div className="details">
					<p className="name-target">League : <span>{league?.game.name}</span></p>
					<p className="starting"><span>{userConnectedRedux.user.language === "fr" ? dateStringToDY(league?.date) : dateStringToDY(league?.date)}</span></p>
					<p className="status">Status : <span>
						{isOpen ? Translation(userConnectedRedux.user.language).tournament.open : Translation(userConnectedRedux.user.language).tournament.close }
					</span></p>
				</div>
				
				<div className="banniere"></div>
				<div className="tabs">
					<ul>
						<li><Link to={`/info-league?uid=${params.get('uid')}`}>Info</Link></li>
						<li><Link to={`/matches-league?uid=${params.get('uid')}`}>Match</Link></li>
						<li><Link to={`/rules-league?uid=${params.get('uid')}`} className="active">Règles</Link></li>
					</ul>
				</div>
				<div className="container-rules">
					<div className="txt">
						{league? parse(league.description) : <></>}
					</div>
					<div className="tableau">
						<div className="state">
							<p>{""}<span>slots</span></p>
							<p>{""}<span>
								{
									Translation(userConnectedRedux.user.language).tournament.pending
								}
							</span></p>
							<p>{""}<span className="confirm">
								{
									Translation(userConnectedRedux.user.language).tournament.confirmed
								}
							</span></p>
						</div>
						<div className="info-target">
							<div className="line">
								<p>
									{
										Translation(userConnectedRedux.user.language).tournament.start
									}
								</p>
								<span>{dateStringToDY(league?.date)}</span>
							</div>
							<div className="line">
								<p>
									{
										Translation(userConnectedRedux.user.language).tournament.end
									}
								</p>
								<span>{dateStringToDY(league?.deadlineDate)}</span>
							</div>
							<div className="line">
								<p>Participants</p>
								<span>{league?.numberParticipate}</span>
							</div>
							<div className="line">
								<p>Mode</p>
								<span>{league && league.numberTeam > 0 ? `${league?.numberTeam} ON ${league?.numberTeam}` : "1 ON 1" }</span>
							</div>
						</div>
						<div className="btn-container">
							<button className="btn bg-red">
								{
									Translation(userConnectedRedux.user.language).tournament.participate
								}
							</button>
						</div>
					</div>
				</div>
			</div>			
			<Footer/>
		</div>
    </div>
  )
}

export default RulesLeague
