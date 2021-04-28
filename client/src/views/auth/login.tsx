import React from "react"
import {Link} from 'react-router-dom'

import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {Field} from 'redux-form'
import Header from "../header/header"
import Slider from "../slider/slider"
import Participate from "../participate/participate"
import Game from "../game/game"
import Community from "../community/community"
import Join from "../join/join"
import Footer from "../footer/footer"
import "../home/home.css"
import "../../assets/css/style.css"


const Login: React.FC = function() {
  return(
    <div className="home">
      <div className="container">
	      <Header/>
	      <div className="main">
	        <div className="content">
				    <div className="wrap connexion formulaire">
					    <div className="bloc noborder">
							<h1 className="text-center">Connexion</h1>
							<form>
					          	<Field name="email" component={this.renderInput} type="text" placeholder="Email" />
					          	<Field name="password" component={this.renderInput} type="password" label="Mot de passe" placeholder="Mot de passe" />
					          	<div className="text-center bottom">
					          		<button type="submit" className="btn bt btBlue" >Se connecter</button><br/>
					          		Vous n'avez pas encore un compte?<br/>
	                                 <Link to="/signup">Inscrivez vous!</Link><br/><br/>
	                                 <Link to="/mot-de-passe-oublie">Mot de passe oublié?</Link>
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

export default Login;
