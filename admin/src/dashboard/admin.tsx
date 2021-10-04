import React,{useEffect} from "react"
import { Link } from "react-router-dom"

import SideBar from "../header/sidebar"
import Nav from "../header/nav"
import Community from "../assets/image/info-update.png"


const Admin: React.FC = function() {
	useEffect(() => {
		const params = window.location.search

		if (window.opener && process.env.REACT_UR) {
			window.opener.postMessage(params,`${process.env.REACT_APP_URI}`)
			window.close()
		}
	},[])
	return(
	    <div className="admin">
			<div className="layout-container">
				<SideBar />
				<div className="content-wrapper">
					<nav className="navbar">
	          			<div></div>
	                    <Nav />
	        		</nav>
	        		<div className="main-content">
		        		<div className="dashboard-title">
		        			<h1>Tableau de bord</h1>
		        		</div>
		        		<div className="dashboard">
		        			<Link to ="/admin/league" className="grid league-board">
		        				<img src="https://i.ibb.co/Vw39G5b/championship-rl.jpg" alt="#" />
		        				<span className="grid-title">Ligue :</span>
		        				<span className="grid-desc">Voir la liste des ligues disponibles</span>
		        			</Link>
		        			<Link to ="/admin/tournament" className="grid tournament-board no-mg-right">
		        				<img src="https://i.ibb.co/TKD3yZT/apex-legends.webp" alt="#" />
		        				<span className="grid-title">Tournois :</span>
		        				<span className="grid-desc">Voir la liste des tournois disponibles</span>
		        			</Link>
		        			<Link to="/admin/wagger" className="grid wagger-board">
		        				<img src="https://i.ibb.co/YQgvJpM/championship.jpg" alt="#" />
		        				<span className="grid-title" >Wagger :</span>
		        				<span className="grid-desc">Voir la liste des waggers disponibles</span>
		        			</Link>
		        			<Link to="/admin/communaute" className="grid community-board no-mg-right">
		        				<img src={Community} alt="#" />
		        				<span className="grid-title">Communauté</span>
		        				<span className="grid-desc">Voir les derniers articles en vogue</span>
		        			</Link>
		        		</div>
	        		</div>
				</div>
			</div>
	  	</div>
  	)
}

export default Admin
