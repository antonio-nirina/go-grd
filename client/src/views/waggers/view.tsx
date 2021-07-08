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
							<div className="mise"><button className="btn bg-red">Faite votre mise</button></div>
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
									<thead>
										<th>Player</th>
										<th>Rating</th>
										<th>K/D</th>
										<th>Twitch</th>
									</thead>
									<tbody>
										<tr>
											<td><img src={AvatarDefault} alt="default" />Klover</td>
											<td>2099</td>
											<td>1.29</td>
											<td>5 <i><FontAwesomeIcon icon={faEye} size="xs"/></i></td>
										</tr>
										<tr>
											<td><img src={AvatarDefault} alt="default" />Klover</td>
											<td>2099</td>
											<td>1.29</td>
											<td>5 <i><FontAwesomeIcon icon={faEye} size="xs"/></i></td>
										</tr>
										<tr>
											<td><img src={AvatarDefault} alt="default" />Klover</td>
											<td>2099</td>
											<td>1.29</td>
											<td>5 <i><FontAwesomeIcon icon={faEye} size="xs"/></i></td>
										</tr>
										<tr>
											<td><img src={AvatarDefault} alt="default" />Klover</td>
											<td>2099</td>
											<td>1.29</td>
											<td>5 <i><FontAwesomeIcon icon={faEye} size="xs"/></i></td>
										</tr>
										<tr>
											<td><img src={AvatarDefault} alt="default" />Klover</td>
											<td>2099</td>
											<td>1.29</td>
											<td>5 <i><FontAwesomeIcon icon={faEye} size="xs"/></i></td>
										</tr>
									</tbody>
								</table>


							</div>
							<div className="team2 team">
								<table>
									<thead>
										<th>Player</th>
										<th>Rating</th>
										<th>K/D</th>
										<th>Twitch</th>
									</thead>
									<tbody>
										<tr>
											<td><img src={AvatarDefault} alt="default" />Klover</td>
											<td>2099</td>
											<td>1.29</td>
											<td>5 <i><FontAwesomeIcon icon={faEye} size="xs"/></i></td>
										</tr>
										<tr>
											<td><img src={AvatarDefault} alt="default" />Klover</td>
											<td>2099</td>
											<td>1.29</td>
											<td>5 <i><FontAwesomeIcon icon={faEye} size="xs"/></i></td>
										</tr>
									</tbody>
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
