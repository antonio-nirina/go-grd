import React from 'react'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faUsers, faTools, faDesktop, faTrophy, faStar, faGamepad, faHome, faHandsHelping } from "@fortawesome/free-solid-svg-icons"

import logo from "../assets/image/gogrind-joystick.png"

const SideBar : React.FC = function() {
	return (		
		<aside className="main-sidebar ps">					
			<div className="logo-container">
				<Link to ="/" className="logo">
					<img src={logo} alt="logo" />					
				</Link>				
				<div className="mobile-menu">					
					<ul>
						<li>
							<Link to="/">
								<i><FontAwesomeIcon icon={faDesktop} size="lg"/></i>
								<span>Tableau de bord</span>
							</Link>
						</li>
						<li>
							<Link to="/admin/tournament">
								<i><FontAwesomeIcon icon={faTrophy} size="lg"/></i>
								<span>Tournois</span>
							</Link>
						</li>
		                <li>
		                    <Link to="/admin/communaute">
		                        <i><FontAwesomeIcon icon={faTools} size="lg"/></i>
		                        <span>Communaute</span>
		                    </Link>
		                </li>
						<li>
							<Link to="/admin/league">
								<i><FontAwesomeIcon icon={faUsers} size="lg"/></i>
								<span>Ligues</span>
							</Link>
						</li>
						<li>
							<Link to="/admin/wagger">
								<i><FontAwesomeIcon icon={faStar} size="lg"/></i>
								<span>Waggers</span>
							</Link>
						</li>
						<li>
							<Link to="/admin/list-game">
								<i><FontAwesomeIcon icon={faGamepad} size="lg"/></i>
								<span>Jeux</span>
							</Link>
							
						</li>
						<li>
							<Link to="/admin/set-home">
								<i><FontAwesomeIcon icon={faHome} size="lg"/></i>
								<span>Accueil</span>
							</Link>
						</li>
						<li>
							<Link to="/admin/set-home">
								<i><FontAwesomeIcon icon={faHome} size="lg"/></i>
								<span>Accueil</span>
							</Link>
						</li>
					</ul>
				</div>
			</div>
			<div className="side-menu">
				<ul>
					<li>
						<Link to="/">
							<i><FontAwesomeIcon icon={faDesktop} size="lg"/></i>
							<span>Tableau de bord</span>
						</Link>
					</li>
					<li>
						<Link to="/admin/tournament">
							<i><FontAwesomeIcon icon={faTrophy} size="lg"/></i>
							<span>Tournois</span>
						</Link>
					</li>
		            <li>
		                <Link to="/admin/communaute">
		                    <i><FontAwesomeIcon icon={faTools} size="lg"/></i>
		                    <span>Communaute</span>
		                </Link>
		            </li>
					<li>
						<Link to="/admin/league">
							<i><FontAwesomeIcon icon={faUsers} size="lg"/></i>
							<span>Ligues</span>
						</Link>
					</li>
					<li>
						<Link to="/admin/wagger">
							<i><FontAwesomeIcon icon={faStar} size="lg"/></i>
							<span>Waggers</span>
						</Link>
					</li>
					<li>
						<Link to="/admin/list-game">
							<i><FontAwesomeIcon icon={faGamepad} size="lg"/></i>
							<span>Jeux</span>
						</Link>
						
					</li>
					<li>
						<Link to="/admin/list-home">
							<i><FontAwesomeIcon icon={faHome} size="lg"/></i>
							<span>Accueil</span>
						</Link>
					</li>
					<li>
						<Link to="/admin/set-assist">
							<i><FontAwesomeIcon icon={faHandsHelping} size="lg"/></i>
							<span>Assistance</span>
						</Link>
					</li>
				</ul>
			</div>
		</aside>		
	)
}

export default SideBar
