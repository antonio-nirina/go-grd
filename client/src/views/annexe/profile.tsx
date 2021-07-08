import React,{useEffect} from "react"
// import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'

import fr from "../../assets/image/fr.png"
import ps from "../../assets/image/playstation.png"
// import Popup from "reactjs-popup"

import { faChartBar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Header from "../header/header"
import Footer from "../footer/footer"
import "../annexe/profile.css"
import Avatar from "./avatar"
import "../../assets/css/style.css"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import 'reactjs-popup/dist/index.css'

// import {RootState} from "../../reducer"


const Profile: React.FC = function() {
	//const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	useEffect(() => {
		const params = window.location.search

		if (window.opener) {
			window.opener.postMessage(params,"")
		   	window.close()
		}
	},[])


  return(
	<div className="profil connected">
      <div className="container">
	      <Header/>
	      <div className="main-content">
	      	<div className="main-pro">
	      		<div className="gamer-stats">
		      		<div className="wall-bloc" id="wall">
			      		<div className="wall" id="wall">
			      			<Avatar />
			      		</div>
			      	</div>
			      	<div className="statistique">
			      		<div className="start-game">
			      			<div className="start">
			      				<img src="https://i.ibb.co/TKD3yZT/apex-legends.webp" alt="apex-legends" />
			      				<span><FontAwesomeIcon icon={faChartBar} />Statistiques</span>
			      			</div>
			      		</div>
			      		<div className="flexbox">
			      			<div className="flex-items">
			      				<p>92 <span>Parties</span></p>
			      				<p>32 <span>Top 1</span></p>
			      				<p>35% <span>Taux de victoires</span></p>
			      			</div>
			      			<div className="flex-items">
			      				<p>L L W L<span>Score recents</span></p>
			      				<p>2.75<span>K/D</span></p>
			      				<p>923<span>Placement FR</span></p>
			      			</div>
			      			<div className="flex-items">
			      				<p>Ligue<span>-</span></p>
			      				<p>Placement<span>-</span></p>
			      				<p>Score<span>-</span></p>
			      			</div>
			      		</div>
			      		<div className="stats-games">
			      			<div className="gamestat">
			      				<p>Fifa 21 <span>statistiques</span></p>

			      			</div>
			      			<div className="account-list">
			      				<img src={ps} alt=""/>
			      			</div>
			      		</div>
			      	</div>
					<div className="team-bloc-setting">
						<p><img src="#" alt=""/>nomdeteam</p>
						<p>
							<Link to="#"><img src={fr} alt="" /></Link>
						<Link to="#"><img src={ps} alt="" /></Link>
						</p>
						<p>
						<i><span>25</span></i>
						</p>
					</div>
			    </div>
	      	</div>
	      </div>
	      <Footer/>
	  </div>
    </div>
  )
}

export default Profile;
