import React from "react"
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'

import {Translation} from "../../lang/translation"
import {RootState} from "../../reducer"

import Header from "../header/header"
import Footer from "../footer/footer"
import "../../assets/css/style.css"
import "../league/league.css"


const League: React.FC = function() {
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
  return(
    <div className="Tournament league">
		<div className="container">
			<Header/>
			<div className="full-container">
				<div className="banniere"></div>				
				<div className="tableau">					
					<div className="filters">
						<p>Ligues <span>NORDIC</span></p>
					</div>
					<table>
						<tr>
							<th>Créateur</th>
							<th>Average</th>
							<th></th>
							<th>Status</th>
							<th>Game</th>
							<th>Vue</th>
							<th>Join</th>
						</tr>
						<tr>
							<td>Blixt</td>
							<td></td>
							<td>1450</td>
							<td>9/10 <p>Picking 21:01</p></td>
							<td>League of legends</td>
							<td>4</td>
							<td>Open Lobby</td>
						</tr>
					</table>
					<div className="startleague">
						<p>Inviter vos amis et jouer maintenant !</p>
						<Link to="#" className="btn bg-yellow">Créer une ligue</Link>
						<Link to="#" className="btn bg-yellow">Commencer une partie</Link>
						<Link to="#" className="btn bg-white">Créer un 1v1</Link>
					</div>
					</div>		
				</div>
					
			<Footer/>
		</div>
    </div>
  );
}

export default League;
