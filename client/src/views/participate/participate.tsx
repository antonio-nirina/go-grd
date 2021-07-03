import React from "react"
import { useSelector } from "react-redux"
import { faXbox, faPlaystation } from "@fortawesome/free-brands-svg-icons"
import { faGamepad } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


import {Translation} from "../../lang/translation"
import {RootState} from "../../reducer"
import "../../assets/css/style.css"
import "../participate/participate.css"

const Slider: React.FC = function() {
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
  return(
    <div className="marg">
        <div className="part">
			<div className="undertitle">
				<h2>
				{
					Object.keys(userConnectedRedux.user).length > 0 ?
					Translation(userConnectedRedux.user.language).participHome.participateTournament
					:
					Translation("fr").participHome.participateTournament
				}

				</h2>
				<p>
				{
					Object.keys(userConnectedRedux.user).length > 0 ?
					Translation(userConnectedRedux.user.language).participHome.gameAgainst
					:
					Translation("fr").participHome.gameAgainst
				}
				</p>
			</div>
			<div className="content">
				<div className="clear"></div>
					<div className="apex block">
						<div><p className="legend">Apex Legends Daily Cup</p><i className="iconGame"><FontAwesomeIcon icon={faXbox}/></i></div>
						<div className="info">
							<p className="price inblock"><i className="sprite cup"></i><span>100€ Cash Prize</span></p>
							<p className="date inblock"><i className="sprite calendar"></i><span>02/04/2021 - 5:00 PM</span></p>
						</div>
					</div>

				<div className="apex block">
					<div><p className="legend">Fortnite Weekly Cup</p><i className="iconGame"><FontAwesomeIcon icon={faGamepad}/></i></div>
					<div className="info">
						<p className="price inblock"><i className="sprite cup"></i><span>50€ Cash Prize</span></p>
						<p className="date inblock"><i className="sprite calendar"></i><span>03/04/2021 - 5:00 PM</span></p>
					</div>
				</div>
				<div className="apex block">
					<div><p className="legend">Rocket League Champions</p><i className="iconGame"><FontAwesomeIcon icon={faPlaystation}/></i></div>
					<div className="info">
						<p className="price inblock"><i className="sprite ticket"></i><span>5€ Cash Prize</span></p>
						<p className="price inblock"><i className="sprite cup"></i><span>500€ Cash Prize</span></p>
						<p className="date inblock"><i className="sprite calendar"></i><span>04/04/2021 - 7:30 PM</span></p>
					</div>
				</div>
				<div className="apex block">
					<div><p className="legend">Warzone Xbox Daily</p><i className="iconGame"><FontAwesomeIcon icon={faXbox}/></i></div>
					<div className="info">
					<p className="price inblock"><i className="sprite cup"></i><span>100€ Cash Prize</span></p>
					<p className="date inblock"><i className="sprite calendar"></i><span>02/04/2021 - 5:00 PM</span></p>
				</div>
				</div>
					<div className="apex block">
						<div><p className="legend">R6 Squad Tournament</p><i className="iconGame"><FontAwesomeIcon icon={faGamepad}/></i></div>
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
			<p>
				{
					Object.keys(userConnectedRedux.user).length > 0 ?
					Translation(userConnectedRedux.user.language).participHome.againstCommunity
					:
					Translation("fr").participHome.againstCommunity
				}
			</p>
		</div>
		<div className="clear"></div>
		<div className="content">
			<div className="apex block">
				<div><p className="legend">Apex Legends Daily Cup</p><i className="iconGame"><FontAwesomeIcon icon={faXbox}/></i></div>
				<div className="info">
				<p className="price inblock"><i className="sprite cup"></i><span>100€ Cash Prize</span></p>
				<p className="date inblock"><i className="sprite calendar"></i><span>02/04/2021 - 5:00 PM</span></p>
			</div>
			</div>
			<div className="apex block">
				<div><p className="legend">Fortnite Weekly Cup</p><i className="iconGame"><FontAwesomeIcon icon={faGamepad}/></i></div>
				<div className="info">
					<p className="price inblock"><i className="sprite ticket"></i><span>5€ Cash Prize</span></p>
					<p className="price inblock"><i className="sprite cup"></i><span>50€ Cash Prize</span></p>
					<p className="date inblock"><i className="sprite calendar"></i><span>03/04/2021 - 5:00 PM</span></p>
				</div>
			</div>
			<div className="apex block">
				<div><p className="legend">Rocket League Champions</p><i className="iconGame"><FontAwesomeIcon icon={faPlaystation}/></i></div>
				<div className="info">
					<p className="price inblock"><i className="sprite ticket"></i><span>5€ Cash Prize</span></p>
					<p className="price inblock"><i className="sprite cup"></i><span>500€ Cash Prize</span></p>
					<p className="date inblock"><i className="sprite calendar"></i><span>04/04/2021 - 7:30 PM</span></p>
				</div>
			</div>
			<div className="apex block">
				<div><p className="legend">Warzone Xbox Daily</p><i className="iconGame"><FontAwesomeIcon icon={faXbox}/></i></div>
				<div className="info">
					<p className="price inblock"><i className="sprite cup"></i><span>100€ Cash Prize</span></p>
					<p className="date inblock"><i className="sprite calendar"></i><span>02/04/2021 - 5:00 PM</span></p>
				</div>
			</div>
			<div className="apex block">
				<div><p className="legend">R6 Squad Tournament</p><i className="iconGame"><FontAwesomeIcon icon={faGamepad}/></i></div>
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
				<p><strong>+6000</strong>
					<span>
					{
						Object.keys(userConnectedRedux.user).length > 0 ?
						Translation(userConnectedRedux.user.language).participHome.member
						:
						Translation("fr").participHome.member
					}
					</span>
				</p>
				<p><strong>+5000€</strong><span>Cash prizes/Semaine</span></p>
			</div>
			<div className="more">
				<p>
					<>
						<a href="#">{
							Object.keys(userConnectedRedux.user).length > 0 ?
							Translation(userConnectedRedux.user.language).participHome.see
							:
							Translation("fr").participHome.see
						}
						</a>
					</>
				</p>
			</div>
			</div>
		</div>
    </div>

  );
}

export default Slider
