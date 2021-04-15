import React from "react"
import ReactDOM from 'react-dom'

import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import home from "../../assets/image/home-img.jpg"
import home1 from "../../assets/image/home1.jpg"
import "../../assets/css/style.css"
import "../slider/slider.css"




const Slider: React.FC = function() {
  return(
    <div className="sliderGrid">
	    <Carousel showArrows={false} autoPlay={true} interval={8000} infiniteLoop={true} showThumbs={false} transitionTime={1000}>
	        <div>
	      		<img src={home} alt="Grid" className="Imgresp"/>
	      		<div className="slogan">
	      			<p className="title">La plateforme compétitive pour consoles</p>
	      			<button className="btn"><a href="#" title="Lance toi">Lance toi</a></button>
	      		</div>
	      	</div>
	      	<div>
	      		<img src={home1} alt="Grid" className="Imgresp"/>
	      		<div className="slogan">
	      			<p className="title">La plateforme compétitive pour consoles</p>
	      			<button className="btn"><a href="#" title="Lance toi">Lance toi</a></button>
	      		</div>
	      	</div>
	    </Carousel>
    </div>
  );
}

export default Slider;
