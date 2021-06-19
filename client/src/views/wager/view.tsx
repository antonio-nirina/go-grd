import React from "react"
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'

import {Translation} from "../../lang/translation"
import {RootState} from "../../reducer"

import Header from "../header/header"
import Join from "../join/join"
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
import AvatarDefault from "../../assets/image/game-tag.png"

const League: React.FC = function() {
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
  return(
    <div className="Tournament league wagers view">
		<div className="container">
			<Header/>
			<div className="full-container">
				<div className="ban">
					<div className="versus-container">
						<div className="team">
							<div className="info">
								<span>team</span>
								<p className="profilname">HammyZZ</p>
								<p><span>2113 </span>Average rating</p>
							</div>
							<img src={AvatarDefault} />
						</div>
						<div className="live">
							<p><span>Live</span>9:22</p>
						</div>
						<div className="team">
						<div className="info">
								<span>team</span>
								<p className="profilname">rainDrop</p>
								<p><span>2185 </span>Average rating</p>
							</div>
							<img src={AvatarDefault} />
						</div>
					</div>
				</div>
					<div className="tabs-content">
						<div className="tab-league">							
							<table className="tab-bloc">
								<tr>
									<th>Creator</th>
									<th>Tournois Name</th>
									<th>Status</th>
									<th>Twitch</th>
									<th>Join</th>
									
								</tr>
								<tr>
									<td>Alittoo</td>
									<td>ESL PRO</td>
									<td>5/10</td>
									<td>50</td>									
									<td><Link to="view">View</Link></td>
								</tr>
								<tr>
									<td>16</td>
									<td>ESL</td>
									<td>Ligue</td>
									<td>1000 $</td>									
									<td><Link to="/view">View</Link></td>
								</tr>
								<tr>
									<td>64</td>
									<td>Major League</td>
									<td>Ligue</td>
									<td>Merch</td>									
									<td style={{width:"100px"}}><Link to="/view">View</Link></td>
								</tr>
							</table>
						</div>
					</div>
				</div>		
			</div>
			<Footer/>	
		</div>
  );
}

export default League;
