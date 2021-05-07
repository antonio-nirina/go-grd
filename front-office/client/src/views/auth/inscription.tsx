import React from "react"
import Header0 from "../header/header0"
import Footer from "../footer/footer"
import joystick from "../../assets/image/joystick.png"
import IconXbox from "../../assets/image/icon-xbox.png"
import IconPs from "../../assets/image/playstation.png"
import "../auth/inscription.css"
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
						<button className="btn bg-yellow mg15"><a href="#" title="Inscription" className="link-btn">Inscription</a></button>
						<div className="infos">
							<p className="mb15">Vous avez déjà un compte ? <a href="#" title="Connectez-vous" className="italic cl-yellow">Connectez-vous !</a></p>
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

export default Inscription;