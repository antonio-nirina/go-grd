import React from "react"

import Header0 from "../header/header0"
import Footer from "../footer/footer"
import "../auth/login.css"
import "../../assets/css/style.css"
import { faXbox, faPlaystation } from "@fortawesome/free-brands-svg-icons"
import { faGamepad } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import joystick from "../../assets/image/joystick.png"

const Login: React.FC = function() {
  return(
	<div className="login">
		<div className="container">
			<Header0/>
			<div className="main">
				<div className="containt">
					
					<div className="group">					
					<h1>Connexion <a href="#"><img src={joystick} alt=""/></a></h1>
						<input className="mgt10" type = "email" placeholder = "Ton email"/>
						<input type ="text" placeholder = "Ton mot de passe"/>
						<button className="btn bg-yellow mg15">Se connecter</button>
						<div className="infos">
							<p className="mb15">Vous n'avez pas encore de compte ? <a href="#" title="Inscrivez-vous" className="italic cl-yellow">Inscrivez-vous !</a></p>
							<p className="mb15"><a href="#" title="Mot de passe oublié ?" className="italic cl-yellow">Mot de passe oublié ?</a></p>
							<div className="other-account">
								<p>Connectez-vous avec votre compte : </p>
								<a href="#" title="Playstation"><i className="iconG"><FontAwesomeIcon icon={faXbox}/></i></a>
								<a href="#" title="Xbox"><i className="iconG"><FontAwesomeIcon icon={faPlaystation}/></i></a>
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

export default Login;
