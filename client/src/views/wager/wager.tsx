import React from "react"
import { Link } from "react-router-dom"
import Header from "../header/header"
import Footer from "../footer/footer"
import "../wager/wager.css"
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
								<tr>
									<th>Creator</th>
									<th>Tournois Name</th>
									<th>Status</th>
									<th>Twitch</th>
									<th>Join</th>
									
								</tr>
								<tr>
									<td>Alittoo</td>
									<td>ESL PRO</td>
									<td>5/10</td>
									<td>50</td>									
									<td><Link to="view">View</Link></td>
								</tr>
								<tr>
									<td>16</td>
									<td>ESL</td>
									<td>Ligue</td>
									<td>1000 $</td>									
									<td><Link to="/view">View</Link></td>
								</tr>
								<tr>
									<td>64</td>
									<td>Major League</td>
									<td>Ligue</td>
									<td>Merch</td>									
									<td style={{width:"100px"}}><Link to="/view">View</Link></td>
								</tr>
							</table>
						</div>
					</div>
				</div>		
			</div>		
		</div>
	)
}

export default Wager
