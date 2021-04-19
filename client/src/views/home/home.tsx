import React from "react"
import ReactDOM from 'react-dom'
import {useState} from "react";

import Header from "../header/header" 
import Slider from "../slider/slider"
import Participate from "../participate/participate"
import Game from "../game/game"
import Community from "../community/community"
import Join from "../join/join"
import Footer from "../footer/footer"
import "../home/home.css"
import "../../assets/css/style.css"


const Home: React.FC = function() {	
  return(
    <div className="home">
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
	      <Community/>
	      <Join/>
	      <Footer/>
	  </div>
    </div>
  );
}

export default Home;
