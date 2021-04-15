import React from "react"
import ReactDOM from 'react-dom'
import Header from "../header/header" 
import Slider from "../slider/slider"
import Participate from "../participate/participate"
import Game from "../game/game"
import Footer from "../footer/footer"

import "../home/home.css"
import "../../assets/css/style.css"



const Home: React.FC = function() {
  return(
    <div>
      <div className="container">
	      <Header/>
	      <div className="main">
	        <div className="slider">
	        	<Slider/>
	        </div>
	        <div className="participate">
	        	<Participate/>
	        </div>
	      </div>
	      <Game/>
	      <Footer/>
	  </div>
    </div>
  );
}

export default Home;
