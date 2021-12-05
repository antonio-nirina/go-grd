import React,{useState,useEffect} from "react"
import { Link,useLocation } from "react-router-dom"
import {useQuery} from "@apollo/client"
import { useSelector } from "react-redux"

import Header from "../header/header"
import Footer from "../footer/footer"
import { faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {GET_ALL_WAGER_GAME} from "../../gql/wagger/query"
import {Wagger} from "../models/wagger"
import {LIMIT,PAGE_NUMBER} from "../commons/constante"
import {RootState} from "../../reducer"
import {dateStringToDY,dateStringToDYEn} from "../tools/dateConvert"
import "../waggers/waggers.css"
import "../../assets/css/style.css"
import "../annexe/tournois.css"


const WaggersGame = function() {
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const params = useLocation()
	const [waggers,setWaggers] = useState<Wagger[]>([])
	const {loading,error,data} 	= useQuery(GET_ALL_WAGER_GAME, {
		variables: {
			slugGame:params.search.split("=")[2],
			limit:LIMIT,
			pageNumber:PAGE_NUMBER
		},
	})

	useEffect(() => {
		if(!loading && !error && data) {
			setWaggers(data.FindTournamentByGame)
		}

	},[loading,error,data])
	// const params:string|null = (new URLSearchParams(props.location.search)).get("game")

  return(
  	<div className="container">
  		<Header />
  		<div className="participate league waggersgame">
			<div className="marg">
				<div className="part test">
					<div className="undertitle">
						<h2>Waggers - {decodeURIComponent((params.search.split("&")[0].split("=")[1]))}</h2>
						<p>Retrouve les derniers défis proposés par la communauté</p>
					</div>
					<div className="waggers-list">
						<div className="waggers-content">
							{waggers && waggers.length > 0 ?
								<>
									<div className="waggers-title">
										<p>Horaire</p>
										<p>Rank</p>
										<p>Format</p>
										<p>Inscription</p>
										<p>Mode de jeu</p>
										<p>Entréee</p>
										<p><span>Nombre</span> <span>de</span> joueur</p>
									</div>
										{waggers.map(function(el:Wagger,index:number) {
											return (
													<Link key={index} to="/joingame" className="waggers-data">
														<p>
															Débute
															<span>
																{userConnectedRedux.user.language === "fr" ? dateStringToDY(el.date) : dateStringToDYEn(el.date)}
															</span>
														</p>
														<p>
															PLATINE
														</p>
														<p>{el.format}</p>
														<p>{el.priceParticipate && el.priceParticipate > 0 ? el.priceParticipate : "Gratuit"}</p>
														<p>{el.gameWay}</p>
														<p>{el.isPublic ? "Public" : "Preminum"}</p>
														<p><i><FontAwesomeIcon icon={faUsers}/></i>3/6</p>
													</Link>
											)
										})
									}
								</>
							:
							<h2>Accune wagger pour l'instant</h2> }
						</div>
					</div>
				</div>
			</div>
 		</div>
		<Footer/>
  	</div>
  )
}

export default WaggersGame
