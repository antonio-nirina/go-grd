import React ,{useEffect,useState} from "react"
import {useQuery} from "@apollo/client"
import { useSelector } from "react-redux"
import parse from 'html-react-parser'
import { Link } from "react-router-dom"
import Header from "../header/header"
import Footer from "../footer/footer"

import Championship from "../../assets/image/championship.jpeg"
import {GET_ONE_TOURNAMENT} from "../../gql/tournament/query"
import {Translation} from "../../lang/translation"
import {RootState} from "../../reducer"
import "../tournament/info.css"
import "../../assets/css/style.css"
import {Tournament} from "../models/tournament"
import {dateStringToDY} from "../tools/dateConvert"


const Info: React.FC = function(props:any) {
	const params = new URLSearchParams(props.location.search)
	const uid = params.get("uid")
	const [tournament, setTournament] = useState<Tournament>()
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const {loading,error,data} 	= useQuery(GET_ONE_TOURNAMENT, {
			variables: {
				uid:uid,
			},
	})

	useEffect(() => {
		if(!loading && !error && data) {
			setTournament(data.FindOneTournament)
		}

	},[loading,error,data])

  return(
  	<div className="Tournament info">
		<div className="container">
			<Header/>
			<div className="full-container">
				<div className="details">
					<p className="name-target">Tournois : <span>{tournament?.game.name}</span></p>
					<p className="starting">Date de commencement : <span>{userConnectedRedux.user.language === "fr" ? dateStringToDY(tournament?.date) : dateStringToDY(tournament?.date)}</span></p>
					<p className="status">Status : <span>
						{tournament?.deadlineDate}
					</span>
					</p>
				</div>
				
				<div className="banniere">
					<img src={Championship} alt=""/>
				</div>
				<div className="tabs">
					
					<ul>
						<li><Link to="/info" className="active">Info</Link></li>
						<li><Link to="/matches">Match</Link></li>
						<li><Link to="/teams">Equipes</Link></li>
						<li><Link to="#">Règles</Link></li>
					</ul>
				</div>
				<div className="txt">
					{tournament? parse(tournament.description) : <></>}
				</div>
				<div className="tableau">
					<div className="state">
						<p>16 <span>slots</span></p>
						<p>27 <span>En attente</span></p>
						<p>7 <span className="confirm">Confirmé</span></p>
					</div>
					<div className="info-target">
						<div className="line">
							<p>Début</p>
							<span>{tournament?.date}</span>
						</div>
						<div className="line">
							<p>Fin</p>
							<span>{tournament?.deadlineDate}</span>
						</div>
						<div className="line">
							<p>Participants</p>
							<span>{tournament?.numberParticipate}</span>
						</div>
						<div className="line">
							<p>Mode</p>
							<span>Elimination</span>
						</div>
					</div>
				</div>
			</div>			
			<Footer/>
		</div>
    </div>
  )
}

export default Info
