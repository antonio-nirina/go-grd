import React from "react"

import { Link } from 'react-router-dom'

import Discord from "../../assets/image/discord-logo.png"
import Origin from "../../assets/image/icons/origin.png"
import Uplay from "../../assets/image/icons/uplay.png"
import Battlenet from "../../assets/image/icons/battlenet.png"
import Epicgame from "../../assets/image/icons/epicgame.png"

import "../auth/account.css"
import "../../assets/css/style.css"

const StepOne: React.FC = function() {

  return(
	<div className="account-container">
		<div className="register-field account">			
			<p>Lies tes comptes pour une expérience optimale :</p>
			<div className="account_type">
				<Link to="#" className="discord"><img src={Discord} alt="Discord" width="20" /><span>Discord</span></Link>
				<Link to="#" className="origin"><img src={Origin} alt="Origin" width="20" height="20"/><span>Origin</span></Link>
				<Link to="#" className="uplay"><img src={Uplay} alt="Uplay" width="20" /><span>Uplay</span></Link>
				<Link to="#" className="battlenet"><img src={Battlenet} alt="Battle.net" width="20" /><span>Battle.net</span></Link>
				<Link to="#" className="epicgame"><img src={Epicgame} alt="Epicgame" width="20" /><span>Epic games</span></Link>
			</div>			
		</div>
		<div className="center-width">
			<div className="infos">
				<p className="member"><Link to="/communaute">Je me connecte plus tard</Link></p>							
			</div>
		</div>
		<div className="center-width">										
			<button className="btn bg-red" type="submit">
				Je termine
			</button>
		</div>		
	</div>
	);
}

export default StepOne;
