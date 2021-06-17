import React,{useState} from "react"
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBell, faUsers, faTimes, faCheck } from "@fortawesome/free-solid-svg-icons"
import AvatarDefault from "../../assets/image/game-tag.png"


const Notifications: React.FC = function() {
	return(
		<>
			<p>
		        <img src={AvatarDefault} className="avatar-found"/>
		        <span className="profil-name">Name</span>
		        <button className="btn bg-yellow">
		            <i className="rect"><FontAwesomeIcon icon={faCheck} size="xs"/></i>
		            <span>Accepter</span>
		        </button>
		         <button className="btn bg-white gray">
		            <i className="rect"><FontAwesomeIcon icon={faTimes} size="xs"/></i>
		            <span>Refuser</span>
		        </button>
		    </p>
		    <p>
		        Vous êtes maintenant ami(e) avec <Link to="#">Nirina1718</Link>
		        <span className="date">{new Date().toLocaleDateString()}</span>
		    </p>
    	</>
	)
}

export default Notifications
