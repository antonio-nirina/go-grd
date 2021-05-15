import React from "react"
import { useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlaystation } from "@fortawesome/free-brands-svg-icons"
import { faCalendarAlt, faInfoCircle, faGamepad, faTrophy, faMedal, faStepBackward, faStepForward, faChevronRight, faChevronLeft, faMobile } from "@fortawesome/free-solid-svg-icons"
import {Translation} from "../../lang/translation"
import {RootState} from "../../reducer"

const HistoryTournament : React.FC = function() {
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)

	return (
		<div className="mes-tournois">
		<div className="tournois">
			<h2>{Object.keys(userConnectedRedux.user).length > 0 ?
						Translation(userConnectedRedux.user.language).profil.tournaments
						:
						Translation("fr").profil.tournaments}</h2>
			<div className="tab-content">
				<strong>{Object.keys(userConnectedRedux.user).length > 0 ?
						Translation(userConnectedRedux.user.language).profil.tournament
						:
						Translation("fr").profil.tournament}</strong>
				<table>
					<thead>
						<tr>
							<td><i className="iconStatus"><FontAwesomeIcon icon={faCalendarAlt}/></i>{Object.keys(userConnectedRedux.user).length > 0 ?
						Translation(userConnectedRedux.user.language).profil.date
						:
						Translation("fr").profil.date}</td>
							<td><i className="iconStatus"><FontAwesomeIcon icon={faGamepad}/></i>{Object.keys(userConnectedRedux.user).length > 0 ?
						Translation(userConnectedRedux.user.language).profil.game
						:
						Translation("fr").profil.game}</td>
							<td><i className="iconStatus"><FontAwesomeIcon icon={faTrophy}/></i>{Object.keys(userConnectedRedux.user).length > 0 ?
						Translation(userConnectedRedux.user.language).profil.tournament
						:
						Translation("fr").profil.tournament}</td>
							<td><i className="iconStatus"><FontAwesomeIcon icon={faMedal}/></i>{Object.keys(userConnectedRedux.user).length > 0 ?
						Translation(userConnectedRedux.user.language).profil.rank
						:
						Translation("fr").profil.rank}</td>
							<td></td>
						</tr>
					</thead>
					<tr>
						<td>04/04/2021</td>
						<td>Fifa21</td>
						<td><i className="iconStatus"><FontAwesomeIcon icon={faPlaystation}/></i>Classic Cup</td>
						<td>Top 8</td>
						<td><i className="iconStatus"><FontAwesomeIcon icon={faInfoCircle}/></i></td>
					</tr>
					<tr>
						<td>04/04/2021</td>
						<td>Fifa21</td>
						<td><i className="iconStatus"><FontAwesomeIcon icon={faPlaystation}/></i>Classic Cup</td>
						<td>Top 8</td>
						<td><i className="iconStatus"><FontAwesomeIcon icon={faInfoCircle}/></i></td>
					</tr>
					<tr>
						<td>04/04/2021</td>
						<td>Fifa21</td>
						<td><i className="iconStatus"><FontAwesomeIcon icon={faMobile}/></i>
						CoD Mobile</td>
						<td>Top 8</td>
						<td><i className="iconStatus"><FontAwesomeIcon icon={faInfoCircle}/></i></td>
					</tr>
					<tr>
						<td>04/04/2021</td>
						<td>Fifa21</td>
						<td><i className="iconStatus"><FontAwesomeIcon icon={faPlaystation}/></i>Classic Cup</td>
						<td>Top 8</td>
						<td><i className="iconStatus"><FontAwesomeIcon icon={faInfoCircle}/></i></td>
					</tr>
					<tr>
						<td>04/04/2021</td>
						<td>Fifa21</td>
						<td><i className="iconStatus"><FontAwesomeIcon icon={faPlaystation}/></i>Classic Cup</td>
						<td>Top 8</td>
						<td><i className="iconStatus"><FontAwesomeIcon icon={faInfoCircle}/></i></td>
					</tr>
				</table>
				<div className="filter">
					<p>{Object.keys(userConnectedRedux.user).length > 0 ?
						Translation(userConnectedRedux.user.language).profil.item
						:
						Translation("fr").profil.item} : 10 <span>1 - 10 of 10</span></p>
					<p>
						<i className="iconPager"><FontAwesomeIcon icon={faStepBackward}/></i>
						<i className="iconPager"><FontAwesomeIcon icon={faChevronLeft}/></i>
						<i className="iconPager"><FontAwesomeIcon icon={faChevronRight}/></i>
						<i className="iconPager"><FontAwesomeIcon icon={faStepForward}/></i>
					</p>
				</div>
			</div>
			<div className="tab-content">
				<strong>Leagues</strong>
				<table>
					<thead>
						<tr>
							<td><i className="iconStatus"><FontAwesomeIcon icon={faCalendarAlt}/></i>{Object.keys(userConnectedRedux.user).length > 0 ?
						Translation(userConnectedRedux.user.language).profil.date
						:
						Translation("fr").profil.date}</td>
							<td><i className="iconStatus"><FontAwesomeIcon icon={faGamepad}/></i>{Object.keys(userConnectedRedux.user).length > 0 ?
						Translation(userConnectedRedux.user.language).profil.game
						:
						Translation("fr").profil.game}</td>
							<td><i className="iconStatus"><FontAwesomeIcon icon={faTrophy}/></i>{Object.keys(userConnectedRedux.user).length > 0 ?
						Translation(userConnectedRedux.user.language).profil.tournament
						:
						Translation("fr").profil.tournament}</td>
							<td><i className="iconStatus"><FontAwesomeIcon icon={faMedal}/></i>{Object.keys(userConnectedRedux.user).length > 0 ?
						Translation(userConnectedRedux.user.language).profil.rank
						:
						Translation("fr").profil.rank}</td>
							<td></td>
						</tr>
					</thead>
					<tr>
						<td>04/04/2021</td>
						<td>Fifa21</td>
						<td><i className="iconStatus"><FontAwesomeIcon icon={faPlaystation}/></i>Classic Cup</td>
						<td>Top 8</td>
						<td><i className="iconStatus"><FontAwesomeIcon icon={faInfoCircle}/></i></td>
					</tr>
					<tr>
						<td>04/04/2021</td>
						<td>Fifa21</td>
						<td><i className="iconStatus"><FontAwesomeIcon icon={faPlaystation}/></i>Classic Cup</td>
						<td>Top 8</td>
						<td><i className="iconStatus"><FontAwesomeIcon icon={faInfoCircle}/></i></td>
					</tr>
					<tr>
						<td>04/04/2021</td>
						<td>Fifa21</td>
						<td><i className="iconStatus"><FontAwesomeIcon icon={faPlaystation}/></i>Classic Cup</td>
						<td>Top 8</td>
						<td><i className="iconStatus"><FontAwesomeIcon icon={faInfoCircle}/></i></td>
					</tr>
					<tr>
						<td>04/04/2021</td>
						<td>Fifa21</td>
						<td><i className="iconStatus"><FontAwesomeIcon icon={faPlaystation}/></i>Classic Cup</td>
						<td>Top 8</td>
						<td><i className="iconStatus"><FontAwesomeIcon icon={faInfoCircle}/></i></td>
					</tr>
					<tr>
						<td>04/04/2021</td>
						<td>Fifa21</td>
						<td><i className="iconStatus"><FontAwesomeIcon icon={faPlaystation}/></i>Classic Cup</td>
						<td>Top 8</td>
						<td><i className="iconStatus"><FontAwesomeIcon icon={faInfoCircle}/></i></td>
					</tr>
				</table>
				<div className="filter">
					<p>{Object.keys(userConnectedRedux.user).length > 0 ?
						Translation(userConnectedRedux.user.language).profil.item
						:
						Translation("fr").profil.item}: 10 <span>1 - 10 of 10</span></p>
					<p>
						<i className="iconPager"><FontAwesomeIcon icon={faStepBackward}/></i>
						<i className="iconPager"><FontAwesomeIcon icon={faChevronLeft}/></i>
						<i className="iconPager"><FontAwesomeIcon icon={faChevronRight}/></i>
						<i className="iconPager"><FontAwesomeIcon icon={faStepForward}/></i>
					</p>
				</div>
			</div>
		</div>
	</div>
	)
}

export default HistoryTournament
