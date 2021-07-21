import React,{useEffect,useState} from "react"
import { Link } from "react-router-dom"
import {useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import { faPlaystation} from "@fortawesome/free-brands-svg-icons"
import { faGamepad, faTrophy } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {useQuery} from "@apollo/client"

import Header from "../header/header"
import Footer from "../footer/footer"
import {Translation} from "../../lang/translation"
import {RootState} from "../../reducer"
import "../../assets/css/style.css"
import "../annexe/tournois.css"
import "../participate/participate.css"

import apexlegends from "../../assets/image/apex-legends.png"
import fortnite from "../../assets/image/fortnite.png"
import rainboxsix from "../../assets/image/rainbowsix.png"
import rocketleague from "../../assets/image/rocketleague.png"
import cod_Modernwarfare from "../../assets/image/modernwarfare.png"
import cod_warzone from "../../assets/image/warzone.png"
import cod_coldwar from "../../assets/image/cod-coldwar.png"
import fifa from "../../assets/image/fifa21.png"
import {APEX_LEGENDE,FORTNITE,RNB,RL,COD_MODERN,COD_WAR_ZONE,COD_COLD_WAR,FIFA} from "../game/constante"
import {Tournament} from "../models/tournament"
import {GET_ALL_TOURNAMENT} from "../../gql/tournament/query"
import {dateStringToDY} from "../tools/dateConvert"

const Tournois: React.FC = function() {
	const history = useHistory()
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const [tournament, setTournament] = useState<Array<Tournament>>([])
	const {loading,error,data} 	= useQuery(GET_ALL_TOURNAMENT, {
			variables: {
				limit:4,
				pageNumber:0
			},
	})

	useEffect(() => {
		//let init = true
		if(!loading && !error && data) {
			setTournament(data.FindAllTournament)
		}

		// return () => init = false

	},[loading,error,data])

  	return(
	  	<div className="container">
	  		<Header />
	  		<div className="tournament-bloc">
	  			<div className="full-container">
					<h1>
						{
							Translation(userConnectedRedux.user.language).tournament.list
						}
						</h1>
						<div className="card">
							<h2>
								{
									Translation(userConnectedRedux.user.language).tournament.incoming
								}
							</h2>
							<div className="bt-container">
								<Link to="#" className="btn bg-red">
									{
										Translation(userConnectedRedux.user.language).tournament.seemore
									}
								</Link>
							</div>
							<div className="flex-upcoming">
							{
								tournament?.map(function(el:any,index:number){
									return (
										<div className="upcomming side" key={index} onClick={()=>{history.push(`/info?uid=${el.uid}`)}} style={{"cursor":"pointer"}}>
												<div className="items">
													<div className="side-img">
														<img src={el.game.logo} alt={el.game.name}/>
													</div>
													<div className="side-infos">
														<div className="meta">
															<table>
																<thead>
																	<tr>
																		<td>
																			Date
																		</td>
																		<td>
																			{
																				el.numberTeam > 0 ?
																				Translation(userConnectedRedux.user.language).tournament.team :
																				Translation(userConnectedRedux.user.language).tournament.player
																			}
																		</td>
																		<td>Type</td>
																	</tr>
																</thead>
																<tbody>
																	<tr>
																		<td>{userConnectedRedux.user.language === "fr" ? dateStringToDY(el.date) : dateStringToDY(el.date)}</td>
																		<td>{`0/${el.priceParticipate}`}</td>
																		<td>{el.numberTeam > 0 ? `${el.numberTeam} ON ${el.numberTeam}` : "1 ON 1" }</td>
																	</tr>
																</tbody>
															</table>
														</div>
														<div className="name-section">
															<p>
																{el.game.name}
															</p>
														</div>
														<div className="prize-section">
															<div className="prize-warp">
																<i className="awesome"><FontAwesomeIcon icon={faTrophy}/></i>
																{
																	Translation(userConnectedRedux.user.language).tournament.prize
																}
															</div>
															<div className="prize" style={{"fontWeight":"bold"}}>
																{`${el.price} € ${Translation(userConnectedRedux.user.language).tournament.price}`}
															</div>
														</div>
													</div>
													<div className="btn-full">
														<Link to="/" className="signup-btn bg-red">
															{
																Translation(userConnectedRedux.user.language).tournament.signup
															}
														</Link>
													</div>
												</div>
										</div>
									)
								})
							}
							</div>
						</div>
					</div>
		  			<div className="choices">
					<div className="jeux">
					    <h2>
							{
								Translation(userConnectedRedux.user.language).tournament.chgame
							}
						</h2>
						<div className="bg-game">
						<div className="firstblock w100">
							<div className="logo-game">
							    <Link to={`/tournament-game?game=${APEX_LEGENDE.replace(" ","_")}`}><img src={apexlegends} alt="Apex Legends" /></Link>
							</div>
							<div className="logo-game">
							    <Link to={`/tournament-game?game=${FORTNITE.replace(" ","_")}`}><img src={fortnite} alt="Fortnite" /></Link>
							</div>
							<div className="logo-game">
							    <Link to={`/tournament-game?game=${RNB.replace(" ","_")}`}><img src={rainboxsix} alt="RainbowSIx Siege" /></Link>
							</div>
							<div className="logo-game">
							    <Link to={`/tournament-game?game=${RL.replace(" ","_")}`}><img src={rocketleague} alt="Rocket League" /></Link>
							</div>
						</div>
		      			<div className="lastblock w100">
					        <div className="logo-game">
					            <Link to={`/tournament-game?game=${COD_MODERN.replace(" ","_")}`}><img src={cod_Modernwarfare} alt="Call of Duty Modern Warfare" /></Link>
					        </div>
					        <div className="logo-game">
					            <Link to={`/tournament-game?game=${COD_WAR_ZONE.replace(" ","_")}`}><img src={cod_warzone} alt="Call of Duty Warzone" /></Link>
					        </div>
					        <div className="logo-game">
					            <Link to={`/tournament-game?game=${COD_COLD_WAR.replace(" ","_")}`}><img src={cod_coldwar} alt="Call of Duty Cold War" /></Link>
					        </div>
					        <div className="logo-game">
					            <Link to={`/tournament-game?game=${FIFA.replace(" ","_")}`}><img src={fifa} alt="Call of Duty Warzone" /></Link>
					        </div>
						</div>
					</div>
		 			</div>
		  			<div className="participate league">
					<div className="marg">
						<div className="part">
							<div className="undertitle">
								<h2>
									{
										Translation(userConnectedRedux.user.language).tournament.lasttournament
									}
								</h2>
								<p>
									{
										Translation(userConnectedRedux.user.language).tournament.lastresult
									}
								</p>
							</div>
							<div className="content">
								<div className="clear"></div>
								<div className="apex block dark-red">
									<div><p className="legend">Fortnite Weekly Cup</p><i className="iconGame"><FontAwesomeIcon icon={faGamepad}/></i></div>
									<div className="info">
										<p className="price inblock"><i className="sprite cup"></i><span>50€ Cash Prize</span></p>
										<p className="date inblock"><i className="sprite calendar"></i><span>03/04/2021 - 5:00 PM</span></p>
									</div>
								</div>
								<div className="apex block light-green">
									<div><p className="legend">Rocket League Champions</p><i className="iconGame"><FontAwesomeIcon icon={faPlaystation}/></i></div>
									<div className="info">
										<p className="price inblock"><i className="sprite ticket"></i><span>5€ Cash Prize</span></p>
										<p className="price inblock"><i className="sprite cup"></i><span>500€ Cash Prize</span></p>
										<p className="date inblock"><i className="sprite calendar"></i><span>04/04/2021 - 7:30 PM</span></p>
									</div>
								</div>
							</div>
						</div>
					</div>
					</div>
					</div>
				</div>
			<Footer/>
	  	</div>
  	)
}

export default Tournois
