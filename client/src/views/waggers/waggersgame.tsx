import React from "react"
import { Link } from "react-router-dom"
import Header from "../header/header"
import Footer from "../footer/footer"
import Join from "../join/join"

import { faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
//import {Translation} from "../../lang/translation"
//import {RootState} from "../../reducer"
import "../waggers/waggers.css"
import "../../assets/css/style.css"
import "../annexe/tournois.css"


const WaggersGame = function(props:any) {
	const params:string|null = (new URLSearchParams(props.location.search)).get("game")

  return(
  	<div className="container">
  		<Header />
  		<div className="participate league waggersgame">
			<div className="marg">
				<div className="part">
					<div className="undertitle">
						<h2>Waggers - {params?.replace("_"," ")}</h2>
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
		<Join/>
		<Footer/>
  	</div>
  )
}

export default WaggersGame
