import React from "react"
import { Link } from "react-router-dom"

import { faUsers, faPowerOff } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import avatar from "../../assets/image/game-tag.png"

import "../admin/admin.css"
import logo from "../../assets/image/gogrind-joystick.png"
const Admin: React.FC = function() {	
  return(
    <div className="admin">    	
		<section className="layout-container">
			<aside className="main-sidebar ps">
				<Link to ="#" className="logo">
					<img src={logo} alt="logo" />
				</Link>
				<ul>
					<li>
						<Link to="#">
							<i><FontAwesomeIcon icon={faUsers} size="lg"/></i>
							<span>Dashboard</span>
						</Link>
					</li>
					<li>
						<Link to="#">
							<i><FontAwesomeIcon icon={faUsers} size="lg"/></i>
							<span>Tournois</span>
						</Link>
					</li>
					<li>
						<Link to="#">
							<i><FontAwesomeIcon icon={faUsers} size="lg"/></i>
							<span>Ligues</span>
						</Link>
					</li>
					<li>
						<Link to="#">
							<i><FontAwesomeIcon icon={faUsers} size="lg"/></i>
							<span>Waggers</span>
						</Link>
					</li>					
				</ul>
			</aside>
			<div className="content-wrapper">
				<nav className="navbar">
          			<div></div>
      				<div id="profile-name" className="profil-name">
      					<Link to = "#">
      						<img src={avatar} alt="" /> 
  							<span className="d-md-inline-block">
  								Administrateur
  							</span>
  							<i className="power"><FontAwesomeIcon icon={faPowerOff} size="lg"/></i>
      					</Link>
      				</div>
        		</nav>
			</div>
		</section>
  	</div>
  )
}

export default Admin
