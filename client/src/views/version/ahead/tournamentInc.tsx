import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUsers } from "@fortawesome/free-solid-svg-icons"
import Fortnite from "../../../assets/image/picto/fortnite.png"
import RL from "../../../assets/image/picto/RL.png"
import Vanguard from "../../../assets/image/picto/vanguard.png"

const TournamentInc = function() {
	return (
		<div className="tournament_wall">
			<div className="list_tournament">
				<img src={Fortnite} width="40" height="30" alt=""/>
				<p className="game_name">Fortnite daily cup <span>23 Jul - 12h30 - 6 jours</span></p>
				<p className="cashprize">Cashprize<span>500 G-Coins</span></p>
				<p className="arena">3v3 Arène</p>
				<p className="place"><i><FontAwesomeIcon icon={faUsers}/></i><span>6 places restantes</span></p>
			</div>
			<div className="list_tournament">
				<img src={RL} width="40" height="30" alt=""/>
				<p className="game_name">Fortnite daily cup <span>23 Jul - 12h30 - 6 jours</span></p>
				<p className="cashprize">Cashprize<span>500 G-Coins</span></p>
				<p className="arena">3v3 Arène</p>
				<p className="place"><i><FontAwesomeIcon icon={faUsers}/></i><span>6 places restantes</span></p>
			</div>
			<div className="list_tournament">
				<img src={Vanguard} width="40" height="30" alt=""/>
				<p className="game_name">Fortnite daily cup <span>23 Jul - 12h30 - 6 jours</span></p>
				<p className="cashprize">Cashprize<span>500 G-Coins</span></p>
				<p className="arena">3v3 Arène</p>
				<p className="place"><i><FontAwesomeIcon icon={faUsers}/></i><span>6 places restantes</span></p>
			</div>
			<div className="list_tournament">
				<img src={Fortnite} width="40" height="30" alt=""/>
				<p className="game_name">Fortnite daily cup <span>23 Jul - 12h30 - 6 jours</span></p>
				<p className="cashprize">Cashprize<span>500 G-Coins</span></p>
				<p className="arena">3v3 Arène</p>
				<p className="place"><i><FontAwesomeIcon icon={faUsers}/></i><span>6 places restantes</span></p>
			</div>
		</div>
	)
}

export default TournamentInc
