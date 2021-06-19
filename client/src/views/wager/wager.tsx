import React from "react"
import { Link } from "react-router-dom"
import Header from "../header/header"
import Footer from "../footer/footer"
import "../wager/wager.css"
import { faEye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import AvatarDefault from "../../assets/image/game-tag.png"

const Wager: React.FC = function() {
return(
	<div className="Tournament league wagers">
		<div className="container">
			<Header/>
			<div className="full-container">
				<div className="ban">
					<h2>Welcome to <Link to="#">GO Grind</Link> Wager Platform</h2>
					<p><span>2688</span> Players Online</p>
				</div>
					<div className="tabs-content">
						<div className="tab-league">							
							<table className="tab-bloc">
								<tr className="bg-line">
									<th>Creator</th>
									<th>Tournois Name</th>
									<th>Status</th>
									<th>Twitch</th>
									<th>Join</th>									
								</tr>
								<tr>
									<td className="flag"><p><img src="https://i.ibb.co/gvSwfSp/gb.png"/><img src={AvatarDefault}/></p><span>Alittoo</span></td>
									<td>ESL PRO</td>
									<td>5/10 <span>picking 20:01</span></td>
									<td>50 <i><FontAwesomeIcon icon={faEye} size="xs"/></i></td>									
									<td><Link to="view">View</Link></td>
								</tr>
								<tr>
									<td>Bonkay</td>
									<td>ESL</td>
									<td>7/10 <span>picking 21:01</span></td>
									<td>25 <i><FontAwesomeIcon icon={faEye} size="xs"/></i></td>									
									<td><Link to="/view">View</Link></td>
								</tr>
								<tr>
									<td>Mondo</td>
									<td>Major League</td>
									<td>8/10 <span>picking 21:20</span></td>
									<td>250 <i><FontAwesomeIcon icon={faEye} size="xs"/></i></td>									
									<td style={{width:"100px"}}><Link to="/view">View</Link></td>
								</tr>
							</table>
						</div>
					</div>
				</div>		
			</div>
			<Footer/>	
		</div>
	)
}

export default Wager
