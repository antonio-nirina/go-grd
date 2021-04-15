import React from "react"
import ReactDOM from 'react-dom'
import home from "../../assets/image/home-img.jpg"
import "../../assets/css/style.css"
import "../participate/participate.css"




const Slider: React.FC = function() {
  return(
    <div className="marg">
    	<div className="undertitle">
      		<h2>Participer à des tournois</h2>
      		<p>Joue en ligne contre d'autres joueurs du monde entier et gagne des prix</p>
      </div>
      <div className="clear"></div>
    	<div className="apex block">
    		<p className="legend">Apex Legends Daily Cup <i></i></p>
    		<div className="info">
    			<p className="price"><i></i> 100€ Cash Prize</p>
    			<p className="date"><i></i> 02/04/2021 - 5:00 PM</p>
    		</div>
    	</div>
      <div className="apex block">
        <p className="legend">Fortnite Weekly Cup <i></i></p>
        <div className="info">         
        <p className="price"><i></i> 5€ Cash Prize</p> 
          <p className="price"><i></i> 50€ Cash Prize</p>
          <p className="date"><i></i> 03/04/2021 - 5:00 PM</p>
        </div>
      </div>
      <div className="apex block">
        <p className="legend">Rocket League Champions <i></i></p>
        <div className="info">
          <p className="price"><i></i> 5€ Cash Prize</p>
          <p className="price"><i></i> 500€ Cash Prize</p>
          <p className="date"><i></i> 04/04/2021 - 7:30 PM</p>
        </div>
      </div>
      <div className="apex block">
        <p className="legend">Warzone Xbox Daily<i></i></p>
        <div className="info">
          <p className="price"><i></i> 100€ Cash Prize</p>
          <p className="date"><i></i> 02/04/2021 - 5:00 PM</p>
        </div>
      </div>
       <div className="apex block">
        <p className="legend">R6 Squad Tournament <i></i></p>
        <div className="info">
          <p className="price"><i></i> 100€ Cash Prize</p>
          <p className="date"><i></i> 02/04/2021 - 5:00 PM</p>
        </div>
      </div>
     
    	<div className="apex block last">
    		<p>Fifa 21 fut cup</p>
    		<div className="info">
    			<p><i></i> 10€</p>
    			<p><i></i> 750€ Cash Prize</p>
    			<p><i></i> 04/04/2021 - 7:30 PM</p>
    		</div>
    	</div>
      <div className="gamecash">
        <div className="lot">
          <p><strong>+250</strong><span>Tournois/Semaine</span></p>
          <p><strong>8</strong><span>Jeux</span></p>
          <p><strong>+2500€</strong><span>Cash prizes/Semaine</span></p>
        </div>
        <div className="more">
          <p><a href="#">plus de tournois</a></p>
        </div>
      </div>
    </div>
  );
}

export default Slider;
