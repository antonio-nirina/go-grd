import React from "react"


import { faEye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Header from "../header/header"
import Footer from "../footer/footer"
import "../../assets/css/style.css"
import "../league/league.css"

import AvatarDefault from "../../assets/image/game-tag.png"

const Lobby: React.FC = function() {
	// const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
  return(
    <div className="Tournament league wagers view lobby">
		<div className="container">
			<Header/>
			<div className="full-container">
				<div className="ban">
					<div className="versus-container">
						<div className="team">
							<div className="info">
								<span>Tournament</span>
								<p className="profilname">CS:GO</p>
								<p><span>Type </span>5/5</p>
							</div>

						</div>

						<div className="team">
						<div className="info">
								<span>Created by</span>
								<p className="profilname">rainDrop</p>
								<p><span>2185 </span>Average rating</p>
							</div>

						</div>
					</div>
				</div>
					<div className="tabs-content">
						<div className="tab-league">
							<div className="team1 team">
								<table>
									<tr>
										<th>Player</th>
										<th>Rating</th>
										<th>K/D</th>
										<th>Twitch</th>
									</tr>
									<tr>
										<th><img src={AvatarDefault} alt="default" />Klover</th>
										<th>2099</th>
										<th>1.29</th>
										<th>5 <i><FontAwesomeIcon icon={faEye} size="xs"/></i></th>
									</tr>
								</table>
								<button className="btn bg-yellow">Join Team 1</button>
							</div>
							<div className="team2 team">
								<table>
									<tr>
										<th>Player</th>
										<th>Rating</th>
										<th>K/D</th>
										<th>Twitch</th>
									</tr>
									<tr>
										<th><img src={AvatarDefault} alt="default" />Klover</th>
										<th>2099</th>
										<th>1.29</th>
										<th>5 <i><FontAwesomeIcon icon={faEye} size="xs"/></i></th>
									</tr>

								</table>
								<button className="btn bg-yellow">Join Team 2</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer/>
		</div>
  );
}

export default Lobby
