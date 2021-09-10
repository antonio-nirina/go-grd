import React from "react"
import { Link } from "react-router-dom"
import {useHistory } from "react-router-dom"
import { faXbox } from "@fortawesome/free-brands-svg-icons"
import { faGamepad, faTrophy } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Header from "../header/header"
import Footer from "../footer/footer"
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

const Waggers: React.FC = function() {
	const history = useHistory()
  return(
  	<div className="container">
  		<Header />
  		<div className="participate league waggers" onClick={()=>{history.push(`/joingame?uid=${11111}`)}} style={{"cursor":"pointer"}}>
			<div className="marg">
				<div className="part">
					<div className="upcomming side">
						<div className="items">
							<div className="side-img" style={{ background: `url(${apexlegends})`}}></div>
							<div className="side-infos">
								<div className="meta">
									<table>
										<thead>
											<tr>
												<td>Format</td>
												<td>Console</td>
												<td>Participation</td>
												<td>Prix</td>												
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>BO3</td>
												<td>Ps4</td>
												<td>30 €</td>
												<td>500 €</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div className="name-section">
									<p>Waggers</p>
								</div>
								<div className="name-section">
									<p>
										<span>Apex Legends </span>
										<span className="platform-logo">ps4</span>
									</p>
								</div>
									<div className="prize-section">
										<div className="prize-warp">
											<i className="awesome"><FontAwesomeIcon icon={faTrophy}/></i>												
											prix
										</div>
										<div className="prize" style={{"fontWeight":"bold"}}>
											500 € 
										</div>
									</div>
								</div>
								<div className="btn-full">
									<Link to="/" className="signup-btn bg-red">Inscrivez-vous</Link>
								</div>
							</div>
						</div>
						<div className="undertitle">
							<h2>Wagers</h2>
							<p>Derniers résultats en Wagers</p>
						</div>
						<div className="content waggers-link">
							<div className="clear"></div>
							<Link to ="/joingame/1">
								<div className="apex block dark-red">
									<div>
										<p className="legend">Apex Legends Daily Cup</p><i className="iconGame"><FontAwesomeIcon icon={faXbox}/></i>
									</div>
									<div className="info">
										<p className="price inblock"><i className="sprite cup"></i><span>100€ Cash Prize</span></p>
										<p className="date inblock"><i className="sprite calendar"></i><span>02/04/2021 - 5:00 PM</span></p>
									</div>
								</div>
							</Link>
							<Link to ="/joingame/2">
								<div className="apex block dark-red">
									<div><p className="legend">Fortnite Weekly Cup</p><i className="iconGame"><FontAwesomeIcon icon={faGamepad}/></i></div>
									<div className="info">
										<p className="price inblock"><i className="sprite cup"></i><span>50€ Cash Prize</span></p>
										<p className="date inblock"><i className="sprite calendar"></i><span>03/04/2021 - 5:00 PM</span></p>
									</div>
								</div>
							</Link>
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
						    <Link to={`/waggers-game?game=${APEX_LEGENDE.replace(" ","_")}`}><img src={apexlegends} alt="Apex Legends" /></Link>
						</div>
						<div className="logo-game">
						    <Link to={`/waggers-game?game=${FORTNITE.replace(" ","_")}`} ><img src={fortnite} alt="Fortnite" /></Link>
						</div>
						<div className="logo-game">
						    <Link to={`/waggers-game?game=${RNB.replace(" ","_")}`} ><img src={rainboxsix} alt="RainbowSIx Siege" /></Link>
						</div>
						<div className="logo-game">
						    <Link to={`/waggers-game?game=${RL.replace(" ","_")}`} ><img src={rocketleague} alt="Rocket League" /></Link>
						</div>
					</div>
	      			<div className="lastblock w100">
				        <div className="logo-game">
				            <Link to={`/waggers-game?game=${COD_MODERN.replace(" ","_")}`} ><img src={cod_Modernwarfare} alt="Call of Duty Modern Warfare" /></Link>
				        </div>
				        <div className="logo-game">
				            <Link to={`/waggers-game?game=${COD_WAR_ZONE.replace(" ","_")}`} ><img src={cod_warzone} alt="Call of Duty Warzone" /></Link>
				        </div>
				        <div className="logo-game">
				            <Link to={`/waggers-game?game=${COD_COLD_WAR.replace(" ","_")}`} ><img src={cod_coldwar} alt="Call of Duty Cold War" /></Link>
				        </div>
				        <div className="logo-game">
				            <Link to={`/waggers-game?game=${FIFA.replace(" ","_")}`} ><img src={fifa} alt="Call of Duty Warzone" /></Link>
				        </div>
					</div>
				</div>
	 		</div>
		</div>
		<Footer/>
  	</div>
  )
}

export default Waggers
