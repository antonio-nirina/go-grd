import React from "react"

import Header from "../header/header"
import Footer from "../footer/footer"

import "../../assets/css/style.css"
import "../assistance/assistance.css"


const Contact: React.FC = function() {
  return(
  	<div className="assistance">
	    <div className="container">
	  		<Header/>
	  		<div className="main">
	  			<div className="block-center">
		  			<div className="support auto-height">

		  				<div className="support-container">
		  					<div className="under-title">
		  						<p className="medium">Contactez-nous</p>
		  						<p className="light">Nous sommes à votre disposition pour répondre à vos questions</p>
		  					</div>
		  					<form>
			  					<div className="input-container side-by">
			  						<div className="input-group">
			  							<label htmlFor="name">Nom</label>
			  							<input type="text" placeholder="Votre nom" id="name"/>
			  						</div>
			  						<div className="input-group">
			  							<label htmlFor="lastname">Prénom</label>
			  							<input type="text" id="lastname" placeholder="Votre prénom"/>
			  						</div>
			  					</div>
			  					<div className="input-container">
			  						<div className="input-container">
			  							<label htmlFor="email">Email</label>
			  							<input type="email" placeholder="Votre Email" id="email"/>
			  						</div>
			  					</div>
			  					<div className="input-container">
			  						<div className="input-container">
			  							<label htmlFor="msg">Votre message</label>
			  							<textarea placeholder="Votre Message" id="msg"></textarea>
			  						</div>
			  					</div>
			  					<div className="btn-container">
			  						<button className="btn bg-red">Envoyer</button>
			  					</div>
			  				</form>
		  				</div>
		  			</div>
	  			</div>
	  		</div>
			<Footer/>
	  	</div>
	</div>
  );
}

export default Contact;

