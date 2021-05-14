import React from "react"
import { Link } from "react-router-dom"
import Header from "../header/header"
import Footer from "../footer/footer"

import "../tournament/tournament.css"
import "../../assets/css/style.css"


const Tournament: React.FC = function(props:any) {
	
  return(
  	<div className="Tournament">
		<div className="container">
			<Header/>
			<div className="full-container">
				<h2>Tournois en direct (15)</h2>
				<div className="bt-container"><Link to="#" className="btn bg-yellow">Voir plus</Link></div>
				<div className="live">					
					<Link to="#">
						<div className="items">

							<div className="meta">
								<table>
									<tr>
										<th>Date</th>
										<th>Equipe</th>
										<th>Genre</th>
										<th>Genre</th>								
									</tr>
									<tr>
										<td>19 Jan 17:00</td>
										<td>12/16</td>
										<td>5 ON 5</td>
										<td>France</td>
									</tr>
								</table>								
							</div>
							<div className="name-section">
								<p>EMSL saison 2</p>
							</div>
							<div className="prize-section">
								<div className="prize-warp">Prize</div>
							</div>
							<a className="signup-btn">Inscrivez vous</a>
						</div>
					</Link>
				</div>
				<div className="upcoming">
					<div className="items"></div>
				</div>
			</div>
			<Footer/>
		</div>		
    </div>    
  )
}

export default Tournament
