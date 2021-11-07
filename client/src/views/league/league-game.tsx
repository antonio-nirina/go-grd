import React,{useEffect,useState} from "react"
import {useQuery} from "@apollo/client"
import { useSelector } from "react-redux"

import { Link } from "react-router-dom"
import Header from "../header/header"
import Footer from "../footer/footer"

import { faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import {Translation} from "../../lang/translation"
import {GET_TOURNAMENT_GAME} from "../../gql/tournament/query"
import {RootState} from "../../reducer"
import "../waggers/waggers.css"
import "../../assets/css/style.css"
import "../annexe/tournois.css"
import {Tournament} from "../models/tournament"
import {dateStringToDY,dateStringToDYEn} from "../tools/dateConvert"
import {LIMIT,PAGE_NUMBER} from "../commons/constante"

const LeagueGame = function(props:any) {
	const params:string|null 	= (new URLSearchParams(props.location.search)).get("game")
	const paramsSlug:string|null 	= (new URLSearchParams(props.location.search)).get("slug")
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const [tournament, setTournament] = useState<Array<Tournament>>([])
	const {loading,error,data} 	= useQuery(GET_TOURNAMENT_GAME, {
		variables: {
			slugGame:paramsSlug,
			limit:LIMIT,
			pageNumber:PAGE_NUMBER
		},
	})

	useEffect(() => {
		if(!loading && !error && data) {
			setTournament(data.FindTournamentByGame)
		}

	},[loading,error,data])
	return (
		<div className="container">
  		<Header />
  		<div className="participate league waggersgame">
			<div className="marg">
				<div className="part">
					<div className="undertitle">
						<h2>Tournois - {params?.replace("_"," ")}</h2>
						<p>
							Retrouve les derniers défis proposés par la communauté
						</p>
					</div>
					<div className="waggers-list">
						<div className="waggers-content">
							<div className="waggers-title">
								<p>Horaire</p>
								<p>Rank</p>
								<p>Format</p>
								<p>Inscription</p>
								<p>Mode de jeu</p>
								<p>Entréee</p>
								<p><span>Nombre</span> <span>de</span> joueur</p>
							</div>
							{
								tournament && tournament.length > 0 ? tournament.map(function(el:Tournament,index:number){
									return (
										<Link to="/joingame" className="waggers-data" key={index}>
											<p>
												<span>
													{userConnectedRedux.user.language === "fr" ? dateStringToDY(el.dateStart) : dateStringToDYEn(el.dateStart)}
												</span>
											</p>
											<p>{el.game.name}</p>
											<p>{el.format }</p>
											<p>{`${el.price} € `}</p>
											<p>{el.gameWay}</p>
											<p>{!el.isPublic ? "Public": "Prenimum"}</p>
											<p><i><FontAwesomeIcon icon={faUsers}/></i>{`0/${el.priceParticipate}`}</p>
										</Link>
									)
								})
								:
								<p>No tournament </p>
							}

						</div>
					</div>
				</div>
			</div>
 		</div>
		<Footer/>
  	</div>
	)
}

export default LeagueGame
