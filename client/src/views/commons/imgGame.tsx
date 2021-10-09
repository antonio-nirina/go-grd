import React from "react"

import apexlegends from "../../assets/image/apex-legends.png"
import fortnite from "../../assets/image/fortnite.png"
import rainboxsix from "../../assets/image/rainbowsix.png"
import rocketleague from "../../assets/image/rocketleague.png"
import cod_vanguard from "../../assets/image/cod-vanguard.png"
import cod_warzone from "../../assets/image/warzone.png"
import cod_coldwar from "../../assets/image/cod-coldwar.png"
import fifa from "../../assets/image/fifa21.png"

const ImgGame = function() {
    return (
        <div className="bg-game test">
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
						<><img src={cod_vanguard} alt="Call of Duty Vanguard" /></>
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
    )
}

export default ImgGame