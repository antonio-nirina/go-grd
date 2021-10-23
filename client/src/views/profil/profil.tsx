import React,{useEffect,useState} from "react"
import { useSelector } from "react-redux"
import {useQuery} from "@apollo/client"
import { Link } from 'react-router-dom'

import fr from "../../assets/image/fr.png"
import Js from "../../assets/image/white-joystick.png"
import AvatarDefault from "../../assets/image/game-tag.png"
import Game from "../../assets/image/game.png"
import Fifa from "../../assets/image/profil/fifa.png"
import Fortnite from "../../assets/image/profil/fortnite.png"
import Warzone from "../../assets/image/profil/warzone.png"
import Rocketleague from "../../assets/image/profil/rocketleague.png"
import Ts from "../../assets/image/icons/ts.png"
import Ws from "../../assets/image/icons/ws.png"
// import Popup from "reactjs-popup"
import { faXbox, faPlaystation, faTwitch, faYoutube, faFacebook, faTwitter} from "@fortawesome/free-brands-svg-icons"
import { faChartBar, faStar, faUsers, faHeart} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Header from "../header/header"
import Join from "../join/join"
import Footer from "../footer/footer"
import "./profil.css"
import Avatar from "./avatar"
import "../../assets/css/style.css"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import 'reactjs-popup/dist/index.css'
import {GET_PART_USER,GET_PART_USER_WAGGER} from "../../gql/participate/query"
import {LIMIT,PAGE_NUMBER} from "../commons/constante"
// import {Translation} from "../../lang/translation"
import {RootState} from "../../reducer"
import {ParticipateTournament,ParticipateWagger} from "../models/participate"
import {GameUserModel} from "../models/user"
import {dateStringToDY} from "../tools/dateConvert"
import {GET_GAME_USER} from "../../gql/user/query"

const Profile: React.FC = function() {
	const [participateTournament,setParticipateTournament] = useState<ParticipateTournament[]>([])
	const [participateWagger,setParticipateWagger] = useState<ParticipateWagger[]>([])
	const [choixGames,setChoixGames] = useState<GameUserModel[]>([])
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const {loading,error,data} 	= useQuery(GET_PART_USER, {
		variables: {
			uidUser:userConnectedRedux.user.Uid,
			limit:LIMIT,
			pageNumber:PAGE_NUMBER
		},
	})

	const {loading:ldgWagger,error:errWagger,data:dataWagger} 	= useQuery(GET_PART_USER_WAGGER, {
		variables: {
			uidUser:userConnectedRedux.user.Uid,
			limit:LIMIT,
			pageNumber:PAGE_NUMBER
		},
	})

	const {loading:ldgGame,error:errGame,data:dataGame} 	= useQuery(GET_GAME_USER, {
		variables: {
			uid:userConnectedRedux.user.Uid,
		},
	})

	useEffect(() => {
		const params = window.location.search

		if (window.opener) {
			window.opener.postMessage(params,"")
		   	window.close()
		}

		if(!loading && !error && data) {
			setParticipateTournament(data.FindPartByUser)
		}

		if(!ldgWagger && !errWagger && dataWagger) {
			setParticipateWagger(dataWagger.FindPartByUserWagger)
		}

		if(!ldgGame && !errGame && dataGame) {
			setChoixGames(dataGame.GetGameOneUserQuery)
		}

	},[loading,error,data,ldgWagger,errWagger,dataWagger,ldgGame,errGame,dataGame])

  return(
	<div className="profil connected">
      <div className="container">
	      <Header/>
	      <div className="main-content">
	      	<div className="main-pro">
	      		<div className="gamer-stats">
		      		<div className="wall-bloc" id="wall">
			      		<div className="wall" id="wall">
			      			<Avatar />
			      		</div>
			      	</div>
			      	<div className="statistique">
			      		<div className="stat-content">
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
					      				<p>L L W L<span>Score recents</span></p>
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
				      		<div className="with-stat">
			      				{choixGames.map(function(e:GameUserModel,index:number) {
									<div key={index}>
										<img src={e.Gmaes.image} alt="" height="50"/>
										<p>{e.Gmaes.name} <span><i><FontAwesomeIcon icon={faChartBar} /></i> statistiques</span></p>
									</div>
								  })}

			      			</div>
				      	</div>
				      	<div className="stat-content">
				      		<div className="teamname">
					      		<div className="bloc-team-mate">
					      			<div className="avatar-name">
					      				<div>
					      					<img src={AvatarDefault} alt="" className="avatar-lead"/>
					      				</div>
					      				<div>
					      					<span>nomdeteam</span>
					      				</div>
					      			</div>
					      			<div className="setting-accounts">
						      			<div>
						      				<img src={Js} alt="" width="20" height="15"/>
						      			</div>
						      			<div>
						      				<img src={fr} alt="" width="20" height="20"/>
						      			</div>
						      		</div>
					      			<div className="team-number">
					      				<span>25 <i><FontAwesomeIcon icon={faUsers} /></i></span>
					      			</div>
					      		</div>
					      		<div className="media">
							      	<div className="social">
					      				<Link to="#"><i><FontAwesomeIcon icon={faTwitch} /></i></Link>
					      				<Link to="#"><i><FontAwesomeIcon icon={faYoutube} /></i></Link>
					      				<Link to="#"><i><FontAwesomeIcon icon={faFacebook} /></i></Link>
					      				<Link to="#"><i><FontAwesomeIcon icon={faTwitter} /></i></Link>
					      				<Link to="#"><i><FontAwesomeIcon icon={faXbox} /></i></Link>
					      				<Link to="#"><i><FontAwesomeIcon icon={faPlaystation} /></i></Link>
							      	</div>
	    						</div>
				      		</div>
				      	</div>

			      	</div>
			      	<div className="part">
						<div className="undertitle">
							<h2>Tournois</h2>
							<p>Derniers résultats en tournois de {userConnectedRedux.user.username}</p>
						</div>
						{participateTournament.length > 0 ?
							<div className="content waggers-link">
								<div className="fixed">
									<span>Nom</span>
									<span>Place</span>
									<span>Cashprize</span>
									<span>Format</span>
									<span>Nombre de Joueurs</span>
									<span>Date</span>
								</div>
								<div className="row-container">
									{
										participateTournament.map(function(el:ParticipateTournament,index:number){
											return (
												<div className="row" key={index}>
													<span>{el.tournament.title}</span>
													<span> {el.isWin ? "1rd" : "2rd"} </span>
													<span>{el.tournament.price+" €"}</span>
													<span>{el.tournament.isTeam ? `${el.tournament.numberTeam}V${el.tournament.numberTeam}`: "1V1"}</span>
													<span>{el.tournament.numberParticipate}</span>
													<span>{dateStringToDY(el.tournament.date)}</span>
												</div>
											)
										})
									}

								</div>

							</div>
							:
							<></>
						}
					</div>
					<div className="part">
						<div className="undertitle">
							<h2>Wagers</h2>
							<p>Derniers résultats de {userConnectedRedux.user.username}</p>
						</div>
						{participateWagger.length > 0 ?
							<div className="content waggers-link">
								<div className="fixed">
									<span>Nom</span>
									<span>Place</span>
									<span>Cashprize</span>
									<span>Format</span>
									<span>Nombre de Joueurs</span>
									<span>Date</span>
								</div>
								<div className="row-container">
									{
										participateWagger.map(function(el:ParticipateWagger,index:number){
											return (
												<div className="row" key={index}>
													<span>{el.wagger.title}</span>
													<span> {el.isWin ? "1rd" : "2rd"} </span>
													<span>{el.wagger.price+" €"}</span>
													<span>{el.wagger.format}</span>
													<span>{el.wagger.participant}</span>
													<span>{dateStringToDY(el.wagger.date)}</span>
												</div>
											)
										})
									}

								</div>

							</div>
							:
							<></>
						}
					</div>
					<div className="part mur">
						<div className="undertitle">
							<h2>Mur</h2>
							<p>Toutes les dernières actualités de {userConnectedRedux.user.username}</p>
						</div>
						<div className="content waggers-link">
							<div className="fixed">
								<span>Succès</span>
								<span className="center">Commentaires</span>
								<span className="aright">1-4 &gt;</span>
							</div>
							<div className="row-container">
								<div className="row">
									<div className="note">
										<img src={AvatarDefault} alt="" width="45"/>
										<p>
											<span>Défi</span>
											TonioPlancha a réussi l0 top 1 sur Apex...
										</p>
										<div className="icon">
											<span><i><FontAwesomeIcon icon={faStar} /></i></span>
										</div>
									</div>
									<div className="note">
										<img src={AvatarDefault} alt="" width="45"/>
										<p>
											<span>Défi</span>
											TonioPlancha a réussi l0 top 1 sur Apex...
										</p>
										<div className="icon">
											<span><i><FontAwesomeIcon icon={faStar} /></i></span>
										</div>
									</div>
									<div className="note">
										<img src={AvatarDefault} alt="" width="45"/>
										<p>
											<span>Tournoi</span>
											TonioPlancha a réussi l0 top 1 sur Apex...
										</p>
										<div className="icon">
											<span><img src={Ts} alt="" width="27"/></span>
										</div>
									</div>
									<div className="note">
										<img src={AvatarDefault} alt="" width="45"/>
										<p>
											<span>Wagers</span>
											TonioPlancha a réussi l0 top 1 sur Apex...
										</p>
										<div className="icon">
											<span><img src={Ws} alt="" width="27"/></span>
										</div>
									</div>
									<div className="note">
										<img src={AvatarDefault} alt="" width="45"/>
										<p>
											<span>Défi</span>
											TonioPlancha a réussi l0 top 1 sur Apex...
										</p>
										<div className="icon">
											<span><i><FontAwesomeIcon icon={faHeart} /></i></span>
										</div>
									</div>
								</div>

								<div className="comment-container">
									<div className="comments">
										<img src={AvatarDefault} alt="" width="50"/>
										<p>
											<span>{userConnectedRedux.user.username}</span>
											<input type="text" placeholder="Ajouter un commentaire..." />
										</p>
									</div>
									<div className="comments">
										<img src={AvatarDefault} alt="" width="50"/>
										<p>
											<span>CAPELAJR <i>21 Juillet à 3:54 PM</i></span>
											+ rep Funny Booooooy
										</p>
									</div>
									<div className="comments">
										<img src={AvatarDefault} alt="" width="50"/>
										<p>
											<span>CAPELAJR <i>21 Juillet à 3:54 PM</i></span>
											+ rep Funny Booooooy
										</p>
									</div>
									<div className="comments">
										<img src={AvatarDefault} alt="" width="50"/>
										<p>
											<span>CAPELAJR <i>21 Juillet à 3:54 PM</i></span>
											+ rep Funny Booooooy
										</p>
									</div>
									<div className="comments">
										<img src={AvatarDefault} alt="" width="50"/>
										<p>
											<span>CAPELAJR <i>21 Juillet à 3:54 PM</i></span>
											+ rep Funny Booooooy
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
			    </div>
	      	</div>
	      </div>
	      <Join/>
	      <Footer/>
	  </div>
    </div>
  )
}

export default Profile;
