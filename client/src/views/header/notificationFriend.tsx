import React,{useState} from "react"
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBell, faUsers, faTimes, faCheck } from "@fortawesome/free-solid-svg-icons"
import AvatarDefault from "../../assets/image/game-tag.png"
import {Translation} from "../../lang/translation"
import {RootState} from "../../reducer"

import {Notif} from "./header"

const Notifications = function(data:Array<Notif>) {
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	return(
		<>
			data
			<p>
		        <img src={AvatarDefault} className="avatar-found"/>
		        <span className="profil-name">Name</span>
		        <button className="btn bg-yellow">
		            <i className="rect"><FontAwesomeIcon icon={faCheck} size="xs"/></i>
		            <span>
		            	{
							Object.keys(userConnectedRedux.user).length > 0 ?
							Translation(userConnectedRedux.user.language).header.accepted
							:
							Translation("fr").header.accepted
						}
	            	</span>
		        </button>
		         <button className="btn bg-white gray">
		            <i className="rect"><FontAwesomeIcon icon={faTimes} size="xs"/></i>
		            <span>
		            	{
							Object.keys(userConnectedRedux.user).length > 0 ?
							Translation(userConnectedRedux.user.language).header.refuse
							:
							Translation("fr").header.refuse
						}

		            </span>
		        </button>
		    </p>
		    {/*<p>
		        {
					Object.keys(userConnectedRedux.user).length > 0 ?
					Translation(userConnectedRedux.user.language).communauty.withFriend
					:
					Translation("fr").communauty.withFriend
				}
		        <Link to="#">Nirina1718</Link>
		        <span className="date">{new Date().toLocaleDateString()}</span>
		    </p>*/}
    	</>
	)
}

export default Notifications
