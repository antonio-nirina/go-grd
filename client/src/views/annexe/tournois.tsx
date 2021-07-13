import React from "react"
import { Link } from "react-router-dom"
import Header from "../header/header"
import Footer from "../footer/footer"
import { faXbox, faPlaystation } from "@fortawesome/free-brands-svg-icons"
import { faGamepad } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
//import {Translation} from "../../lang/translation"
//import {RootState} from "../../reducer"
import "../../assets/css/style.css"
import "../annexe/tournois.css"
import "../participate/participate.css"

import apexlegends from "../../assets/image/apex-legends.png"
import fortnite from "../../assets/image/fortnite.png"
import rainboxsix from "../../assets/image/rainbowsix.png"
import rocketleague from "../../assets/image/rocketleague.png"
import cod_Modernwarfare from "../../assets/image/modernwarfare.png"
import cod_warzone from "../../assets/image/warzone.png"
import cod_coldwar from "../../assets/image/cod-coldwar.png"
import fifa from "../../assets/image/fifa21.png"
import {APEX_LEGENDE,FORTNITE,RNB,RL,COD_MODERN,COD_WAR_ZONE,COD_COLD_WAR,FIFA} from "../game/constante"


const Tournois: React.FC = function() {

  return(
  	<div className="container">
  		<Header />
  		<div className="participate league">
			<div className="marg">
				<div className="part">
					<div className="undertitle">
						<h2>Tournois</h2>
						<p>Derniers résultats en tournois</p>
					</div>
					<div className="content">
						<div className="clear"></div>
						<div className="apex block dark-red">
							<div>
								<p className="legend">Apex Legends Daily Cup</p><i className="iconGame"><FontAwesomeIcon icon={faXbox}/></i>
							</div>
							<div className="info">
								<p className="price inblock"><i className="sprite cup"></i><span>100€ Cash Prize</span></p>
								<p className="date inblock"><i className="sprite calendar"></i><span>02/04/2021 - 5:00 PM</span></p>
							</div>
						</div>						
						<div className="apex block dark-red">
							<div><p className="legend">Fortnite Weekly Cup</p><i className="iconGame"><FontAwesomeIcon icon={faGamepad}/></i></div>
							<div className="info">
								<p className="price inblock"><i className="sprite cup"></i><span>50€ Cash Prize</span></p>
								<p className="date inblock"><i className="sprite calendar"></i><span>03/04/2021 - 5:00 PM</span></p>
							</div>
						</div>
						<div className="apex block light-green">
							<div><p className="legend">Rocket League Champions</p><i className="iconGame"><FontAwesomeIcon icon={faPlaystation}/></i></div>
							<div className="info">
								<p className="price inblock"><i className="sprite ticket"></i><span>5€ Cash Prize</span></p>
								<p className="price inblock"><i className="sprite cup"></i><span>500€ Cash Prize</span></p>
								<p className="date inblock"><i className="sprite calendar"></i><span>04/04/2021 - 7:30 PM</span></p>
							</div>
						</div>
						<div className="apex block dark-red">
							<div>
								<p className="legend">Warzone Xbox Daily</p><i className="iconGame"><FontAwesomeIcon icon={faXbox}/></i>
							</div>
							<div className="info">
								<p className="price inblock"><i className="sprite cup"></i><span>100€ Cash Prize</span></p>
								<p className="date inblock"><i className="sprite calendar"></i><span>02/04/2021 - 5:00 PM</span></p>
							</div>
						</div>
						<div className="apex block dark-red">
							<div><p className="legend">R6 Squad Tournament</p><i className="iconGame"><FontAwesomeIcon icon={faGamepad}/></i></div>
							<div className="info">
								<p className="price inblock"><i className="sprite cup"></i><span>100€ Cash Prize</span></p>
								<p className="date inblock"><i className="sprite calendar"></i><span>02/04/2021 - 5:00 PM</span></p>
							</div>
						</div>
						<div className="apex block last light-green">
							<p className="legend">Fifa 21 fut cup</p>
							<div className="info">
								<p className="inblock"><i className="sprite ticket"></i><span>10€</span></p>
								<p className="inblock"><i className="sprite cup"></i><span>750€ Cash Prize</span></p>
								<p className="inblock"><i className="sprite calendar"></i><span>04/04/2021 - 7:30 PM</span></p>
							</div>
						</div>
					</div>								
				</div>
			</div>			
		</div>
		<div className="choices">
			<div className="jeux">
			    <h2>
					Choisis ton jeu
				</h2>
				<div className="bg-game">
				<div className="firstblock w100">
					<div className="logo-game">
					    <Link to={`/tournament-game?game=${APEX_LEGENDE.replace(" ","_")}`}><img src={apexlegends} alt="Apex Legends" /></Link>
					</div>
					<div className="logo-game">
					    <Link to={`/tournament-game?game=${FORTNITE.replace(" ","_")}`} ><img src={fortnite} alt="Fortnite" /></Link>
					</div>
					<div className="logo-game">
					    <Link to={`/tournament-game?game=${RNB.replace(" ","_")}`} ><img src={rainboxsix} alt="RainbowSIx Siege" /></Link>
					</div>
					<div className="logo-game">
					    <Link to={`/tournament-game?game=${RL.replace(" ","_")}`} ><img src={rocketleague} alt="Rocket League" /></Link>
					</div>
				</div>
      			<div className="lastblock w100">
			        <div className="logo-game">
			            <Link to={`/tournament-game?game=${COD_MODERN.replace(" ","_")}`} ><img src={cod_Modernwarfare} alt="Call of Duty Modern Warfare" /></Link>
			        </div>
			        <div className="logo-game">
			            <Link to={`/tournament-game?game=${COD_WAR_ZONE.replace(" ","_")}`} ><img src={cod_warzone} alt="Call of Duty Warzone" /></Link>
			        </div>
			        <div className="logo-game">
			            <Link to={`/tournament-game?game=${COD_COLD_WAR.replace(" ","_")}`} ><img src={cod_coldwar} alt="Call of Duty Cold War" /></Link>
			        </div>
			        <div className="logo-game">
			            <Link to={`/tournament-game?game=${FIFA.replace(" ","_")}`} ><img src={fifa} alt="Call of Duty Warzone" /></Link>
			        </div>
				</div>
			</div>
 		</div>
		</div>		
		<Footer/>
  	</div>
  )
}

export default Tournois
