import React from "react"
import { Link } from "react-router-dom"

import "../../assets/css/style.css"
import "../assistance/assistance.css"


const Aside = function({assists}:any) {

	return(
	  	<div className="support-link">
			<div className="link">
				<h3><Link to ="/assistance">Accueil</Link></h3>
			</div>
			{
				assists.map(function(el:any,index:number){
					return (
						<div className="link" key={index}>
							<h3>{el.title.title}</h3>
							<div className="link">
								<li><Link to ="#apex-legends">Apex Legends</Link></li>
								<li><Link to ="#call-of-duty">Call of Duty : Warzone</Link></li>
								<li><Link to ="#cold-war">Call of Duty : Cold War</Link></li>
								<li><Link to ="#rocket-league">Rocket League</Link></li>
								<li><Link to ="#fifa">Fifa</Link></li>
							</div>
						</div>
					)
				})
			}
			<div className="link">
				<h3><Link to ="/contact">Contact</Link></h3>
			</div>
		</div>
	);
}

export default Aside;

