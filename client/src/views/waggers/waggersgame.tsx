import React from "react"
import { Link } from "react-router-dom"
import Header from "../header/header"
import Footer from "../footer/footer"
import Join from "../join/join"
import { faXbox, faPlaystation } from "@fortawesome/free-brands-svg-icons"
import { faGamepad, faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
//import {Translation} from "../../lang/translation"
//import {RootState} from "../../reducer"
import "../waggers/waggers.css"
import "../../assets/css/style.css"
import "../annexe/tournois.css"

import apexlegends from "../../assets/image/apex-legends.png"
import fortnite from "../../assets/image/fortnite.png"
import rainboxsix from "../../assets/image/rainbowsix.png"
import rocketleague from "../../assets/image/rocketleague.png"
import cod_Modernwarfare from "../../assets/image/modernwarfare.png"
import cod_warzone from "../../assets/image/warzone.png"
import cod_coldwar from "../../assets/image/cod-coldwar.png"
import fifa from "../../assets/image/fifa21.png"

const WaggersGame: React.FC = function() {

  return(
  	<div className="container">
  		<Header />
  		<div className="participate league waggersgame">
			<div className="marg">
				<div className="part">
					<div className="undertitle">
						<h2>Waggers - Apex Legends</h2>
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
							<div className="waggers-data">
								<p>Débute <span>23 JUL - 12h30</span></p>
								<p>PLATINE</p>
								<p>B03</p>
								<p>30€</p>
								<p>3v3 Arène</p>
								<p>Public</p>
								<p><i><FontAwesomeIcon icon={faUsers}/></i>3/6</p>
							</div>
							<div className="waggers-data">
								<p>Débute <span>23 JUL - 12h30</span></p>
								<p>PLATINE</p>
								<p>B03</p>
								<p>30€</p>
								<p>3v3 Arène</p>
								<p>Public</p>
								<p><i><FontAwesomeIcon icon={faUsers}/></i>3/6</p>
							</div>
							<div className="waggers-data">
								<p>Débute <span>23 JUL - 12h30</span></p>
								<p>PLATINE</p>
								<p>B03</p>
								<p>30€</p>
								<p>3v3 Arène</p>
								<p>Public</p>
								<p><i><FontAwesomeIcon icon={faUsers}/></i>3/6</p>
							</div>
							<div className="waggers-data">
								<p>Débute <span>23 JUL - 12h30</span></p>
								<p>PLATINE</p>
								<p>B03</p>
								<p>30€</p>
								<p>3v3 Arène</p>
								<p>Public</p>
								<p><i><FontAwesomeIcon icon={faUsers}/></i>3/6</p>
							</div>
							<div className="waggers-data">
								<p>Débute <span>23 JUL - 12h30</span></p>
								<p>PLATINE</p>
								<p>B03</p>
								<p>30€</p>
								<p>3v3 Arène</p>
								<p>Public</p>
								<p><i><FontAwesomeIcon icon={faUsers}/></i>3/6</p>
							</div>
							<div className="waggers-data">
								<p>Débute <span>23 JUL - 12h30</span></p>
								<p>PLATINE</p>
								<p>B03</p>
								<p>30€</p>
								<p>3v3 Arène</p>
								<p>Public</p>
								<p><i><FontAwesomeIcon icon={faUsers}/></i>3/6</p>
							</div>
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
