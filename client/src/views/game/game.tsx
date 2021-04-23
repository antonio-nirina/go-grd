import React from "react"
import "../../assets/css/style.css"
import "../game/game.css"
import apexlegends from "../../assets/image/apex-legends.png"
import fortnite from "../../assets/image/fortnite.png"
import rainboxsix from "../../assets/image/rainbowsix.png"
import rocketleague from "../../assets/image/rocketleague.png"
import cod_Modernwarfare from "../../assets/image/modernwarfare.png"
import cod_warzone from "../../assets/image/warzone.png"
import cod_coldwar from "../../assets/image/cod-coldwar.png"
import fifa from "../../assets/image/fifa21.png"

const Game: React.FC = function() {
  return(
  <div className="jeux">
    <h2>Jeux</h2>
  	<div className="bg-game">
      <div className="firstblock w100">
        <div className="logo-game">
            <a href="#"><img src={apexlegends} alt="Apex Legends" /></a>
        </div>
        <div className="logo-game">
            <a href="#"><img src={fortnite} alt="Fortnite" /></a>
        </div>
        <div className="logo-game">
            <a href="#"><img src={rainboxsix} alt="RainbowSIx Siege" /></a>
        </div>
        <div className="logo-game">
            <a href="#"><img src={rocketleague} alt="Rocket League" /></a>
        </div>
      </div>
      <div className="lastblock w100">
        <div className="logo-game">
            <a href="#"><img src={cod_Modernwarfare} alt="Call of Duty Modern Warfare" /></a>
        </div>
        <div className="logo-game">
            <a href="#"><img src={cod_warzone} alt="Call of Duty Warzone" /></a>
        </div>
        <div className="logo-game">
            <a href="#"><img src={cod_coldwar} alt="Call of Duty Cold War" /></a>
        </div>
         <div className="logo-game">
            <a href="#"><img src={fifa} alt="Call of Duty Warzone" /></a>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Game;
