import React,{useState} from "react"
import { Link } from 'react-router-dom'

import Header0 from "../header/header0"
import {Translation} from "../../lang/translation"
import Footer from "../footer/footer"
import "../auth/initpass.css"
import "../../assets/css/style.css"


const InitPass: React.FC = function() {
	const [errorForm,setErrorForm] = useState<boolean>(false)

  return(
	<div className="login initpass">
		<div className="container">
			<Header0/>
			<div className="main">
				<div className="containt">
					<div className="group">
					<h2>
						Mot de passe oublié
					</h2>
						<div>
							<span style={{"color":"red"}}>{errorForm ? Translation("fr").login.errorForm : ""}</span>
						</div>
						<div className="register-field">
							<div className="alert alert-success text-center">{!errorForm ? "" : "Un mail de changement de mot de passe vous a été envoyé"}</div>
							<div className="center-width">
								<span className="major">Mot de passe changé avec succès</span>
							</div>
							<div className="fieldset changed">
								<div className="field-container">
									<div className="center-width field-container">
										<div className="infos">
											<p className="member"><Link to = "/login" title="Se connecter">Se connecter</Link></p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer/>
		</div>
	</div>
	)
}

export default InitPass;
