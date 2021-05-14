import React from "react"
import { Link } from "react-router-dom"
import Header from "../header/header"
import Footer from "../footer/footer"

import "../tournament/tournament.css"
import "../../assets/css/style.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlaystation } from "@fortawesome/free-brands-svg-icons"
import { faCalendarAlt, faInfoCircle, faGamepad, faTrophy, faMedal, faStepBackward, faStepForward, faChevronRight, faChevronLeft, faMobile } from "@fortawesome/free-solid-svg-icons"


const Tournament: React.FC = function(props:any) {
	
  return(
  	<div className="Tournament">
		<div className="container">
			<Header/>
			<div className="full-container">				
				<h1>Liste des tournois disponibles</h1>
				<div className="card">
					<h2>Tournois en direct (15)</h2>
					<div className="bt-container">
						<Link to="#" className="btn bg-yellow">Voir plus</Link>
					</div>
					<div className="live side">					
						<Link to="/" title="">
							<div className="items">
								<div className="side-img">
									<img src="https://i.ibb.co/Vw39G5b/championship-rl.jpg" alt="championship-rl"/>
								</div>
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
										<div className="prize-warp"><i className="awesome"><FontAwesomeIcon icon={faTrophy}/></i>Prix</div>
										<div className="prize">-</div>
									</div>								
								</div>
								<div className="btn-full">
									<Link to="/" className="signup-btn bg-yellow">Inscrivez vous</Link>
								</div>
							</div>
						</Link>						
					</div>	
					<div className="live side">					
						<Link to="/" title="">
							<div className="items">
								<div className="side-img">
									<img src="https://i.ibb.co/Vw39G5b/championship-rl.jpg" alt="championship-rl"/>
								</div>
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
										<div className="prize-warp"><i className="awesome"><FontAwesomeIcon icon={faTrophy}/></i>Prix</div>
										<div className="prize">-</div>
									</div>								
								</div>
								<div className="btn-full">
									<Link to="/" className="signup-btn bg-yellow">Inscrivez vous</Link>
								</div>
							</div>
						</Link>						
					</div>
					<div className="live side">					
						<Link to="/" title="">
							<div className="items">
								<div className="side-img">
									<img src="https://i.ibb.co/Vw39G5b/championship-rl.jpg" alt="championship-rl"/>
								</div>
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
										<div className="prize-warp"><i className="awesome"><FontAwesomeIcon icon={faTrophy}/></i>Prix</div>
										<div className="prize">-</div>
									</div>								
								</div>
								<div className="btn-full">
									<Link to="/" className="signup-btn bg-yellow">Inscrivez vous</Link>
								</div>
							</div>
						</Link>						
					</div>
					</div>
				<div className="card">
					<h2>Tournois à venir (9)</h2>
					<div className="bt-container">
						<Link to="#" className="btn bg-yellow">Voir plus</Link>
					</div>
					<div className="upcomming side">					
						<Link to="/" title="">
							<div className="items">
								<div className="side-img">
									<img src="https://i.ibb.co/Vw39G5b/championship-rl.jpg" alt="championship-rl"/>
								</div>
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
										<div className="prize-warp"><i className="awesome"><FontAwesomeIcon icon={faTrophy}/></i>Prix</div>
										<div className="prize">100€ Prix Cache</div>
									</div>								
								</div>
								<div className="btn-full">
									<Link to="/" className="signup-btn bg-yellow">Inscrivez vous</Link>
								</div>
							</div>
						</Link>						
					</div>
					<div className="upcomming side">					
						<Link to="/" title="">
							<div className="items">
								<div className="side-img">
									<img src="https://i.ibb.co/Vw39G5b/championship-rl.jpg" alt="championship-rl"/>
								</div>
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
										<div className="prize-warp"><i className="awesome"><FontAwesomeIcon icon={faTrophy}/></i>Prix</div>
										<div className="prize">100€ Prix Cache</div>
									</div>								
								</div>
								<div className="btn-full">
									<Link to="/" className="signup-btn bg-yellow">Inscrivez vous</Link>
								</div>
							</div>
						</Link>						
					</div>	
					<div className="upcomming side">					
						<Link to="/" title="">
							<div className="items">
								<div className="side-img">
									<img src="https://i.ibb.co/Vw39G5b/championship-rl.jpg" alt="championship-rl"/>
								</div>
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
										<div className="prize-warp"><i className="awesome"><FontAwesomeIcon icon={faTrophy}/></i>Prix</div>
										<div className="prize">100€ Prix Cache</div>
									</div>								
								</div>
								<div className="btn-full">
									<Link to="/" className="signup-btn bg-yellow">Inscrivez vous</Link>
								</div>
							</div>
						</Link>						
					</div>		
					</div>
			</div>				
			<Footer/>
		</div>		
    </div>    
  )
}

export default Tournament
