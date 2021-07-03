import React from "react"
import { useSelector } from "react-redux"
import Popup from "reactjs-popup"
import { Carousel } from "react-responsive-carousel"

import {Translation} from "../../lang/translation"
import {RootState} from "../../reducer"

const HistoryGame : React.FC = function() {
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	return (
		<div id="game" className="my-games">
		<h2>{Object.keys(userConnectedRedux.user).length > 0 ?
						Translation(userConnectedRedux.user.language).profil.game
						:
						Translation("fr").profil.game}</h2>
		<div className="img-game">
			<Carousel swipeable={true} centerSlidePercentage={20} dynamicHeight={false} centerMode={true} showArrows={true} autoPlay={true} interval={8000} infiniteLoop={true} showThumbs={false} transitionTime={1000}>
				<div className="game-slide"><img src="https://i.ibb.co/ByGkhS1/apexlegend.jpg" alt="apexlegend" /></div>
				<div className="game-slide"><img src="https://i.ibb.co/Yd2v60Q/blackops.jpg" alt="blackops"/></div>
				<div className="game-slide"><img src="https://i.ibb.co/TK5JYMz/fifa21.jpg" alt="fifa21" /></div>
				<div className="game-slide"><img src="https://i.ibb.co/Dtym1JK/fortnite.jpg" alt="fortnite" /></div>
				<div className="game-slide"><img src="https://i.ibb.co/9VPnb7p/mwarfare.jpg" alt="mwarfare" /></div>
				<div className="game-slide"><img src="https://i.ibb.co/89xKdw2/rainbowsix-siege.jpg" alt="rainbowsix-siege"/></div>
				<div className="game-slide"><img src="https://i.ibb.co/CPDzC7n/rocketl.jpg" alt="rocketl" /></div>
				<div className="game-slide"><img src="https://i.ibb.co/8Y0r1NH/warzone.jpg" alt="warzone" /></div>
			</Carousel>
			<div className="bt-game-container">
				<Popup
					trigger={<button className="btn bg-yellow"> {Object.keys(userConnectedRedux.user).length > 0 ?
						Translation(userConnectedRedux.user.language).profil.addGame
						:
						Translation("fr").profil.addGame} </button>}
					modal
					nested
				>
				<div className="modal">
					<button className="close">
						&times;
					</button>
					<div className="header"> <h3> {Object.keys(userConnectedRedux.user).length > 0 ?
						Translation(userConnectedRedux.user.language).profil.selectGame
						:
						Translation("fr").profil.selectGame}</h3></div>
						<div className="content">
							{' '}
							<img src="https://i.ibb.co/8Y0r1NH/warzone.jpg" alt="warzone" />
							<img src="https://i.ibb.co/CPDzC7n/rocketl.jpg" alt="rocketl" />
						</div>
						<div className="actions">
							<Popup
								trigger={<button className="btn bg-yellow"> {Object.keys(userConnectedRedux.user).length > 0 ?
								Translation(userConnectedRedux.user.language).profil.addGame
								:
								Translation("fr").profil.addGame} </button>}
								position="top center"
								nested
							>
								<span>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
									magni omnis delectus nemo, maxime molestiae dolorem numquam
									mollitia, voluptate ea, accusamus excepturi deleniti ratione
									sapiente! Laudantium, aperiam doloribus. Odit, aut.
								</span>
							</Popup>
							<button className="btn bg-white">{Object.keys(userConnectedRedux.user).length > 0 ?
						Translation(userConnectedRedux.user.language).profil.validate
						:
						Translation("fr").profil.validate}</button>
						</div>
					</div>
				</Popup>
			</div>
		</div>
	</div>
	)
}
export default HistoryGame
