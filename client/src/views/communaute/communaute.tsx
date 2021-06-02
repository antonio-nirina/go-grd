import React from "react"
import { useSelector } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons"

import Header from "../header/header"
import {RootState} from "../../reducer"
import Footer from "../footer/footer"
import AvatarDefault from "../../assets/image/game-tag.png"
import "./communaute.css"


const Communaute: React.FC = function() {
	const userConnectedRedux 	= useSelector((state:RootState) => state.userConnected)
  return(
	<div>
		<div>
			<Header/>
		</div>
		<div className="content-community">
			<div className="side-left">
				<div className="games">gg</div>
				<div className="stream"></div>
			</div>
			<div className="actuality-community"></div>
			<div className="side-right">
				<div className="find-friend">
					<input type="text" placeholder="find friend" />
				</div>
				<div className="friend-inline">
				  	<div className="avatar-profile">
				  		<img src = {userConnectedRedux.user.avatar? userConnectedRedux.user.avatar : AvatarDefault} />
				  	</div>
				  	<div className="username-profile">{userConnectedRedux.user.username}</div>
				  	<div className="instat" >
				  		<div className="statut-connex"></div>
			  		</div>
			  		<div className="chat-button" style={{"cursor":"pointer"}}>
					  <FontAwesomeIcon icon={faFacebookMessenger} color={"#f2cf1c"} size={"lg"} />
					  </div>
				</div>
				<div className="store">
					store
				</div>
				<div className="tchat">
					tchat
				</div>
			</div>
		</div>
		<Footer/>
	</div>
  )
}

export default Communaute
