import React,{useEffect,useState} from "react"

import { faTwitch, faYoutube, faFacebook, faXbox, faPlaystation, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {SigingTwitch} from "../auth/twitch"

const SocialNetwork = function() {
    const [isTwitch,setIsTwitch] = useState<boolean>(false)
    const [isXbox,setIsXbox] = useState<boolean>(false)
    const [isPlaystation,setIsPlaystation] = useState<boolean>(false)
    const [isYoutube,setIsYoutube] = useState<boolean>(false)
    const [isFacebook,setIsFacebook] = useState<boolean>(false)
    const [isTwiiter,setIsTwiiter] = useState<boolean>(false)

    useEffect(() => {
		const strg = localStorage.getItem("access_token_twitch")
		if(strg) {
			setIsTwitch(true)
		}
        const strgXbox = localStorage.getItem("access_token_xbox")
		if(strgXbox) {
			setIsXbox(true)
		}
        const strgPlaystation = localStorage.getItem("access_token_playstation")
		if(strgPlaystation) {
			setIsPlaystation(true)
		}
        const strgYoutube = localStorage.getItem("access_token_youtbe")
		if(strgYoutube) {
			setIsYoutube(true)
		}
        const strgFacebook = localStorage.getItem("access_token_facebook")
		if(strgFacebook) {
			setIsFacebook(true)
		}
        const strgTwiiter = localStorage.getItem("access_token_twiiter")
		if(strgTwiiter) {
			setIsTwiiter(true)
		}
	},[])
    return (
        <div className="rss-view">
            <div className="double">
                <div className="reseau-container">
                    <div className="rss-container">
                        <i><FontAwesomeIcon icon={faTwitch} style={{"cursor":"pointer"}} onClick={SigingTwitch} /></i>
                        <p>									
                            <strong>Twitch</strong>
                            <span>
                                {isTwitch ? "Connecté" : "Non connecté"}
                            </span>
                        </p>
                    </div>									
                </div>
                <div className="reseau-container">
                    <div className="rss-container">
                        <i><FontAwesomeIcon icon={faYoutube} style={{"cursor":"pointer"}} /></i>
                        <p>									
                            <strong>Youtube</strong>
                            <span>
                            {isYoutube ? "Connecté" : "Non connecté"}
                            </span>
                        </p>
                    </div>									
                </div>
                <div className="reseau-container">
                    <div className="rss-container">
                        <i><FontAwesomeIcon icon={faFacebook} style={{"cursor":"pointer"}} /></i>
                        <p>									
                            <strong>Facebook</strong>
                            <span>{isFacebook ? "Connecté" : "Non connecté"}</span>
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
                            <span>
                                {isXbox ? "Connecté" : "Non connecté"}
                            </span>
                        </p>
                    </div>									
                </div>
                <div className="reseau-container">
                    <div className="rss-container">
                        <i><FontAwesomeIcon icon={faPlaystation} style={{"cursor":"pointer"}} /></i>
                        <p>									
                            <strong>Playstation</strong>
                            <span>
                                {isPlaystation ? "Connecté" : "Non connecté"}
                            </span>
                        </p>
                    </div>									
                </div>
                <div className="reseau-container">
                    <div className="rss-container">
                        <i><FontAwesomeIcon icon={faTwitter} style={{"cursor":"pointer"}} /></i>
                        <p>									
                            <strong>Twiiter</strong>
                            <span>
                                {isTwiiter ? "Connecté" : "Non connecté"}
                            </span>
                        </p>
                    </div>									
                </div>
            </div>	
        </div>
    )
}

export default SocialNetwork