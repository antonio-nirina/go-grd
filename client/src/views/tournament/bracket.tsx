import React ,{useState,useEffect} from "react"
import {useQuery} from "@apollo/client"
import { useSelector } from "react-redux"

import { Link } from "react-router-dom"
import Tree from "./tree"
import Header from "../header/header"
import Footer from "../footer/footer"
import {GET_ONE_TOURNAMENT} from "../../gql/tournament/query"
import {Translation} from "../../lang/translation"
import {RootState} from "../../reducer"
import "../tournament/bracket.css"
import "../../assets/css/style.css"
import {Tournament} from "../models/tournament"
import {dateStringToDY} from "../tools/dateConvert"


const Bracket: React.FC = function(props:any) {
	const params = new URLSearchParams(props.location.search)
	const uid:string|null = params.get("uid")
	const [tournament, setTournament] = useState<Tournament>()
	const [isOpen] = useState<boolean>(true)
	const [showMore] = useState<boolean>(false)
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
			<div className="full-container bracket">
				<div className="details">
					<p className="name-target">Tournois : <span>{tournament?.game.name}</span></p>
					<p className="starting">
						{
							Translation(userConnectedRedux.user.language).tournament.starttimes
						}:
						<span> {userConnectedRedux.user.language === "fr" ? dateStringToDY(tournament?.date) : dateStringToDY(tournament?.date)}</span></p>
					<p className="status">Status : <span>
						{isOpen ? Translation(userConnectedRedux.user.language).tournament.open : Translation(userConnectedRedux.user.language).tournament.close }
					</span>
					</p>
				</div>
				<div className="tabs">
					<ul>
						<li><Link to={`/info?uid=${params.get('uid')}`}>Info</Link></li>
						<li><Link to={`/matches?uid=${params.get('uid')}`}>Match</Link></li>
						<li><Link to={`/Bracket?uid=${params.get('uid')}`} className="active">Bracket</Link></li>
						<li><Link to={`/rules?uid=${params.get('uid')}`}>
						{
							Translation(userConnectedRedux.user.language).tournament.rules
						}
						</Link></li>						
					</ul>
				</div>
				<div className="container-rules">
					<div className={!showMore ? "tree-container" :"tree-container show"}>
						<Tree />
					</div>
				</div>
			</div>			
			<Footer/>
		</div>
    </div>
  )
}

export default Bracket
