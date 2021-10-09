import React from "react"
import { useSelector } from "react-redux"

import {Translation} from "../../lang/translation"
import {RootState} from "../../reducer"
import "../../assets/css/style.css"
import "../game/game.css"
import ImgGame from "../commons/imgGame"


const Game: React.FC = function() {
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	return(
	<div className="jeux">
		<h2>
			{
				Object.keys(userConnectedRedux.user).length > 0 ?
				Translation(userConnectedRedux.user.language).participHome.game
				:
				Translation("fr").participHome.game
			}
		</h2>
		<ImgGame />
	</div>
	);
}

export default Game
