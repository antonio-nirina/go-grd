import React from "react"

import { faEye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Header from "../header/header"
import Footer from "../footer/footer"
import "../../assets/css/style.css"
import "../league/league.css"

import AvatarDefault from "../../assets/image/game-tag.png"

const View: React.FC = function() {
	// const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
  return(
    <div className="Tournament league wagers view">
		<div className="container">
			<Header/>
			<div className="full-container">
				<div className="ban">
					<div className="versus-container">
						<div className="team">
							<div className="info">
								<span>team</span>
								<p className="profilname">HammyZZ</p>
								<p><span>2113 </span>Average rating</p>
							</div>
							<img src={AvatarDefault} alt="default" />
						</div>
						<div className="live">
							<p><span>Live</span>9:22</p>
							<div className="mise"><button className="btn bg-yellow">Faite votre mise</button></div>
						</div>
						<div className="team">
						<div className="info">
								<span>team</span>
								<p className="profilname">rainDrop</p>
								<p><span>2185 </span>Average rating</p>
							</div>
							<img src={AvatarDefault} alt="default" />
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
									<tr>
										<th><img src={AvatarDefault} alt="default" />Klover</th>
										<th>2099</th>
										<th>1.29</th>
										<th>5 <i><FontAwesomeIcon icon={faEye} size="xs"/></i></th>
									</tr>
									<tr>
										<th><img src={AvatarDefault} alt="default" />Klover</th>
										<th>2099</th>
										<th>1.29</th>
										<th>5 <i><FontAwesomeIcon icon={faEye} size="xs"/></i></th>
									</tr>
									<tr>
										<th><img src={AvatarDefault} alt="default" />Klover</th>
										<th>2099</th>
										<th>1.29</th>
										<th>5 <i><FontAwesomeIcon icon={faEye} size="xs"/></i></th>
									</tr>
									<tr>
										<th><img src={AvatarDefault} alt="default" />Klover</th>
										<th>2099</th>
										<th>1.29</th>
										<th>5 <i><FontAwesomeIcon icon={faEye} size="xs"/></i></th>
									</tr>
								</table>


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
									<tr>
										<th><img src={AvatarDefault} alt="default" />Klover</th>
										<th>2099</th>
										<th>1.29</th>
										<th>5 <i><FontAwesomeIcon icon={faEye} size="xs"/></i></th>
									</tr>
								</table>

							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer/>
		</div>
  );
}

export default View;
