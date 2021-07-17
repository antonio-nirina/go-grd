import React from "react"
import { Link } from "react-router-dom"
import Header from "../header/header"
import Footer from "../footer/footer"
import Join from "../join/join"
import { faGamepad, faTrophy } from "@fortawesome/free-solid-svg-icons"
import { faXbox, faPlaystation} from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import "../../assets/css/style.css"
import "../annexe/ligue.css"

import apexlegends from "../../assets/image/apex-legends.png"
import fortnite from "../../assets/image/fortnite.png"
import rainboxsix from "../../assets/image/rainbowsix.png"
import rocketleague from "../../assets/image/rocketleague.png"
import cod_Modernwarfare from "../../assets/image/modernwarfare.png"
import cod_warzone from "../../assets/image/warzone.png"
import cod_coldwar from "../../assets/image/cod-coldwar.png"
import fifa from "../../assets/image/fifa21.png"
import championship from "../../assets/image/championship.jpeg"

const Ligue: React.FC = function() {

  return(
  	<div className="container">
  		<Header/>
  		<div className="full-container">
			<h1>Liste des ligues disponibles</h1>				
			<div className="card">
				<h2>Ligues (2)</h2>
				<div className="bt-container">
					<Link to="#" className="btn bg-red">Voir plus</Link>
				</div>
				<div className="upcomming side">
					<Link to="/info" title="">
						<div className="items">
							<div className="side-img">
								<img src={championship} alt="championship-rl"/>
							</div>
							<div className="side-infos">
								<div className="meta">
									<table>
										<thead>
											<tr>
												<td>Slot</td>
												<td>Organisateur</td>
												<td>Type</td>
												<td>Jeux</td>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>32</td>
												<td>ESL PRO</td>
												<td>Ligue</td>
												<td>Rocketleague</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div className="name-section">
									<p>Ligue</p>
								</div>
								<div className="prize-section">
									<div className="prize-warp"><i className="awesome"><FontAwesomeIcon icon={faTrophy}/></i>Prix</div>
									<div className="prize">1500$ Prix Cache</div>
								</div>
							</div>
							<div className="btn-full">
								<Link to="/" className="signup-btn bg-red">Inscrivez vous</Link>
							</div>
						</div>
					</Link>
				</div>
				<div className="upcomming side">
					<Link to="/info" title="">
						<div className="items">
							<div className="side-img">
								<img src={championship} alt="championship-rl"/>
							</div>
							<div className="side-infos">
								<div className="meta">
									<table>
										<thead>
											<tr>
												<td>Slot</td>
												<td>Organisateur</td>
												<td>Type</td>
												<td>Jeux</td>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>16</td>
												<td>ESL</td>
												<td>Ligue</td>
												<td>Rocketleague</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div className="name-section">
									<p>Ligue</p>
								</div>
								<div className="prize-section">
									<div className="prize-warp"><i className="awesome"><FontAwesomeIcon icon={faTrophy}/></i>Prix</div>
									<div className="prize">1000$ Prix Cache</div>
								</div>
							</div>
							<div className="btn-full">
								<Link to="/" className="signup-btn bg-red">Inscrivez vous</Link>
							</div>
						</div>
					</Link>
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
 		<div className="participate league">
			<div className="marg">
				<div className="part">
					<div className="undertitle">
						<h2>Ligues</h2>
						<p>Retrouve les derniers tournois public & inscris-toi !</p>
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
				</div>

				</div>
			</div>			
		</div>		
		</div>		
		<Footer/>
  	</div>
  )
}

export default Ligue
