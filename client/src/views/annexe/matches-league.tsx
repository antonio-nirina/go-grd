import React,{useEffect,useState} from "react"
// import { Link } from "react-router-dom"
import {useQuery} from "@apollo/client"
import { useSelector } from "react-redux"
import {RootState} from "../../reducer"
import {Translation} from "../../lang/translation"
import {GET_ONE_TOURNAMENT} from "../../gql/tournament/query"
import Header from "../header/header"
import Footer from "../footer/footer"
import {Tournament} from "../models/tournament"
import "../tournament/info.css"
import "../../assets/css/style.css"
import { Link } from "react-router-dom"
import {dateStringToDY} from "../tools/dateConvert"
import AvatarDefault from "../../assets/image/game-tag.png"



const MatchesLeague: React.FC = function(props:any) {
	const params = new URLSearchParams(props.location.search)
	const uid:string|null = params.get("uid")
	const [tournament, setTournament] = useState<Tournament>()
	const [isOpen, setIsOpen] = useState<boolean>(true)
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

		const date1 = new Date()
		const date2 = new Date(data?.FindOneTournament.deadlineDate)
		const diff = (date2.getTime() - date1.getTime())/1000/60

		if (diff < 10 || diff <= 0) setIsOpen(false)

	},[loading,error,data])

  return(
  	<div className="Tournament info view">
		<div className="container">
			<Header/>
			<div className="full-container">

				<div className="details">
					<p className="name-target">Tournois : <span>Rocket League</span></p>
					<p className="starting">Date de commencement : <span>
						{userConnectedRedux.user.language === "fr" ? dateStringToDY(tournament?.dateStart) : dateStringToDY(tournament?.dateStart)}
					</span></p>
					<p className="status">Status : <span>
						{isOpen ? Translation(userConnectedRedux.user.language).tournament.open : Translation(userConnectedRedux.user.language).tournament.close }
					</span></p>
				</div>
				<div className="tabs">
					<ul>
						<li><Link to={`/info-league?uid=${params.get('uid')}`}>Info</Link></li>
						<li><Link to={`/matches-league?uid=${params.get('uid')}`} className="active">Match</Link></li>
						<li><Link to={`/rules-league?uid=${params.get('uid')}`}>
							{Translation(userConnectedRedux.user.language).tournament.rules}
						</Link></li>
					</ul>
				</div>
				<div className="ban">
					<div className="versus-container">
						<div className="team">
							<div className="info">
								<span>team</span>
								<p className="profilname">HammyZZ</p>
								<p><span>2113 </span>Average rating</p>
							</div>
							<img src={AvatarDefault} alt="default" />
						</div>
						<div className="live">
							<p><span>Live</span>9:22</p>
							<div className="mise"><button className="btn bg-red">Voir le match</button></div>
						</div>
						<div className="team">
						<div className="info">
								<span>team</span>
								<p className="profilname">rainDrop</p>
								<p><span>2185 </span>Average rating</p>
							</div>
							<img src={AvatarDefault} alt="default" />
						</div>
					</div>
				</div>

				<div className="banniere"></div>
				<div className="matches">
					<h2>Horaires</h2>
					<p><strong>{Translation(userConnectedRedux.user.language).tournament.starttimes}</strong></p>
				</div>
			</div>
			<Footer/>
		</div>
    </div>
  )
}

export default MatchesLeague
