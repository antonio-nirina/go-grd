import React,{useState} from "react"

import { faCommentDots, faTimes, faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import AvatarDefault from "../../assets/image/game-tag.png"
import "./chat.css"


const Chat: React.FC = function() {
  const [showClose, setShowClose] = useState(false)
  
  const onShowClose = function(){
    setShowClose(!showClose)
  }
  return(
  <div className={!showClose ? "group-tchat tchat show" :"group-tchat tchat hide"}>
    <div className="tchat-header">
      <i className="tchat-icon"><FontAwesomeIcon icon={faCommentDots} size="xs"/></i>
      <span>Tchat groupe</span>
      <div className="close-tchat" onClick={onShowClose}>
        <i className="close-icon"><FontAwesomeIcon icon={faTimes} size="xs"/></i>      
      </div>           
    </div>    
    <div className="tchat-body">
      <div className="tchat-content">
        <div className="message msg-received">
          <img src={AvatarDefault} alt="" width="30"/>
          <div className="content">
            <p>Salut ;)<span>30/05/2021, 08:30:28</span></p>
          </div>
        </div>
        <div className="message msg-send">          
          <div className="content">
            <p>Salut !<span>30/05/2021, 08:30:28</span></p>
          </div>
          <img src={AvatarDefault} alt="" width="30"/>
        </div>
      </div>
      <div className="tchat-bar-dialog">
        <form>
          <input type="text" placeholder="Ecrire votre message ..." />
          <button><i className="send"><FontAwesomeIcon icon={faPaperPlane} size="xs"/></i></button>
        </form>
      </div>
    </div>
    <div className="tchat-footer">
    </div>
	</div>  
  )
}

export default Chat
