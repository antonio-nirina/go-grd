import React from "react"
import { useSelector } from "react-redux"
import { faPlus, faCommentDots, faEye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Translation} from "../../lang/translation"
import warzone from "../../assets/image/warzone-.png"
import rlchampionsip from "../../assets/image/rlchampionsip.png"
import thumbnail from "../../assets/image/video.png"

import Header from "../header/header"
import {RootState} from "../../reducer"
import Footer from "../footer/footer"
import AvatarDefault from "../../assets/image/game-tag.png"
import Streamer1 from "../../assets/image/streamer1.jpg"
import "./communaute.css"


const Communaute: React.FC = function() {
	const userConnectedRedux 	= useSelector((state:RootState) => state.userConnected)
  return(
	<div className="communaute">
	    <div className="container">
	  		<Header/>	  	
	  		<div className="main">
	  			<div className="auto">	  				
	  				<div className="aside-left">
	  					<div className="game-select">
		  					<div className="game-bg bg-cod">
		  						<p className="game-title">COD : Warzone</p>
		  					</div>
		  					<div className="game-bg bg-rl">
		  						<p className="game-title">rocket league</p>
		  					</div>
		  					<div className="game-bg bg-ft">
		  						<p className="game-title">fortnite</p>
		  					</div>
		  				</div>
		  				<div className="stream">
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
            <div className="article">
              <img src={warzone} alt="" />
              <div className="text">
                <p className="title">Warzone Patch 1.15.x</p>
                <p>
				{
					Object.keys(userConnectedRedux.user).length > 0 ?
					Translation(userConnectedRedux.user.language).participHome.retrieve
					:
					Translation("fr").participHome.retrieve
				}
				</p>
                <a href="#">
					{
						Object.keys(userConnectedRedux.user).length > 0 ?
						Translation(userConnectedRedux.user.language).participHome.see
						:
						Translation("fr").participHome.see
					}
				</a>
              </div>
            </div>
            <div className="article">
              <img src={rlchampionsip} alt="" />
              <div className="text">
                <p className="title">Résultats RLCS</p>
                <p>
				{
					Object.keys(userConnectedRedux.user).length > 0 ?
					Translation(userConnectedRedux.user.language).participHome.follow
					:
					Translation("fr").participHome.follow
				}
				</p>
                <a href="#">
					{
						Object.keys(userConnectedRedux.user).length > 0 ?
						Translation(userConnectedRedux.user.language).participHome.see
						:
						Translation("fr").participHome.see
					}
				</a>
              </div>
            </div>
          </div>
        </div>
	  				</div>
	  				<div className="aside-right">
	  					<div className="friend-list">
	  						<p>
	  							<img src={AvatarDefault} className="friend-avatar"/>	  						
	  							<span>NomAmi</span>
	  							<i><FontAwesomeIcon icon={faCommentDots} size="xs"/></i>
	  							<i className="rect"><FontAwesomeIcon icon={faPlus} size="xs"/></i>
	  						</p>
	  					</div>
	  					<div className="friend-list">
	  						<p>
	  							<img src={AvatarDefault} className="friend-avatar"/>	  						
	  							<span>NomAmi</span>
	  							<i><FontAwesomeIcon icon={faCommentDots} size="xs"/></i>
	  							<i className="rect"><FontAwesomeIcon icon={faPlus} size="xs"/></i>
	  						</p>
	  					</div>
	  					<div className="friend-list noborder">
	  						<p>
	  							<img src={AvatarDefault} className="friend-avatar"/>	  						
	  							<span>NomAmi</span>
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
