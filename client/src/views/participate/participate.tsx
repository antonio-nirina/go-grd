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
      	<div className="apex block">
      		<p>Apex Legends Daily Cup <i></i></p>
      		<div className="price">
      			<p><i></i> 100€ Cash Prize</p>
      			<p><i></i> 02/04/2021 - 5:00 PM</p>
      		</div>
      	</div>
      	<div className="apex block">
      		<p>Fifa 21 fut cup</p>
      		<div className="price">
      			<p><i></i> 10€</p>
      			<p><i></i> 750€ Cash Prize</p>
      			<p><i></i> 04/04/2021 - 7:30 PM</p>
      		</div>
      	</div>

    </div>
  );
}

export default Slider;
