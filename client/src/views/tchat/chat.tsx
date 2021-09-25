import React from "react"

import { faCommentDots, faTimes, faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import AvatarDefault from "../../assets/image/game-tag.png"
import {dateDefault} from "../tools/dateConvert"
import "./chat.css"

type TypeTchat = {
	handleTchat:Function
}

const Chat = function({handleTchat}:TypeTchat) {
	const handleClosed = function() {
		handleTchat(false)
	}

  return(
	<div className="tchat">
		<div className="tchat-header">
		  <i className="tchat-icon"><FontAwesomeIcon icon={faCommentDots} size="xs"/></i>
		  <span>Nirina1718</span>
		  <div className="close-tchat">
			<i className="close-icon" style={{"cursor":"pointer"}} onClick={handleClosed}><FontAwesomeIcon icon={faTimes} size="xs"/></i>
		  </div>
		</div>
	<div className="tchat-body">
	  <div className="tchat-content">
		<div className="message msg-received">
		  <img src={AvatarDefault} alt="" width="30"/>
		  <div className="content">
			<p>Salut ;)<span>{dateDefault()}</span></p>
		  </div>
		</div>
		<div className="message msg-send">          
		  <div className="content">
			<p>Salut !<span>{dateDefault()}</span></p>
		  </div>
		  <img src={AvatarDefault} alt="" width="30"/>
		</div>
	  </div>
	  <div className="tchat-bar-dialog">
		<form>
		  <input type="text" placeholder="Ecrire votre message ..." />
		  <button className="btn bg-red"><i className="send"><FontAwesomeIcon icon={faPaperPlane} size="xs"/></i></button>
		</form>
	  </div>
	</div>
	<div className="tchat-footer">
	</div>
	</div>
  )
}

export default Chat
