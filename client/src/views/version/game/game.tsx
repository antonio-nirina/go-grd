import React from "react"
import { useSelector } from "react-redux"

import {Translation} from "../../../lang/translation"
import {RootState} from "../../../reducer"
import "../../../assets/css/style.css"
import "../../game/game.css"

import apexlegends from "../../../assets/image/apex-legends.png"
import fortnite from "../../../assets/image/fortnite.png"
import rainboxsix from "../../../assets/image/rainbowsix.png"
import rocketleague from "../../../assets/image/rocketleague.png"
import cod_Modernwarfare from "../../../assets/image/modernwarfare.png"
import cod_warzone from "../../../assets/image/warzone.png"
import cod_coldwar from "../../../assets/image/cod-coldwar.png"
import fifa from "../../../assets/image/fifa21.png"
import Background from "../../../assets/image/background-img.jpg"

const Game: React.FC = function() {
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
  return(
  <div className="jeux" style={{ background: `url(${Background})`}}>
    <h2>
	{
		Object.keys(userConnectedRedux.user).length > 0 ?
		Translation(userConnectedRedux.user.language).participHome.game
		:
		Translation("fr").participHome.game
	}
	</h2>
  	<div className="bg-game">
      <div className="firstblock w100">
        <div className="logo-game">
            <><img src={apexlegends} alt="Apex Legends" /></>
        </div>
        <div className="logo-game">
            <><img src={fortnite} alt="Fortnite" /></>
        </div>
        <div className="logo-game">
            <><img src={rainboxsix} alt="RainbowSIx Siege" /></>
        </div>
        <div className="logo-game">
            <><img src={rocketleague} alt="Rocket League" /></>
        </div>
      </div>
      <div className="lastblock w100">
        <div className="logo-game">
            <><img src={cod_Modernwarfare} alt="Call of Duty Modern Warfare" /></>
        </div>
        <div className="logo-game">
            <><img src={cod_warzone} alt="Call of Duty Warzone" /></>
        </div>
        <div className="logo-game">
            <><img src={cod_coldwar} alt="Call of Duty Cold War" /></>
        </div>
         <div className="logo-game">
            <><img src={fifa} alt="Call of Duty Warzone" /></>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Game
