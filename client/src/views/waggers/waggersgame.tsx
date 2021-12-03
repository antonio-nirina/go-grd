import React,{useState,useEffect} from "react"
import { Link,useLocation } from "react-router-dom"
import {useQuery} from "@apollo/client"
import Header from "../header/header"
import Footer from "../footer/footer"

import { faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {GET_ALL_WAGER_GAME} from "../../gql/wagger/query"
import {Wagger} from "../models/wagger"
import {LIMIT,PAGE_NUMBER} from "../commons/constante"
import "../waggers/waggers.css"
import "../../assets/css/style.css"
import "../annexe/tournois.css"


const WaggersGame = function() {
	const params = useLocation<any>()
	const [waggers,setWaggers] = useState<Wagger[]>([])
	const {loading,error,data} 	= useQuery(GET_ALL_WAGER_GAME, {
		variables: {
			slugGame:params.search.split("?")[0],
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
						<h2>Waggers - {params.search?.replace("_"," ")}</h2>
						<p>Retrouve les derniers défis proposés par la communauté</p>
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
							<Link to="/joingame" className="waggers-data">
								<p>Débute <span>23 JUL - 12h30</span></p>
								<p>PLATINE</p>
								<p>B03</p>
								<p>30€</p>
								<p>3v3 Arène</p>
								<p>Public</p>
								<p><i><FontAwesomeIcon icon={faUsers}/></i>3/6</p>
							</Link>
							<Link to="#" className="waggers-data">
								<p>Débute <span>23 JUL - 12h30</span></p>
								<p>PLATINE</p>
								<p>B03</p>
								<p>30€</p>
								<p>3v3 Arène</p>
								<p>Public</p>
								<p><i><FontAwesomeIcon icon={faUsers}/></i>3/6</p>
							</Link>
							<Link to="#" className="waggers-data">
								<p>Débute <span>23 JUL - 12h30</span></p>
								<p>PLATINE</p>
								<p>B03</p>
								<p>30€</p>
								<p>3v3 Arène</p>
								<p>Public</p>
								<p><i><FontAwesomeIcon icon={faUsers}/></i>3/6</p>
							</Link>
							<Link to="#" className="waggers-data">
								<p>Débute <span>23 JUL - 12h30</span></p>
								<p>PLATINE</p>
								<p>B03</p>
								<p>30€</p>
								<p>3v3 Arène</p>
								<p>Public</p>
								<p><i><FontAwesomeIcon icon={faUsers}/></i>3/6</p>
							</Link>
							<Link to="#" className="waggers-data">
								<p>Débute <span>23 JUL - 12h30</span></p>
								<p>PLATINE</p>
								<p>B03</p>
								<p>30€</p>
								<p>3v3 Arène</p>
								<p>Public</p>
								<p><i><FontAwesomeIcon icon={faUsers}/></i>3/6</p>
							</Link>
							<Link to="#" className="waggers-data">
								<p>Débute <span>23 JUL - 12h30</span></p>
								<p>PLATINE</p>
								<p>B03</p>
								<p>30€</p>
								<p>3v3 Arène</p>
								<p>Public</p>
								<p><i><FontAwesomeIcon icon={faUsers}/></i>3/6</p>
							</Link>
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
