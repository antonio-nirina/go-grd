import React from "react"
import { Link } from 'react-router-dom'

import Header0 from "../header/header0"
import GameList from "./game-list"
import Footer from "../footer/footer"
import "../auth/inscription.css"
import "../../assets/css/style.css"

const Game: React.FC = function() {

  return(
	<div className="inscription">
		<div className="container">
			<Header0/>
			<div className="main">
				<div className="containt">
					<div className="group">
					<h1>Inscription</h1>
						<div className="step">
							<Link to="register">Mes infos <span></span></Link>
							<Link to="/game" className="current">Mes jeux <span></span></Link>
							<Link to="/account">Mes comptes <span></span></Link>
						</div>
						<GameList />
					</div>
				</div>
			</div>
			<Footer/>
		</div>
	</div>
	);
}

export default Game;
