import React from "react"
import ReactDOM from 'react-dom'
import home from "../../assets/image/home-img.jpg"
import "../../assets/css/style.css"
import "../slider/slider.css"




const Slider: React.FC = function() {
  return(
    <div className="sliderGrid">
      	<img src={home} alt="Grid" className="Imgresp"/>
      	<div className="slogan">
      		<p className="title">La plateforme compétitive pour consoles</p>
      		<button className="btn"><a href="#" title="Lance toi">Lance toi</a></button>
      	</div>
    </div>
  );
}

export default Slider;
