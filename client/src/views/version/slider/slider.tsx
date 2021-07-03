import React from "react"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import { useSelector } from "react-redux"

import {Translation} from "../../../lang/translation"
import {RootState} from "../../../reducer"
import home from "../../../assets/image/accueil-background.jpg"
import home1 from "../../../assets/image/home1.jpg"
import "../../../assets/css/style.css"
import "../slider/slider.css"


const Slider: React.FC = function() {
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)

  return(
    <div className="sliderGrid">
	    <Carousel showArrows={false} autoPlay={true} interval={8000} infiniteLoop={true} showThumbs={false} transitionTime={1000}>
	        <div>
	      		<img src={home} alt="Grid" className="Imgresp"/>
	      		<div className="slogan">
	      			<p className="title">
					  {
						Object.keys(userConnectedRedux.user).length > 0 ?
						Translation(userConnectedRedux.user.language).participHome.plateform
						:
						Translation("fr").participHome.plateform
					}
					</p>
	      			<button className="btn bg-red">
					  {
						Object.keys(userConnectedRedux.user).length > 0 ?
						Translation(userConnectedRedux.user.language).participHome.run
						:
						Translation("fr").participHome.run
						}
					</button>
	      		</div>
	      	</div>
	      	<div>
	      		<img src={home1} alt="Grid" className="Imgresp"/>
	      		<div className="slogan">
	      			<p className="title">{
						Object.keys(userConnectedRedux.user).length > 0 ?
						Translation(userConnectedRedux.user.language).participHome.plateform
						:
						Translation("fr").participHome.plateform
					}</p>
	      			<button className="btn bg-red">
					  {
						Object.keys(userConnectedRedux.user).length > 0 ?
						Translation(userConnectedRedux.user.language).participHome.run
						:
						Translation("fr").participHome.run
						}
					</button>
	      		</div>
	      	</div>
	    </Carousel>
    </div>
  );
}

export default Slider
