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
					<li><Link to ="#">Apex Legends</Link></li>
					<li><Link to ="#">Call of Duty : Warzone</Link></li>
					<li><Link to ="#">Call of Duty : Cold War</Link></li>
					<li><Link to ="#">Rocket League</Link></li>
					<li><Link to ="#">Fifa</Link></li>
				</div>
			</div>
			<div className="link">
				<h3><Link to ="/aide-social">Problème Social</Link></h3>
				<div className="link">
					<li><Link to ="#">Amis</Link></li>
					<li><Link to ="#">Chat</Link></li>
					<li><Link to ="#">GOGRIND App</Link></li>
					<li><Link to ="#">Hightlight</Link></li>		  							
				</div>
			</div>
			<div className="link">
				<h3><Link to ="/aide-connexion">Problème de connexion</Link></h3>
				<div className="link">
					<li><Link to ="#">Identifiant oublié</Link></li>
					<li><Link to ="#">Liaison console</Link></li>
					<li><Link to ="#">Impossible de rejoindre un lobby</Link></li>		  							
				</div>
			</div>
			
			<div className="link">
				<h3><Link to ="/contact">Contact</Link></h3>
			</div>
		</div>
	);
}

export default aside;

