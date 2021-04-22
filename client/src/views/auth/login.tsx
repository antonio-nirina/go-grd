import React from "react"

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
	        
	      </div>
	      <Footer/>
	  </div>
    </div>
  );
}

export default Login;
