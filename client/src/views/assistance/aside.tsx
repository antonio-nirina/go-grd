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
				<h3><Link to ="#apex-legends">Problème In-Game</Link></h3>
				<div className="link">
					<li><Link to ="#apex-legends">Apex Legends</Link></li>
					<li><Link to ="#call-of-duty">Call of Duty : Warzone</Link></li>
					<li><Link to ="#cold-war">Call of Duty : Cold War</Link></li>
					<li><Link to ="#rocket-league">Rocket League</Link></li>
					<li><Link to ="#fifa">Fifa</Link></li>
				</div>
			</div>
			<div className="link">
				<h3><Link to ="#amis">Problème Social</Link></h3>
				<div className="link">
					<li><Link to ="#amis">Amis</Link></li>
					<li><Link to ="#chat">Chat</Link></li>
					<li><Link to ="#go-grind-app">GOGRIND App</Link></li>
					<li><Link to ="#hight-light">Hightlight</Link></li>		  							
				</div>
			</div>
			<div className="link">
				<h3><Link to ="#forgot-pass">Problème de connexion</Link></h3>
				<div className="link">
					<li><Link to ="#forgot-pass">Identifiant oublié</Link></li>
					<li><Link to ="#console-link">Liaison console</Link></li>
					<li><Link to ="#lobby">Impossible de rejoindre un lobby</Link></li>		  							
				</div>
			</div>
			
			<div className="link">
				<h3><Link to ="/contact">Contact</Link></h3>
			</div>
		</div>
	);
}

export default aside;

