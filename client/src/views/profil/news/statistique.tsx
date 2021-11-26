import React,{useCallback,useState} from "react"

import { faChartBar} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Game from "../../../assets/image/game.png"

const Statistiques = function() {
	const [showStat, setShowStat] = useState<boolean>(false)
	useCallback(() => {
			setShowStat(false)
		},
	[],)
	return (
		<>
		{showStat
			?
			<div className="flexbox">
				<div className="start-game">
					<div className="start">
						<img src={Game} alt="apex-legends" />
						<span><FontAwesomeIcon icon={faChartBar} />Statistiques</span>
					</div>
				</div>
				<div className="info-container">
					<div className="flex-items">
						<p>92 <span>Parties</span></p>
						<p>32 <span>Top 1</span></p>
						<p>35% <span>Taux de victoires</span></p>
					</div>
					<div className="flex-items">
						<p>
							<strong><span className="lose">L </span><span className="lose">L</span><span className="win">W </span><span className="lose">L </span></strong>
							Score recents</p>
						<p>2.75<span>K/D</span></p>
						<p>923<span>Placement FR</span></p>
					</div>
					<div className="flex-items">
						<p>Ligue<span>-</span></p>
						<p>Placement<span>-</span></p>
						<p>Score<span>-</span></p>
					</div>
				</div>
			</div>

			:
			<div></div>
		}
		</>

	)
}

export default Statistiques
