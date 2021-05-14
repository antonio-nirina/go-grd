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
				<h1>Liste des tournois disponibles</h1>
				<h2>Tournois en direct (15)</h2>
				<div className="bt-container"><Link to="#" className="btn bg-yellow">Voir plus</Link></div>
				<div className="live side">					
					<Link to="#">
						<div className="items">
							<img src="https://i.ibb.co/Vw39G5b/championship-rl.jpg" alt="championship-rl" className="imgresp"/>
							<div className="side-infos">
								<div className="meta">
									<table>
										<tr>
											<th>Date</th>
											<th>Equipe</th>
											<th>Genre</th>
											<th>Région</th>								
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
									<p>Tournois Rocket League</p>
								</div>
								<div className="prize-section">
									<div className="prize-warp"><i></i>Prix</div>
									<div className="prize">100€ Prix Cache</div>
								</div>								
							</div>
							<div className="btn-full">
								<a className="signup-btn bg-yellow">Inscrivez vous</a>
							</div>
						</div>
					</Link>
				</div>
				<div className="upcoming side">
					<div className="items"></div>
				</div>
			</div>
			<Footer/>
		</div>		
    </div>    
  )
}

export default Tournament
