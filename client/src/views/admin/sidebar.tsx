import React from 'react'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faTools, faDesktop, faTrophy, faStar} from "@fortawesome/free-solid-svg-icons"

import logo from "../../assets/image/gogrind-joystick.png"

const SideBar : React.FC = function() {
	return (
		<aside className="main-sidebar ps">
			<Link to ="/admin" className="logo">
				<img src={logo} alt="logo" />
			</Link>
			<ul>
				<li>
					<Link to="/admin">
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
                    <Link to="/admin/set-rules">
                        <i><FontAwesomeIcon icon={faTools} size="lg"/></i>
                        <span>Modifier règles</span>
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
			</ul>
		</aside>
	)
}

export default SideBar
