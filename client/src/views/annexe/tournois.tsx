import React,{useEffect,useState} from "react"
import { Link } from "react-router-dom"
import {useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
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
import cod_vanguard from "../../assets/image/cod-vanguard.png"
import cod_warzone from "../../assets/image/warzone.png"
import cod_coldwar from "../../assets/image/cod-coldwar.png"
import fifa from "../../assets/image/fifa21.png"
import {APEX_LEGENDE,FORTNITE,RNB,RL,COD_MODERN,COD_WAR_ZONE,COD_COLD_WAR,FIFA} from "../game/constante"
import {
	SLUG_APEX_LEGENDE,
	SLUG_FORTNITE,
	SLUG_RNB,
	SLUG_RL,
	SLUG_COD_MODERN,
	SLUG_COD_WAR_ZONE,
	SLUG_COD_COLD_WAR,
	SLUG_FIFA
} from"../game/constante"
import {Tournament} from "../models/tournament"
import {GET_ALL_TOURNAMENT} from "../../gql/tournament/query"
import {GET_PART_USER} from "../../gql/participate/query"
import {dateStringToDY} from "../tools/dateConvert"
import {renderPlatformLogo} from "./renderLogo"
import {LIMIT,PAGE_NUMBER} from "../commons/constante"


const Tournois: React.FC = function() {
	const history = useHistory()
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const [tournament, setTournament] = useState<Tournament[]>([])
	const [lastTournament, setLastTournament] = useState<Tournament[]>([])
	const {loading,error,data} 	= useQuery(GET_ALL_TOURNAMENT, {
		variables: {
			limit:LIMIT,
			pageNumber:PAGE_NUMBER
		},
	})

	const {loading:ldPart,error:errPart,data:dataPart} 	= useQuery(GET_PART_USER, {
		variables: {
			uidUser:userConnectedRedux.user.uid,
			limit:LIMIT,
			pageNumber:PAGE_NUMBER
		},
	})

	useEffect(() => {
		//let init = true
		if(!loading && !error && data) {
			setTournament(data.FindAllTournament)
		}
		if(!ldPart && !errPart && dataPart) {
			if(dataPart && dataPart.FindPartByUser.length > 0) setLastTournament(dataPart.FindPartByUser)
		}

		// return () => init = false

	},[loading,error,data,ldPart,errPart,dataPart])

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
							<div className="flex-container">
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
							</div>
							<div className="flex-upcoming">
							{
								tournament?.map(function(el:Tournament,index:number){
									return (
										<div className="upcomming side" key={index} onClick={()=>{history.push(`/info?uid=${el.uid}`)}} style={{"cursor":"pointer"}}>
												<div className="items">
													<div className="side-img" style={{ background: `url(${el.game.logo})`}}>
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
																				Translation(userConnectedRedux.user.language).tournament.team
																			}
																		</td>
																		<td>Type</td>
																	</tr>
																</thead>
																<tbody>
																	<tr>
																		<td>{userConnectedRedux.user.language === "fr" ? dateStringToDY(el.dateStart) : dateStringToDY(el.dateStart)}</td>
																		<td>{`0/${el.numberParticipate}`}</td>
																		<td>{el.gameWay }</td>
																	</tr>
																</tbody>
															</table>
														</div>
														<div className="name-section">
															<p>
																<span>{el.game.name}</span>
																<span className="platform-logo">{renderPlatformLogo(el.plateform[0]?.name)}</span>
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
																{`${el.price} € `}
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
								    <Link to={`/tournament-game?game=${APEX_LEGENDE.replace(" ","_")}&slug=${SLUG_APEX_LEGENDE}`}><img src={apexlegends} alt="Apex Legends" /></Link>
								</div>
								<div className="logo-game">
								    <Link to={`/tournament-game?game=${FORTNITE.replace(" ","_")}&slug=${SLUG_FORTNITE}`}><img src={fortnite} alt="Fortnite" /></Link>
								</div>
								<div className="logo-game">
								    <Link to={`/tournament-game?game=${RNB.replace(" ","_")}&slug=${SLUG_RNB}`}><img src={rainboxsix} alt="RainbowSIx Siege" /></Link>
								</div>
								<div className="logo-game">
								    <Link to={`/tournament-game?game=${RL.replace(" ","_")}&slug=${SLUG_RL}`}><img src={rocketleague} alt="Rocket League" /></Link>
								</div>
							</div>
			      			<div className="lastblock w100">
						        <div className="logo-game">
						            <Link to={`/tournament-game?game=${COD_MODERN.replace(" ","_")}&slug=${SLUG_COD_MODERN}`}><img src={cod_vanguard} alt="Call of Duty Vanguard" /></Link>
						        </div>
						        <div className="logo-game">
						            <Link to={`/tournament-game?game=${COD_WAR_ZONE.replace(" ","_")}&slug=${SLUG_COD_WAR_ZONE}`}><img src={cod_warzone} alt="Call of Duty Warzone" /></Link>
						        </div>
						        <div className="logo-game">
						            <Link to={`/tournament-game?game=${COD_COLD_WAR.replace(" ","_")}&slug=${SLUG_COD_COLD_WAR}`}><img src={cod_coldwar} alt="Call of Duty Cold War" /></Link>
						        </div>
						        <div className="logo-game">
						            <Link to={`/tournament-game?game=${FIFA.replace(" ","_")}&slug=${SLUG_FIFA}`}><img src={fifa} alt="Call of Duty Warzone" /></Link>
						        </div>
							</div>
						</div>
		 			</div>
		  				<div className="participate league d-none">
							<div className="marg">
								<div className="part">
									{lastTournament.length > 0 ? (
											<div className="undertitle">
												<h2>
													{
														Translation(userConnectedRedux.user.language).tournament.lasttournament
													}
												</h2>
											</div>
										)
										:
										(
											<></>
										)
									}

									<div className="content">
									<div className="clear"></div>
										{
											lastTournament.length > 0 ? lastTournament.map(function(el:any,index:number) {
												return (
													el.tournament.name ? (
														<div className="apex block dark-red" key={index}>
															<div><p className="legend">{el.tournament.title}</p><i className="iconGame"><FontAwesomeIcon icon={faGamepad}/></i></div>
															<div className="info">
																<p className="price inblock"><i className="sprite cup"></i><span>{el.tournament.title}</span></p>
																<p className="date inblock"><i className="sprite calendar"></i>{userConnectedRedux.user.language === "fr" ? dateStringToDY(el.dateStart) : dateStringToDY(el.dateStart)}</p>
															</div>
														</div>
													)

													: (
														<div className="apex block light-green" key={index}>
															<div><p className="legend">{el.tournament.title}</p>{renderPlatformLogo(el.tournament.plateform.name)}</div>
															<div className="info">
																<p className="price inblock"><i className="sprite ticket"></i><span>{el.tournament.participate}</span></p>
																<p className="price inblock"><i className="sprite cup"></i><span>{el.tournament.price}</span></p>
																<p className="date inblock"><i className="sprite calendar"></i>{userConnectedRedux.user.language === "fr" ? dateStringToDY(el.dateStart) : dateStringToDY(el.dateStart)}</p>
															</div>
														</div>
													)
												)
											}) : <></>
										}
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
