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



const Matches: React.FC = function(props:any) {
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
  	<div className="Tournament info">
		<div className="container">
			<Header/>
			<div className="full-container">
				<div className="details">
					<p className="name-target">Tournois : <span>Rocket League</span></p>
					<p className="starting">Date de commencement : <span>
						{userConnectedRedux.user.language === "fr" ? dateStringToDY(tournament?.date) : dateStringToDY(tournament?.date)}
					</span></p>
					<p className="status">Status : <span>
						{isOpen ? Translation(userConnectedRedux.user.language).tournament.open : Translation(userConnectedRedux.user.language).tournament.close }
					</span></p>
				</div>
				
				<div className="banniere"></div>
				<div className="tabs">
					<ul>
						<li><Link to={`/info?uid=${params.get('uid')}`} className="active">Info</Link></li>
						<li><Link to={`/matches?uid=${params.get('uid')}`}>Match</Link></li>
						<li><Link to={`/rules?uid=${params.get('uid')}`}>
							{Translation(userConnectedRedux.user.language).tournament.rules}
						</Link></li>
					</ul>
				</div>				
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

export default Matches
