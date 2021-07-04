import React from "react"
import { Link } from "react-router-dom"
import Header from "../header/header"
import Footer from "../footer/footer"
import Join from "../join/join"

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

const Ligue: React.FC = function() {

  return(
  	<div className="container">
  		<Header/>
		<div className="participate league">
			<div className="marg">
				<div className="part">
					<div className="undertitle">
						<h2>Ligues</h2>
						<p>Retrouve les derniers tournois public & inscris-toi !</p>
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
		<Join/>
		<Footer/>
  	</div>
  )
}

export default Ligue
