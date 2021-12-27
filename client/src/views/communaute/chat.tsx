import React from "react"

import AvatarDefault from "../../assets/image/game-tag.png"
import TchatIcon from "../../assets/image/picto/tchat-icon.png"
import "./chat.css"


const Chat: React.FC = function() {
  return(
  <div className="group-tchat tchat show">
    <div className="tchat-salon">
      <div className="tchat-header-title">
        <p>Salon de tchat</p>
      </div>
      <div className="salon-body">
          <p>
            <img src={AvatarDefault} alt="" width="25"/>
            <span>Wager Apex Legends - 3v3...</span>
            <img src={TchatIcon} alt="" width="15"/>
          </p>
      </div>
      <div className="salon-body">
          <p>
            <img src={AvatarDefault} alt="" width="25"/>
            <span>Wager Apex Legends - 3v3...</span>
            <img src={TchatIcon} alt="" width="15"/>
            <span className="counter">2</span>
          </p>
      </div>
    </div>
    <div className="tchat-container">
      <div className="tchat-header">
        <strong>Go Grind_Admin</strong>
        <p>Merci d'avoir rejoins Wager Apex Legends - 2v2 Arène - Master !</p>
        <p>Merci de confirmer votre participation en cliquant sur Lancer</p>
      </div>
      <div className="tchat-header">
        <strong>Go Grind_Admin</strong>
        <p>Tous les joueurs ont confirmés leurs présences</p>
      </div>
      <div className="tchat-body">
        <div className="tchat-content">
          <div className="message msg-send">
            <div className="content">
              <strong>Skouinar</strong>
              <p>Yo, vous etes sur quelle plateforme ?</p>
            </div>
          </div>
          <div className="message msg-received">
            <div className="content">
              <strong>CapelaJR</strong>
              <p>PS4 ajoute CapellaJr</p>
            </div>
          </div>
          <div className="message msg-send">
            <div className="content">
              <strong>Skouinar</strong>
              <p>Ok, je t'invite en suivant !</p>
            </div>
          </div>
        </div>
        <div className="tchat-bar-dialog">
          <form>
            <input type="text" placeholder="Ecrire votre message..." />
          </form>
        </div>
      </div>
    </div>
	</div>
  )
}

export default Chat
