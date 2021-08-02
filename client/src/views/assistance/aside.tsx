import React from "react"
import { Link } from "react-router-dom"

import "../../assets/css/style.css"
import "../assistance/assistance.css"


const aside: React.FC = function() {	
	return(
	  	<div className="support-link">
			<div className="link">
				<h3><Link to ="/assistance">Accueil</Link></h3>
			</div>
			<div className="link">
				<h3><Link to ="/aide-in-game">Problème In-Game</Link></h3>
				<div className="link">
					<li><Link to ="/aide-in-game/#apex-legends">Apex Legends</Link></li>
					<li><Link to ="/aide-in-game/#call-of-duty">Call of Duty : Warzone</Link></li>
					<li><Link to ="/aide-in-game/#cold-war">Call of Duty : Cold War</Link></li>
					<li><Link to ="/aide-in-game/#rocket-league">Rocket League</Link></li>
					<li><Link to ="/aide-in-game/#fifa">Fifa</Link></li>
				</div>
			</div>
			<div className="link">
				<h3><Link to ="/aide-social">Problème Social</Link></h3>
				<div className="link">
					<li><Link to ="/aide-social/#amis">Amis</Link></li>
					<li><Link to ="/aide-social/#chat">Chat</Link></li>
					<li><Link to ="/aide-social/#go-grind-app">GOGRIND App</Link></li>
					<li><Link to ="/aide-social/#hight-light">Hightlight</Link></li>		  							
				</div>
			</div>
			<div className="link">
				<h3><Link to ="/aide-connexion">Problème de connexion</Link></h3>
				<div className="link">
					<li><Link to ="/aide-connexion/#forgot-pass">Identifiant oublié</Link></li>
					<li><Link to ="/aide-connexion/#console-link">Liaison console</Link></li>
					<li><Link to ="/aide-connexion/#lobby">Impossible de rejoindre un lobby</Link></li>		  							
				</div>
			</div>
			
			<div className="link">
				<h3><Link to ="/contact">Contact</Link></h3>
			</div>
		</div>
	);
}

export default aside;

