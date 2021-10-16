import React from "react"
import { Link } from 'react-router-dom'

import Header from "../header/header"
import Footer from "../footer/footer"

import Apex from "../../assets/image/jeux/apex.jpg"
import Fortnite from "../../assets/image/jeux/fortnite.jpg"
import Rainbow from "../../assets/image/jeux/rainbow.jpg"
import Rocket from "../../assets/image/jeux/rocket.jpg"
import Vanguard from "../../assets/image/jeux/vanguard.jpg"
import Warzone from "../../assets/image/jeux/warzone.jpg"
import Coldwar from "../../assets/image/jeux/coldwar.jpg"
import Fifa22 from "../../assets/image/jeux/fifa22.jpg"

import Playstation from "../../assets/image/jeux/playstation.jpg"
import Xbox from "../../assets/image/jeux/xbox.jpg"
import Switch from "../../assets/image/jeux/switch.jpg"
import Joystick from "../../assets/image/white-joystick.png"


import { faUser} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "../wagerpage/wager.css"
import "../../assets/css/style.css"


const WagerPage: React.FC = function() {
  return(
	<div className="tournois">
		<div className="container">
			<Header/>
			<div className="main">
				<div className="undertitle">
					<h2>Wagers</h2>
					<span>Derniers Wagers disponible</span>
				</div>
				<div className="containt">
					<p>Choisis ton jeux</p>					
					<div className="favorite">
						<div className="game-list-container">					
							<div className="favorite-game">
								<Link to ="#"><img src={Apex} alt="" width="200"/></Link>
								<Link to ="#"><img src={Fortnite} alt="" width="200"/></Link>
								<Link to ="#"><img src={Rainbow} alt="" width="200"/></Link>
								<Link to ="#"><img src={Rocket} alt="" width="200"/></Link>
							</div>
							<div className="favorite-game">
								<Link to ="#"><img src={Vanguard} alt="" width="200"/></Link>
								<Link to ="#"><img src={Warzone} alt="" width="200"/></Link>
								<Link to ="#"><img src={Coldwar} alt="" width="200"/></Link>
								<Link to ="#"><img src={Fifa22} alt="" width="200"/></Link>
							</div>
						</div>			
					</div>			
				</div>
				<div className="right-list">
					<Link to ="#">
						<div className="apex block">
							<div className="top-icon"><p className="legend">Apex Legend daily cup</p><i className="iconGame"><img src={Joystick} alt="" width="15"/></i></div>
							<div className="info">
								<p className="price inblock"><i><FontAwesomeIcon icon={faUser}/></i><span>JP_FUT12 & Kek37000</span></p>
								<p className="price inblock"><i className="sprite cup"></i><span>100€ Cash Prize</span></p>
								<p className="date inblock"><i className="sprite ticket"></i><span>04/04/2021 - 7:30 PM</span></p>
							</div>
						</div>
					</Link>
					<Link to ="#">
						<div className="apex block">
							<div className="top-icon"><p className="legend">Apex Legend daily cup</p><i className="iconGame"><img src={Joystick} alt="" width="15"/></i></div>
							<div className="info">
								<p className="price inblock"><i><FontAwesomeIcon icon={faUser}/></i><span>JP_FUT12 & Kek37000</span></p>
								<p className="price inblock"><i className="sprite cup"></i><span>100€ Cash Prize</span></p>
								<p className="date inblock"><i className="sprite ticket"></i><span>04/04/2021 - 7:30 PM</span></p>
							</div>
						</div>
					</Link>
					<Link to ="#">
						<div className="apex block">
							<div className="top-icon"><p className="legend">Apex Legend daily cup</p><i className="iconGame"><img src={Joystick} alt="" width="15"/></i></div>
							<div className="info">
								<p className="price inblock"><i><FontAwesomeIcon icon={faUser}/></i><span>JP_FUT12 & Kek37000</span></p>
								<p className="price inblock"><i className="sprite cup"></i><span>100€ Cash Prize</span></p>
								<p className="date inblock"><i className="sprite ticket"></i><span>04/04/2021 - 7:30 PM</span></p>
							</div>
						</div>
					</Link>
					<Link to ="#">
						<div className="apex block">
							<div className="top-icon"><p className="legend">Apex Legend daily cup</p><i className="iconGame"><img src={Joystick} alt="" width="15"/></i></div>
							<div className="info">
								<p className="price inblock"><i><FontAwesomeIcon icon={faUser}/></i><span>JP_FUT12 & Kek37000</span></p>
								<p className="price inblock"><i className="sprite cup"></i><span>100€ Cash Prize</span></p>
								<p className="date inblock"><i className="sprite ticket"></i><span>04/04/2021 - 7:30 PM</span></p>
							</div>
						</div>
					</Link>
					<Link to ="#">
						<div className="apex block">
							<div className="top-icon"><p className="legend">Apex Legend daily cup</p><i className="iconGame"><img src={Joystick} alt="" width="15"/></i></div>
							<div className="info">
								<p className="price inblock"><i><FontAwesomeIcon icon={faUser}/></i><span>JP_FUT12 & Kek37000</span></p>
								<p className="price inblock"><i className="sprite cup"></i><span>100€ Cash Prize</span></p>
								<p className="date inblock"><i className="sprite ticket"></i><span>04/04/2021 - 7:30 PM</span></p>
							</div>
						</div>
					</Link>
					<Link to ="#">
						<div className="apex block">
							<div className="top-icon"><p className="legend">Apex Legend daily cup</p><i className="iconGame"><img src={Joystick} alt="" width="15"/></i></div>
							<div className="info">
								<p className="price inblock"><i><FontAwesomeIcon icon={faUser}/></i><span>JP_FUT12 & Kek37000</span></p>
								<p className="price inblock"><i className="sprite cup"></i><span>100€ Cash Prize</span></p>
								<p className="date inblock"><i className="sprite ticket"></i><span>04/04/2021 - 7:30 PM</span></p>
							</div>
						</div>
					</Link>
				</div>
			</div>
			<Footer/>
		</div>
	</div>

	);
}

export default WagerPage;
