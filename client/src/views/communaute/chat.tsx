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
    <div className="tchat-salon">
      <div className="tchat-header-title">
        <p>Salon de tchat</p>
      </div>
      <div className="salon-body">    
          
      </div>
    </div>
    <div className="tchat-container">
      <div className="tchat-header">
        <p></p>            
      </div>    
      <div className="tchat-body">
        <div className="tchat-content">
          <div className="message msg-received">
            
            <div className="content">
              <p>Salut ;)<span>30/05/2021, 08:30:28</span></p>
            </div>
          </div>
          <div className="message msg-send">          
            <div className="content">
              <p>Salut !<span>30/05/2021, 08:30:28</span></p>
            </div>
            
          </div>
        </div>
        <div className="tchat-bar-dialog">
          <form>
            <input type="text" placeholder="Ecrire votre message ..." />            
          </form>
        </div>
      </div>
    </div>
	</div>  
  )
}

export default Chat
