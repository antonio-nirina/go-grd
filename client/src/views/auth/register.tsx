import React from "react"
import { Link } from 'react-router-dom'

import Header0 from "../header/header0"
import Infos from "./infos"
import Footer from "../footer/footer"
import "../auth/inscription.css"
import "../../assets/css/style.css"

const Register: React.FC = function() {
  return(
	<div className="inscription">
		<div className="container">
			<Header0/>
			<div className="main">
				<div className="containt">
					<div className="group">
					<h1>Inscription</h1>
						<div className="step">
							<Link to="/register" className="current">Mes infos <span></span></Link>
							<Link to="/game">Mes jeux <span></span></Link>
							<Link to="#">Mes comptes <span></span></Link>
						</div>
						<Infos />
					</div>
				</div>
			</div>
			<Footer/>
		</div>
	</div>
	);
}

export default Register;
