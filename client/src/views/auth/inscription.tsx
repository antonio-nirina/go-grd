import React from "react"
import { Link } from 'react-router-dom'

import Header0 from "../header/header0"
import Footer from "../footer/footer"
import joystick from "../../assets/image/joystick.png"
import IconXbox from "../../assets/image/icon-xbox.png"
import IconPs from "../../assets/image/playstation.png"
import "../auth/login.css"
import "../../assets/css/style.css"

const Inscription: React.FC = function() {
  return(
	<div className="inscription">
		<div className="container">
			<Header0/>
			<div className="main">
				<div className="containt">
					<div className="group">
					<h1>Inscription <img src={joystick} alt=""/></h1>
						<input className="mgt10" type = "text" placeholder = "Ton nom"/>
						<input className="mgt10" type = "text" placeholder = "Pseudo"/>
						{/*<input type ="telephone" placeholder = "Numéro de téléphone"/>*/}
						<input className="mgt10" type = "email" placeholder = "Email"/>
						<input className="mgt10" type = "password" placeholder = "Mot de passe"/>
						<button className="btn bg-red mg15"><Link to="/inscription" title="Inscription">Inscription</Link></button>
						<div className="infos">
							<p className="mb15">Vous avez déjà un compte ? <Link to="/login" title="Connectez-vous" className="italic cl-red">Connectez-vous !</Link></p>
							<div className="other-account">
								<p>Connectez-vous avec votre compte : </p>
								<span><Link to="/" title="Xbox"><img src={IconXbox} alt=""/></Link></span>
								<span><Link to="/" title="Playstation"><img src={IconPs} alt=""/></Link></span>
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

export default Inscription;