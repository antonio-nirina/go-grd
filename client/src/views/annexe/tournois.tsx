import React from "react"
import { Link } from "react-router-dom"
import Header from "../header/header"
import Footer from "../footer/footer"
import Join from "../join/join"
import { faXbox, faPlaystation } from "@fortawesome/free-brands-svg-icons"
import { faGamepad } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
//import {Translation} from "../../lang/translation"
//import {RootState} from "../../reducer"
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

const Tournois: React.FC = function() {

  return(
  	<div className="container">
  		<Header/>
		<div className="participate anex-tournois">
			<div className="marg">
				<div className="part">
					<div className="undertitle">
						<h2>Tournois</h2>
						<p>Retrouve les derniers tournois public & inscris-toi !</p>
					</div>
					<div className="content">
						<div className="clear"></div>
						<div className="apex block">
							<div>
								<p className="legend">Apex Legends Daily Cup</p><i className="iconGame"><FontAwesomeIcon icon={faXbox}/></i>
							</div>
							<div className="info">
								<p className="price inblock"><i className="sprite cup"></i><span>100€ Cash Prize</span></p>
								<p className="date inblock"><i className="sprite calendar"></i><span>02/04/2021 - 5:00 PM</span></p>
							</div>
						</div>						
					<div className="apex block">
						<div><p className="legend">Fortnite Weekly Cup</p><i className="iconGame"><FontAwesomeIcon icon={faGamepad}/></i></div>
						<div className="info">
							<p className="price inblock"><i className="sprite cup"></i><span>50€ Cash Prize</span></p>
							<p className="date inblock"><i className="sprite calendar"></i><span>03/04/2021 - 5:00 PM</span></p>
						</div>
					</div>
					<div className="apex block">
						<div><p className="legend">Rocket League Champions</p><i className="iconGame"><FontAwesomeIcon icon={faPlaystation}/></i></div>
						<div className="info">
							<p className="price inblock"><i className="sprite ticket"></i><span>5€ Cash Prize</span></p>
							<p className="price inblock"><i className="sprite cup"></i><span>500€ Cash Prize</span></p>
							<p className="date inblock"><i className="sprite calendar"></i><span>04/04/2021 - 7:30 PM</span></p>
						</div>
					</div>
					<div className="apex block">
						<div>
							<p className="legend">Warzone Xbox Daily</p><i className="iconGame"><FontAwesomeIcon icon={faXbox}/></i>
						</div>
						<div className="info">
							<p className="price inblock"><i className="sprite cup"></i><span>100€ Cash Prize</span></p>
							<p className="date inblock"><i className="sprite candar"></i><span>02/04/2021 - 5:00 PM</span></p>
						</div>
					</div>
					<div className="apex block">
						<div><p className="legend">R6 Squad Tournament</p><i className="iconGame"><FontAwesomeIcon icon={faGamepad}/></i></div>
						<div className="info">
							<p className="price inblock"><i className="sprite cup"></i><span>100€ Cash Prize</span></p>
							<p className="date inblock"><i className="sprite calendar"></i><span>02/04/2021 - 5:00 PM</span></p>
						</div>
					</div>
					<div className="apex block last">
						<p className="legend">Fifa 21 fut cup</p>
						<div className="info">
							<p className="inblock"><i className="sprite ticket"></i><span>10€</span></p>
							<p className="inblock"><i className="sprite cup"></i><span>750€ Cash Prize</span></p>
							<p className="inblock"><i className="sprite calendar"></i><span>04/04/2021 - 7:30 PM</span></p>
						</div>
					</div>
					</div>
					<div className="gamecash">
						<div className="lot">
							<p><strong>+250</strong><span>Tournois/Semaine</span></p>
							<p><strong>8</strong><span>Jeux</span></p>
							<p><strong>+2500€</strong><span>Cash prizes/Semaine</span></p>
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
					    <Link to="#"><img src={apexlegends} alt="Apex Legends" /></Link>
					</div>
					<div className="logo-game">
					    <Link to="#"><img src={fortnite} alt="Fortnite" /></Link>
					</div>
					<div className="logo-game">
					    <Link to="#"><img src={rainboxsix} alt="RainbowSIx Siege" /></Link>
					</div>
					<div className="logo-game">
					    <Link to="#"><img src={rocketleague} alt="Rocket League" /></Link>
					</div>
				</div>
      			<div className="lastblock w100">
			        <div className="logo-game">
			            <Link to="#"><img src={cod_Modernwarfare} alt="Call of Duty Modern Warfare" /></Link>
			        </div>
			        <div className="logo-game">
			            <Link to="#"><img src={cod_warzone} alt="Call of Duty Warzone" /></Link>
			        </div>
			        <div className="logo-game">
			            <Link to="#"><img src={cod_coldwar} alt="Call of Duty Cold War" /></Link>
			        </div>
			        <div className="logo-game">
			            <Link to="#"><img src={fifa} alt="Call of Duty Warzone" /></Link>
			        </div>
				</div>
			</div>
 		</div>
		</div>
		<div className="tabs-content">
			<div className="tab-league">
				<h3>Tous les tournois</h3>
				<div className="filter-bar">
					<div className="custom-select filters">
						<select className="slot">
							<option value="">Slot</option>
						    <option value="">32</option>
						    <option value="">16</option>
						    <option value="">64</option>								    
						    <option value="">128</option>
						</select>
					</div>
					<div className="custom-select filters">
						<select className="filter-game">
							<option value="">Jeux</option>
						    <option value="">Apex Legends</option>
						    <option value="">Leagues of Legend</option>
						</select>
					</div>
				</div>
				<table className="tab-bloc">
					<tr>
						<th>Slot</th>
						<th>Organisateur</th>
						<th>Type</th>
						<th>Prix</th>
						<th>Jeu</th>
						<th></th>
					</tr>
					<tr>
						<td>32</td>
						<td>ESL PRO</td>
						<td>Ligue</td>
						<td>1500 $</td>
						<td></td>
						<td><Link to="#">Info</Link></td>
					</tr>
					<tr>
						<td>16</td>
						<td>ESL</td>
						<td>Ligue</td>
						<td>1000 $</td>
						<td></td>
						<td><Link to="#">Info</Link></td>
					</tr>
					<tr>
						<td>64</td>
						<td>Major League</td>
						<td>Ligue</td>
						<td>Merch</td>
						<td></td>
						<td style={{width:"70px"}}><Link to="#">Info</Link></td>
					</tr>
				</table>
			</div>
		</div>				
		<Join/>
		<Footer/>
  	</div>
  )
}

export default Tournois
