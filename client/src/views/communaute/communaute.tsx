import React,{useMemo} from "react"
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux"
import {useSubscription} from "@apollo/client"

import { faPlus, faCommentDots, faEye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Translation} from "../../lang/translation"
import warzone from "../../assets/image/warzone-.png"
import warzoneLogo from "../../assets/image/warzone.png"
import warz from "../../assets/image/warz.jpg"
import championship from "../../assets/image/championship.jpeg"
import fortnite1 from "../../assets/image/fortnite.jpg"
import rocketleague from "../../assets/image/rocketleague.png"
import fortnite from "../../assets/image/fortnite.png"
import rlchampionsip from "../../assets/image/rlchampionsip.png"
import thumbnail from "../../assets/image/video.png"

import Header from "../header/header"
import {RootState} from "../../reducer"
import Footer from "../footer/footer"
import AvatarDefault from "../../assets/image/game-tag.png"
import Streamer1 from "../../assets/image/streamer1.jpg"
import "./communaute.css"
import {COUNT_SUBSCRIBE} from "../../gql/user/subscription"


const Communaute: React.FC = function() {
	const userConnectedRedux 	= useSelector((state:RootState) => state.userConnected)
	const {loading,error,data}  = useSubscription(COUNT_SUBSCRIBE)
	useMemo(() => {
		if(!loading && !error && data) console.log("data", data)
	},[loading,error,data])
  return(
	<div className="communaute">
	    <div className="container">
	  		<Header/>	  	
	  		<div className="main">
	  			<div className="auto">	  				
	  				<div className="aside-left">
	  					<div className="game-select">
	  						<Link to="#">
			  					<div className="game-bg wz">
			  						<p>Warzone</p>
			  						<div className="seek">
			  							<img src={warz} className="imgresp"/>
			  						</div>
			  					</div>
			  				</Link>
			  				<Link to="#">
			  					<div className="game-bg rl">
			  						<p>Rocket League</p>
			  						<div className="seek">
			  							<img src={championship} className="imgresp"/>
			  						</div>
			  					</div>
		  					</Link>
		  					<Link to ="#">
			  					<div className="game-bg ft">
			  						<p>Fortnite</p>
			  						<div className="seek">
			  							<img src={fortnite1} className="imgresp"/>
			  						</div>
			  					</div>
			  				</Link>
		  				</div>
		  				<div className="stream">
		  					<Link to="#">
			  					<div className="stream-container">
				  					<div className="streaming">
				  						<img src={Streamer1} alt=""/>
				  					</div>
				  					<div className="stream-info">
				  						<p className="streamer">Gotaga</p>
				  						<p className="streamgame">Apex Legends <span className="stream-type">Arena</span></p>
				  						<p className="view">12093<i><i><FontAwesomeIcon icon={faEye} size="xs"/></i></i></p>
				  					</div>
				  				</div>
			  				</Link>
			  				<Link to="#">
				  				<div className="stream-container">
				  					<div className="streaming">
				  						<img src={Streamer1} alt=""/>
				  					</div>
				  					<div className="stream-info">
				  						<p className="streamer">Gotaga</p>
				  						<p className="streamgame">Apex Legends <span className="stream-type">Arena</span></p>
				  						<p className="view">12093<i><i><FontAwesomeIcon icon={faEye} size="xs"/></i></i></p>
				  					</div>
				  				</div>
				  			</Link>
		  				</div>
	  				</div>	  				
	  				<div className="center-block">
	  					<h2>Fil d'actualité</h2>
	  					<div className="actuality">	  						
							<h3>
							{
								Object.keys(userConnectedRedux.user).length > 0 ?
								Translation(userConnectedRedux.user.language).participHome.actuality
								:
								Translation("fr").participHome.actuality
							}
							</h3>
							<div className="artContent">
								<Link to="/">
									<div className="article">
										<img src={warzone} alt="" />
										<div className="text">
											<p className="date-art">4 Juin 2021</p>
											<p className="title">Warzone Patch 1.15.x</p>
											<p>
											{
												Object.keys(userConnectedRedux.user).length > 0 ?
												Translation(userConnectedRedux.user.language).participHome.retrieve
												:
												Translation("fr").participHome.retrieve
											}
											</p>
							                <div className="readmore">
												{
													Object.keys(userConnectedRedux.user).length > 0 ?
													Translation(userConnectedRedux.user.language).participHome.see
													:
													Translation("fr").participHome.see
												}
											</div>
										</div>
		             				</div>
		             			</Link>
           					</div>           				
	           				<Link to="/">
		            			<div className="article">
		          					<img src={rlchampionsip} alt="" />
		          					<div className="text">
		          						<p className="date-art">5 Juin 2021</p>
		           						<p className="title">Résultats RLCS</p>
		            					<p>
										{
											Object.keys(userConnectedRedux.user).length > 0 ?
											Translation(userConnectedRedux.user.language).participHome.follow
											:
											Translation("fr").participHome.follow
										}
										</p>
						                <div className="readmore">
											{
												Object.keys(userConnectedRedux.user).length > 0 ?
												Translation(userConnectedRedux.user.language).participHome.see
												:
												Translation("fr").participHome.see
											}
										</div>
		          					</div>
		            			</div>         				
	         				</Link>
         				</div>         				        			
	  				</div>
	  				<div className="aside-right">
	  					<div className="friend-list">
	  						<p>
	  							<img src={AvatarDefault} className="friend-avatar"/>	  						
	  							<span>NomAmi<i className="u-connected"></i></span>
	  							<i><FontAwesomeIcon icon={faCommentDots} size="xs"/></i>
	  							<i className="rect"><FontAwesomeIcon icon={faPlus} size="xs"/></i>
	  						</p>
	  					</div>
	  					<div className="friend-list">
	  						<p>
	  							<img src={AvatarDefault} className="friend-avatar"/>	  						
	  							<span>NomAmi<i className="u-disconnected"></i></span>
	  							<i><FontAwesomeIcon icon={faCommentDots} size="xs"/></i>
	  							<i className="rect"><FontAwesomeIcon icon={faPlus} size="xs"/></i>
	  						</p>
	  					</div>
	  					<div className="friend-list noborder">
	  						<p>
	  							<img src={AvatarDefault} className="friend-avatar"/>	  						
	  							<span>NomAmi<i className="u-connected"></i></span>
	  							<i><FontAwesomeIcon icon={faCommentDots} size="xs"/></i>
	  							<i className="rect"><FontAwesomeIcon icon={faPlus} size="xs"/></i>
	  						</p>
	  					</div>
	  					<div className="forum-container">
		  					<div className="subjectforum">
		  						<p>Sujet Forum <i><FontAwesomeIcon icon={faCommentDots} size="xs"/></i></p>
		  					</div>
		  					<div className="subjectforum">
		  						<p>Sujet Forum <i><FontAwesomeIcon icon={faCommentDots} size="xs"/></i></p>
		  					</div>
		  					<div className="subjectforum">
		  						<p>Sujet Forum <i><FontAwesomeIcon icon={faCommentDots} size="xs"/></i></p>
		  					</div>
		  				</div>
	  				</div>
	  			</div>
	  		</div>			
			<Footer/>
	  	</div>
	</div>
  )
}

export default Communaute
