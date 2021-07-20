import React from "react"
import { Link } from 'react-router-dom'

import Header from "../header/header"
import Footer from "../footer/footer"
import "../../assets/css/style.css"
import "../league/league.css"

import apexlegends from "../../assets/image/apex-legends.png"
import fortnite from "../../assets/image/fortnite.png"
import rainboxsix from "../../assets/image/rainbowsix.png"
import rocketleague from "../../assets/image/rocketleague.png"
import cod_Modernwarfare from "../../assets/image/modernwarfare.png"
import cod_warzone from "../../assets/image/warzone.png"
import cod_coldwar from "../../assets/image/cod-coldwar.png"
import fifa from "../../assets/image/fifa21.png"

const League: React.FC = function() {
	
  return(
    <div className="Tournament league">
		<div className="container">
			<Header/>
			<div className="full-container">
				<div className="banniere"></div>
					<div className="tabs-content">
						<div className="tab-league">
							<h3>Toutes les ligues</h3>
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
			<Footer/>
		</div>
    </div>
  );
}

export default League;
