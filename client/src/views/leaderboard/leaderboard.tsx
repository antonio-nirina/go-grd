import React from "react"

import Header from "../header/header"
import Footer from "../footer/footer"
import "../leaderboard/leaderboard.css"

import King from "../../assets/image/icons/king.jpg"

type Inputs = {
	password: string,
	email:string
	username: string
}

const Leaderboard: React.FC = function() {
	
  return(
	<div className="leaderboard">
		<div className="container">
			<Header/>
			<div className="main">
				<div className="containt">
					<h2>Leaderboard</h2>
					<div className="title-lead">						
						<div className="title-game-list">
							<div className="game-list-name go">
								<span>Go Grind</span>
							</div>
							<div className="game-list-name">
								<span>Apex Legends</span>
								<span>Rocket League</span>
							</div>
							<div className="game-list-name">
								<span>COD : Cold War</span>
								<span>R6 : Siège</span>
							</div>
							<div className="game-list-name">
								<span>COD : Vanguard</span>
								<span>Fortnite</span>
							</div>
							<div className="game-list-name">
								<span>COD : Warzone</span>
								<span>FIFA 22</span>
							</div>
						</div>
					</div>
					<div className="gamers-stats">
						<span className="first">Position</span>
						<span>Player</span>
						<span>GG points</span>
						<span>Events played</span>
					</div>
					<div className="classement">		
						<div className="classement-list">
							<span className="first">1</span>
							<span className="lead">
								<img src={King} alt="" width="19"/>
								<strong>Gotaga</strong>
							</span>
							<span>7845 pts</span>
							<span>12541</span>
						</div>
						<div className="classement-list">
							<span>2</span>
							<span>								
								<strong>Killer1548</strong>
							</span>
							<span>6928 pts</span>
							<span>11849</span>
						</div>
					</div>
				</div>
			</div>
			<Footer/>
		</div>
	</div>
	);
}

export default Leaderboard;
