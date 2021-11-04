import React,{useState,useEffect} from "react"
import { Link } from 'react-router-dom'
import {useQuery} from "@apollo/client"
import Header from "../header/header"
import Footer from "../footer/footer"
import Joystick from "../../assets/image/white-joystick.png"

import { faUser} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GET_ALL_GAMES } from "../../gql/games/query"
import {GameType} from "../models/game"
import {Tournament} from "../models/tournament"
import {GET_ALL_TOURNAMENT} from "../../gql/tournament/query"
import "../tournois/tournois.css"
import "../../assets/css/style.css"
import {LIMIT,PAGE_NUMBER} from "../commons/constante"


const PageTournois: React.FC = function() {
	const [games,setGames] = useState<GameType[]>([])
	const [tournament, setTournament] = useState<Tournament[]>([])
	const {loading,error,data} 	= useQuery(GET_ALL_GAMES)
	const {loading:ldg,error:err,data:dataTournament} 	= useQuery(GET_ALL_TOURNAMENT, {
		variables: {
			limit:LIMIT,
			pageNumber:PAGE_NUMBER
		},
	})

	useEffect(() => {
		if(!loading && !error && data) {
			setGames(data.FindAllGame)
		}

		if(!ldg && !err && ldg) {
			setTournament(data.FindAllTournament)
		}
	},[loading,error,data,ldg,err,dataTournament])
  return(
	<div className="tournois">
		<div className="container">
			<Header/>
			<div className="main">
				<div className="undertitle">
					<h2>Tournois</h2>
					<span>Derniers tournois publiés</span>
				</div>
				<div className="containt">
					<p>Choisis ton jeux</p>
					<div className="favorite">
						<div className="game-list-container">
							<div className="favorite-game" >
								{games.map(function(e:GameType,index:number){
									return(
										<Link to ={`/tournament-game?game=${e.name.replace(" ","_")}&slug=${e.slug}`} key={index}>
											<img src={e.image} alt={e.slug} width="200"/>
										</Link>
									)
								})}
							</div>
						</div>
					</div>
				</div>
				<div className="right-list">
					{tournament.map(function(el:Tournament) {
						return (
							<Link to ="#">
								<div className="apex block">
									<div className="top-icon"><p className="legend">{el.title}</p><i className="iconGame"><img src={Joystick} alt="" width="15"/></i></div>
									<div className="info">
										<p className="price inblock"><i><FontAwesomeIcon icon={faUser}/></i><span>JP_FUT12 & Kek37000</span></p>
										<p className="price inblock"><i className="sprite cup"></i><span>{el.price[0]}€ Cash Prize</span></p>
										<p className="date inblock"><i className="sprite ticket"></i><span>{el.dateStart}</span></p>
									</div>
								</div>
							</Link>
						)
					})}


				</div>
			</div>
			<Footer/>
		</div>
	</div>

	);
}

export default PageTournois;
