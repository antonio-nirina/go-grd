import React from "react"

import { faTwitch, faYoutube, faFacebook, faXbox, faPlaystation, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {SigingTwitch} from "../auth/twitch"

const SocialNetwork = function() {
    return (
        <div className="rss-view">
            <div className="double">
                <div className="reseau-container">
                    <div className="rss-container">
                        <i><FontAwesomeIcon icon={faTwitch} style={{"cursor":"pointer"}} onClick={SigingTwitch} /></i>
                        <p>									
                            <strong>Twitch</strong>
                            <span>Skouinar</span>
                        </p>
                    </div>									
                </div>
                <div className="reseau-container">
                    <div className="rss-container">
                        <i><FontAwesomeIcon icon={faYoutube} style={{"cursor":"pointer"}} /></i>
                        <p>									
                            <strong>Youtube</strong>
                            <span>Non connecté</span>
                        </p>
                    </div>									
                </div>
                <div className="reseau-container">
                    <div className="rss-container">
                        <i><FontAwesomeIcon icon={faFacebook} style={{"cursor":"pointer"}} /></i>
                        <p>									
                            <strong>Facebook</strong>
                            <span>Non connecté</span>
                        </p>
                    </div>									
                </div>
            </div>
            <div className="double">
                <div className="reseau-container">
                    <div className="rss-container">
                        <i><FontAwesomeIcon icon={faXbox} style={{"cursor":"pointer"}} /></i>
                        <p>									
                            <strong>Xbox</strong>
                            <span>Skouinar</span>
                        </p>
                    </div>									
                </div>
                <div className="reseau-container">
                    <div className="rss-container">
                        <i><FontAwesomeIcon icon={faPlaystation} style={{"cursor":"pointer"}} /></i>
                        <p>									
                            <strong>Playstation</strong>
                            <span>Non connecté</span>
                        </p>
                    </div>									
                </div>
                <div className="reseau-container">
                    <div className="rss-container">
                        <i><FontAwesomeIcon icon={faTwitter} style={{"cursor":"pointer"}} /></i>
                        <p>									
                            <strong>Twiiter</strong>
                            <span>@Skouinar</span>
                        </p>
                    </div>									
                </div>
            </div>	
        </div>
    )
}

export default SocialNetwork