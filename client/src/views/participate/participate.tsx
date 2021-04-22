import React from "react"
import ReactDOM from 'react-dom'

import { faXbox, faPlaystation } from "@fortawesome/free-brands-svg-icons"
import { faGamepad } from "@fortawesome/free-solid-svg-icons"
import {useState} from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "../../assets/css/style.css"
import "../participate/participate.css"

const Slider: React.FC = function() {

  return(
    <div className="marg">
        <div className="part">
			<div className="undertitle">
				<h2>Participer à des tournois</h2>
				<p>Joue en ligne contre d'autres joueurs du monde entier et gagne des prix</p>
			</div>
			<div className="content">
				<div className="clear"></div>
					<div className="apex block">
						<p className="legend">Apex Legends Daily Cup <i className="iconGame"><FontAwesomeIcon icon={faXbox}/></i></p>
						<div className="info">
							<p className="price inblock"><i className="sprite cup"></i><span>100€ Cash Prize</span></p>
							<p className="date inblock"><i className="sprite calendar"></i><span>02/04/2021 - 5:00 PM</span></p>
						</div>
					</div>

				<div className="apex block">
					<p className="legend">Fortnite Weekly Cup <i className="iconGame"><FontAwesomeIcon icon={faGamepad}/></i></p>
					<div className="info">
						<p className="price inblock"><i className="sprite cup"></i><span>50€ Cash Prize</span></p>
						<p className="date inblock"><i className="sprite calendar"></i><span>03/04/2021 - 5:00 PM</span></p>
					</div>
				</div>
				<div className="apex block">
					<p className="legend">Rocket League Champions <i className="iconGame"><FontAwesomeIcon icon={faPlaystation}/></i></p>
					<div className="info">
						<p className="price inblock"><i className="sprite ticket"></i><span>5€ Cash Prize</span></p>
						<p className="price inblock"><i className="sprite cup"></i><span>500€ Cash Prize</span></p>
						<p className="date inblock"><i className="sprite calendar"></i><span>04/04/2021 - 7:30 PM</span></p>
					</div>
				</div>
				<div className="apex block">
					<p className="legend">Warzone Xbox Daily<i className="iconGame"><FontAwesomeIcon icon={faXbox}/></i></p>
					<div className="info">
					<p className="price inblock"><i className="sprite cup"></i><span>100€ Cash Prize</span></p>
					<p className="date inblock"><i className="sprite candar"></i><span>02/04/2021 - 5:00 PM</span></p>
				</div>
				</div>
					<div className="apex block">
						<p className="legend">R6 Squad Tournament <i className="iconGame"><FontAwesomeIcon icon={faGamepad}/></i></p>
						<div className="info">
						<p className="price inblock"><i className="sprite cup"></i><span>100€ Cash Prize</span></p>
						<p className="date inblock"><i className="sprite calendar"></i><span>02/04/2021 - 5:00 PM</span></p>
					</div>
				</div>

				<div className="apex block last">
					<p className="legend">Fifa 21 fut cup</p>
					<div className="info">
						<p className="inblock"><i className="sprite ticket"></i><span>10€</span></p>
						<p className="inblock"><i className="sprite cup"></i><span>750€ Cash Prize</span></p>
						<p className="inblock"><i className="sprite calendar"></i><span>04/04/2021 - 7:30 PM</span></p>
					</div>
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
	<div className="block-tournois">
		<div className="undertitle">
			<h2>Wagers</h2>
			<p>Affronte les membres de la communauté en duels</p>
		</div>
		<div className="clear"></div>
		<div className="content">
			<div className="apex block">
				<p className="legend">Apex Legends Daily Cup <i className="iconGame"><FontAwesomeIcon icon={faXbox}/></i></p>
				<div className="info">
				<p className="price inblock"><i className="sprite cup"></i><span>100€ Cash Prize</span></p>
				<p className="date inblock"><i className="sprite calendar"></i><span>02/04/2021 - 5:00 PM</span></p>
			</div>
			</div>
			<div className="apex block">
				<p className="legend">Fortnite Weekly Cup <i className="iconGame"><FontAwesomeIcon icon={faGamepad}/></i></p>
				<div className="info">
					<p className="price inblock"><i className="sprite ticket"></i><span>5€ Cash Prize</span></p>
					<p className="price inblock"><i className="sprite cup"></i><span>50€ Cash Prize</span></p>
					<p className="date inblock"><i className="sprite calendar"></i><span>03/04/2021 - 5:00 PM</span></p>
				</div>
			</div>
			<div className="apex block">
				<p className="legend">Rocket League Champions <i className="iconGame"><FontAwesomeIcon icon={faPlaystation}/></i></p>
				<div className="info">
					<p className="price inblock"><i className="sprite ticket"></i><span>5€ Cash Prize</span></p>
					<p className="price inblock"><i className="sprite cup"></i><span>500€ Cash Prize</span></p>
					<p className="date inblock"><i className="sprite calendar"></i><span>04/04/2021 - 7:30 PM</span></p>
				</div>
			</div>
			<div className="apex block">
				<p className="legend">Warzone Xbox Daily<i className="iconGame"><FontAwesomeIcon icon={faXbox}/></i></p>
				<div className="info">
					<p className="price inblock"><i className="sprite cup"></i><span>100€ Cash Prize</span></p>
					<p className="date inblock"><i className="sprite calendar"></i><span>02/04/2021 - 5:00 PM</span></p>
				</div>
			</div>
			<div className="apex block">
				<p className="legend">R6 Squad Tournament <i className="iconGame"><FontAwesomeIcon icon={faGamepad}/></i></p>
				<div className="info">
					<p className="price inblock"><i className="sprite cup"></i><span>100€ Cash Prize</span></p>
					<p className="date inblock"><i className="sprite calendar"></i><span>02/04/2021 - 5:00 PM</span></p>
				</div>
			</div>

			<div className="apex block last">
				<p>Fifa 21 fut cup</p>
				<div className="info">
					<p className="inblock"><i className="sprite ticket"></i><span>10€</span></p>
					<p className="inblock"><i className="sprite cup"></i><span>750€ Cash Prize</span></p>
					<p className="inblock"><i className="sprite calendar"></i><span>04/04/2021 - 7:30 PM</span></p>
				</div>
			</div>
		</div>
		<div className="gamecash">
			<div className="lot">
				<p><strong>+6000</strong><span>Membres</span></p>				
				<p><strong>+5000€</strong><span>Cash prizes/Semaine</span></p>
			</div>
			<div className="more">
				<p><a href="#">voir plus</a></p>
			</div>
			</div>
		</div>
    </div>

  );
}

export default Slider;
