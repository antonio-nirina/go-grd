import React from "react"
// import { Link } from "react-router-dom"
import Header from "../header/header"
import Footer from "../footer/footer"
import {useState} from "react"
import "../tournament/info.css"
import "../../assets/css/style.css"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlaystation } from "@fortawesome/free-brands-svg-icons"
import { faAngleDown, faCalendarAlt, faInfoCircle, faGamepad, faTrophy, faMedal, faStepBackward, faStepForward, faChevronRight, faChevronLeft, faMobile } from "@fortawesome/free-solid-svg-icons"


const Teams: React.FC = function(props:any) {
	const [showList, setShowList] = useState<Boolean>(false)
	const onVisible = function(){
	    setShowList(!showList)
	}
  return(
  	<div className="Tournament info">
		<div className="container">
			<Header/>
			<div className="full-container">
				<div className="details">
					<p className="name-target">Tournois : <span>Rocket League</span></p>
					<p className="starting">Date de commencement : <span>19 Juin 2022, 17:00</span></p>
					<p className="status">Status : <span>ouvert</span></p>
				</div>
				
				<div className="banniere"></div>
				<div className="tabs">
					<ul>
						<li><Link to="/info">Info</Link></li>
						<li><Link to="/matches">Match</Link></li>
						<li><Link to="/teams" className="active">Equipes</Link></li>
						<li><Link to="/rules">Règles</Link></li>
					</ul>
				</div>				
				<div className="teams">
					<h2>Equipes</h2>
					<table>
						<tr>
							<th>Equipes confirmées</th>
							<th>Plus d'info</th>
							<th>Classement</th>
							<th>Pays</th>
							<th>p</th>
							<th>w</th>
							<th>l</th>
							<th>Enregistré</th>
						</tr>
						<tr>
							<td><img src="https://i.ibb.co/dQPw2Vd/teamlogo.png" alt="teamlogo" width="25" height="25" />Randomteam</td>
							<td><FontAwesomeIcon icon={faAngleDown} onClick={onVisible} className="pointer"/></td>
							<td>1500</td>
							<td><img src="https://i.ibb.co/gvSwfSp/gb.png" alt="gb" width="25" height="25" /></td>
							<td>6</td>
							<td>4</td>
							<td>2</td>
							<td>Oui</td>
						</tr>
						
					</table>
					<div className={!showList ? "onshow" :"onhide"}>
						<div className="score">
							<table>
								<tr>
									<th className="win"><i><FontAwesomeIcon icon={faTrophy}/></i></th>
									<th>4</th>
									<th>2</th>
									<th className="lose"><i><FontAwesomeIcon icon={faTrophy}/></i></th>
								</tr>
								<tr>
									<td className="win">L.W.S</td>
									<td>0</td>
									<td>4</td>
									<td className="lose">L.L.S</td>
								</tr>
							</table>							
						</div>
						<div className="rating">
							<div className="numb"><span>1841</span><p>Classement</p></div>
							<div className="numb"><span>7</span><p>Members</p></div>
						</div>						
						<table className="gamers">
							<tr>
								<th>Joueur</th>
								<th></th>
								<th>Classement</th>								
								<th>Victoire</th>
								<th>Défaite</th>
								<th>Assists</th>
								<th>Ratio</th>
							</tr>
							<tr>
								<td><img src="https://i.ibb.co/dQPw2Vd/teamlogo.png" alt="teamlogo" width="25" height="25" />Wilder</td>
								<td><img src="https://i.ibb.co/dQPw2Vd/teamlogo.png" alt="teamlogo" width="25" height="25" /><img src="https://i.ibb.co/gvSwfSp/gb.png" alt="teamlogo" width="25" height="25" /></td>
								<td>9912</td>
								<td>1818</td>
								<td>10178</td>
								<td>2173</td>
								<td>1.02</td>
							</tr>
							<tr>
								<td><img src="https://i.ibb.co/dQPw2Vd/teamlogo.png" alt="teamlogo" width="25" height="25" />Emeral</td>
								<td><img src="https://i.ibb.co/dQPw2Vd/teamlogo.png" alt="teamlogo" width="25" height="25" /><img src="https://i.ibb.co/gvSwfSp/gb.png" alt="teamlogo" width="25" height="25" /></td>
								<td>8912</td>
								<td>1018</td>
								<td>10278</td>
								<td>2073</td>
								<td>0.02</td>
							</tr>
						</table>					
					</div>
				</div>					
			</div>			
			<Footer/>
		</div>
    </div>
  )
}

export default Teams