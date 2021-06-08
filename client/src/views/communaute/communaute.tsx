import React from "react"
import { useSelector } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons"

import Header from "../header/header"
import {RootState} from "../../reducer"
import Footer from "../footer/footer"
import AvatarDefault from "../../assets/image/game-tag.png"
import Streamer1 from "../../assets/image/streamer1.jpg"
import "./communaute.css"
import { colors } from "react-select/src/theme"

const Communaute: React.FC = function() {
	const userConnectedRedux 	= useSelector((state:RootState) => state.userConnected)
  return(
	<div className="communaute">
	    <div className="container">
	  		<Header/>	  	
	  		<div className="main">
	  			<div className="auto">	  				
	  				<div className="aside-left">
	  					<div className="game-select">
		  					<div className="game-bg bg-cod">
		  						<p className="game-title">COD : Warzone</p>
		  					</div>
		  					<div className="game-bg bg-rl">
		  						<p className="game-title">rocket league</p>
		  					</div>
		  					<div className="game-bg bg-ft">
		  						<p className="game-title">fortnite</p>
		  					</div>
		  				</div>
		  				<div className="stream">
		  					<div className="stream-container">
			  					<div className="streaming">
			  						<img src={Streamer1} alt=""/>
			  					</div>
			  					<div className="stream-info">
			  						<p className="streamer">Gotaga</p>
			  						<p className="streamgame">Apex Legends <span className="stream-type">Arena</span></p>
			  						<p className="view">12093<i></i></p>
			  					</div>
			  				</div>
			  				<div className="stream-container">
			  					<div className="streaming">
			  						<img src={Streamer1} alt=""/>
			  					</div>
			  					<div className="stream-info">
			  						<p className="streamer">Gotaga</p>
			  						<p className="streamgame">Apex Legends <span className="stream-type">Arena</span></p>
			  						<p className="view">12093<i></i></p>
			  					</div>
			  				</div>
		  				</div>
	  				</div>	  				
	  				<div className="center-block">
	  					<h2>Fil d'actualité</h2>  					
	  				</div>
	  				<div className="aside-right">
	  					<div className="friends">
	  						<img src="#"/>
	  						<p>NomAmi <i></i><i></i></p>
	  					</div>
	  				</div>
	  			</div>
	  		</div>			
			<Footer/>
	  	</div>
	</div>
  )
}

export default Communaute
