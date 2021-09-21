import React,{useEffect,useState} from "react"
import { Link } from "react-router-dom"
import { faXbox } from "@fortawesome/free-brands-svg-icons"
import {  faTrophy } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {useQuery} from "@apollo/client"
import { useSelector } from "react-redux"
import Header from "../header/header"
import Footer from "../footer/footer"
import {Translation} from "../../lang/translation"
//import {Translation} from "../../lang/translation"
//import {RootState} from "../../reducer"
import "../../assets/css/style.css"
import "../annexe/tournois.css"
import "../participate/participate.css"
import {dateStringToDY} from "../tools/dateConvert"

import apexlegends from "../../assets/image/apex-legends.png"
import fortnite from "../../assets/image/fortnite.png"
import rainboxsix from "../../assets/image/rainbowsix.png"
import rocketleague from "../../assets/image/rocketleague.png"
import vanguard from "../../assets/image/cod-vanguard.png"
import cod_warzone from "../../assets/image/warzone.png"
import cod_coldwar from "../../assets/image/cod-coldwar.png"
import fifa from "../../assets/image/fifa21.png"
import {APEX_LEGENDE,FORTNITE,RNB,RL,COD_MODERN,COD_WAR_ZONE,COD_COLD_WAR,FIFA} from "../game/constante"

import {GET_ALL_WAGER} from "../../gql/wagger/query"
import {Wagger} from "../models/wagger"
import {LIMIT,PAGE_NUMBER} from "../commons/constante"
import {GET_PART_USER} from "../../gql/participate/query"
import {RootState} from "../../reducer"

const Waggers: React.FC = function() {
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const [waggers, setWaggers] = useState<Array<Wagger>>([])
	const [lastWagger, setLastWagger] = useState<Array<any>>([])
	const [countWagger,setCountWagger] = useState<number>(0)
	const {loading,error,data} 	= useQuery(GET_ALL_WAGER, {
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
		let countWagger:number = 0
		if(!loading && !error && data) {
			setWaggers(data.FindAllWagger)
		}

		if(!ldPart && !errPart && dataPart) {
			if(dataPart && dataPart.FindPartByUser.length > 0) {
				dataPart.FindPartByUser.forEach(function(e:any) {
					countWagger++
					if(e.wagger) setCountWagger(countWagger)
				})
				setLastWagger(dataPart.FindPartByUser)
			}
		}

	},[loading,error,data,ldPart,errPart,dataPart])

  return(
  	<div className="container">
  		<Header />
  		<div className="participate league waggers">
			<div className="marg">
				<div className="part">
					{waggers.map(function(el:Wagger,index:number){
						return(
							<div className="upcomming side" key={index}>
								<div className="items">
								<div className="side-img" style={{ background: `url(${el.game.image})`}}></div>
								<div className="side-infos">
									<div className="meta">
										<table>
											<thead>
												<tr>
													<td>Format</td>
													<td>Console</td>
													<td>Participation</td>
													<td>Prix à gagner</td>												
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>{el.format}</td>
													<td>{el.plateform.name}</td>
													<td>{`${el.priceParticipate} €`}</td>
													<td>{`${el.price} €`}</td>
												</tr>
											</tbody>
										</table>
									</div>
									<div className="name-section">
										<p>Waggers</p>
									</div>
									<div className="name-section">
										<p>
											<span>{el.game.name}</span>
											<span className="platform-logo">{el.plateform.name}</span>
										</p>
									</div>
									<div className="prize-section">
										<div className="prize-warp">
											<i className="awesome"><FontAwesomeIcon icon={faTrophy}/></i>												
											prix
										</div>
										<div className="prize" style={{"fontWeight":"bold"}}>
											{`${el.price} €`}
										</div>
									</div>
								</div>
								<div className="btn-full">
									<Link to={`/joingame?uid=${el.uid}`} className="signup-btn bg-red">Inscrivez-vous</Link>
								</div>
								</div>
							</div>	
						)
					})}

					{lastWagger.length > 0 && countWagger > 0 ? (
							<div className="undertitle">
							<h2>Wagers</h2>
								<h2>
									{
										Translation(userConnectedRedux.user.language).wagger.lastwagger
									}
								</h2>
							</div>
						)
						:
						(
							<></>
						)
					}
					<div className="content waggers-link">
							<div className="clear"></div>
							{
								lastWagger.length > 0 && countWagger > 0 ? lastWagger.map(function(el:any,index:number) {
									return (
										el.isWin  ? (
											<Link to ={el?.wagger.uid} key={index}>
												<div className="apex block dark-green">
													<div>
														<p className="legend">{el.wagger.title}</p><i className="iconGame"><FontAwesomeIcon icon={faXbox}/></i>
													</div>
													<div className="info">
														<p className="price inblock"><i className="sprite cup"></i><span>{`Cash Prize ${el.wagger.title} €`} </span></p>
														<p className="date inblock"><i className="sprite calendar"></i><span>{userConnectedRedux.user.language === "fr" ? dateStringToDY(el.date) : dateStringToDY(el.date)}</span></p>
													</div>
												</div>
											</Link>
										) : (
											<Link to ={el?.wagger.uid} key={index}>
												<div className="apex block dark-red">
													<div>
														<p className="legend">{el.wagger.title}</p><i className="iconGame"><FontAwesomeIcon icon={faXbox}/></i>
													</div>
													<div className="info">
														<p className="price inblock"><i className="sprite cup"></i><span>{`Cash Prize ${el.wagger.title} €`} </span></p>
														<p className="date inblock"><i className="sprite calendar"></i><span>{userConnectedRedux.user.language === "fr" ? dateStringToDY(el.date) : dateStringToDY(el.date)}</span></p>
													</div>
												</div>
											</Link>
										)
									)
								})
								: <></>
							}
						</div>
					</div>
				</div>
			</div>
			<div className="choices">
				<div className="jeux">
				    <h2>
						Choisis ton jeu
					</h2>
					<div className="bg-game">
					<div className="firstblock w100">
						<div className="logo-game">
						    <Link to={`/waggers-game?game=${APEX_LEGENDE.replace(" ","_")}`}><img src={apexlegends} alt="Apex Legends" /></Link>
						</div>
						<div className="logo-game">
						    <Link to={`/waggers-game?game=${FORTNITE.replace(" ","_")}`} ><img src={fortnite} alt="Fortnite" /></Link>
						</div>
						<div className="logo-game">
						    <Link to={`/waggers-game?game=${RNB.replace(" ","_")}`} ><img src={rainboxsix} alt="RainbowSIx Siege" /></Link>
						</div>
						<div className="logo-game">
						    <Link to={`/waggers-game?game=${RL.replace(" ","_")}`} ><img src={rocketleague} alt="Rocket League" /></Link>
						</div>
					</div>
	      			<div className="lastblock w100">
				        <div className="logo-game">
				            <Link to={`/waggers-game?game=${COD_MODERN.replace(" ","_")}`} ><img src={vanguard} alt="Call of Duty Vanguard" /></Link>
				        </div>
				        <div className="logo-game">
				            <Link to={`/waggers-game?game=${COD_WAR_ZONE.replace(" ","_")}`} ><img src={cod_warzone} alt="Call of Duty Warzone" /></Link>
				        </div>
				        <div className="logo-game">
				            <Link to={`/waggers-game?game=${COD_COLD_WAR.replace(" ","_")}`} ><img src={cod_coldwar} alt="Call of Duty Cold War" /></Link>
				        </div>
				        <div className="logo-game">
				            <Link to={`/waggers-game?game=${FIFA.replace(" ","_")}`} ><img src={fifa} alt="Call of Duty Warzone" /></Link>
				        </div>
					</div>
				</div>
	 		</div>
		</div>
		<Footer/>
  	</div>
  )
}

export default Waggers
