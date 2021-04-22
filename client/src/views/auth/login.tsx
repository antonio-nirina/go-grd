import React from "react"
import { Link } from 'react-router-dom'
import Header0 from "../header/header0"
import Footer from "../footer/footer"
import joystick from "../../assets/image/joystick.png"
import IconXbox from "../../assets/image/icon-xbox.png"
import IconPs from "../../assets/image/playstation.png"
import "../auth/login.css"
import "../../assets/css/style.css"

const Login: React.FC = function() {
  return(
	<div className="login">
		<div className="container">
			<Header0/>
			<div className="main">
				<div className="containt">
					
					<div className="group">					
					<h1>Connexion <img src={joystick} alt=""/></h1>
						<input className="mgt10" type = "email" placeholder = "Ton email"/>
						<input type ="password" placeholder = "Ton mot de passe"/>
						<button className="btn bg-yellow mg15"><Link to="/" className="link-btn"> Se connecter</Link></button>
						<div className="infos">
							<p className="mb15">Vous n'avez pas encore de compte ? <Link to = "/inscription" title="Inscrivez-vous" className="italic cl-yellow">Inscrivez-vous !</Link></p>
							<p className="mb15"><a href="#" title="Mot de passe oublié ?" className="italic cl-yellow">Mot de passe oublié ?</a></p>
							<div className="other-account">
								<p>Connectez-vous avec votre compte : </p>
								<a href="#" title="Xbox"><img src={IconXbox} alt=""/></a>
								<a href="#" title="Playstation"><img src={IconPs} alt=""/></a>
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
