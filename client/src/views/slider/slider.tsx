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
      		<a href="#" title="Lance toi"><button className="btn">Lance toi</button></a>
      	</div>
    </div>
  );
}

export default Slider;
