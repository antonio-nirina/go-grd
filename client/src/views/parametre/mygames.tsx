import React from "react"
import { Link } from 'react-router-dom'

import { useSelector } from "react-redux"
import Header from "../header/header"
import Footer from "../footer/footer"
import "../parametre/parametre.css"

import Fortnite from "../../assets/image/game/fortnite.jpg"
import RocketLeague from "../../assets/image/game/rocketleague.jpg"

const Mygames: React.FC = function() {
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
  return(
	<div className="leaderboard settings jackpot mygames">
		<div className="container">
			<Header/>
			<div className="main">
				<div className="containt">
					<h2>Paramètres</h2>
					<div className="title-lead">						
						<div className="menu-left">
							<ul>
								<li>
									<Link to="/parametre">Mes infos</Link>
								</li>
								<li>
									<Link to="/jackpot">Ma cagnotte</Link>
								</li>
								<li className="active_link">
									<Link to="mygames">Mes jeux</Link>
								</li>
								<li>
									<Link to="#">Assistance</Link>
								</li>
							</ul>
						</div>
						<div className="personal-infos">
							<div className="personal">
								<h3>Mes jeux</h3>
								<div className="personal-account">
									<div className="historical">									
										<span>EPIC GAMES</span>																		
									</div>
									<div className="account-games">
										<div className="data-perso">
											<p>Compte<span>Twitch_Skouinar</span></p>
											<p>E-mail<span>Skouinar@gmail.com</span></p>											
										</div>
										<div className="mygame-list">
											<img src={Fortnite} alt=""/>
											<img src={RocketLeague} alt=""/>
										</div>
									</div>								
								</div>
								<div className="personal-account">
									<div className="historical">									
										<span>EPIC GAMES</span>																		
									</div>
									<div className="account-games">
										<div className="data-perso">
											<p>Compte<span>Twitch_Skouinar</span></p>
											<p>E-mail<span>Skouinar@gmail.com</span></p>
											<button className="btn bg-red">connect with uplay</button>
										</div>
										<div className="mygame-list">
											<img src={Fortnite} alt=""/>
											<img src={RocketLeague} alt=""/>
											<img src={RocketLeague} alt=""/>
										</div>
									</div>								
								</div>
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

export default Mygames;
