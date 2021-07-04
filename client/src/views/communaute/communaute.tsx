import React,{useMemo} from "react"
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux"
import {useQuery} from "@apollo/client"

import { faEye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Translation} from "../../lang/translation"
import warzone from "../../assets/image/warzone-.png"
import warz from "../../assets/image/warz.jpg"
import championship from "../../assets/image/championship.jpeg"
import fortnite1 from "../../assets/image/fortnite.jpg"
import rlchampionsip from "../../assets/image/rlchampionsip.png"

import Header from "../header/header"
import {RootState} from "../../reducer"

import Tchat from "../tchat/tchat"
import Footer from "../footer/footer"
import Streamer1 from "../../assets/image/streamer1.jpg"
import "./communaute.css"
// import {COUNT_SUBSCRIBE} from "../../gql/user/subscription"
import {GET_ALL_STREAMING} from "../../gql/user/query"
import Friend from "./friends"

const Communaute: React.FC = function() {
	const userConnectedRedux 	= useSelector((state:RootState) => state.userConnected)
	// const {loading,error,data}  = useSubscription(COUNT_SUBSCRIBE)

	const {loading:loadingTwitch,error:errorTwitch,data:dataTwitch} = useQuery(GET_ALL_STREAMING, {
		variables: {
			idUser: userConnectedRedux.user.uid
		},
	})

	useMemo(() => {
		if(!loadingTwitch && !errorTwitch && dataTwitch) console.log("data", dataTwitch)
	},[loadingTwitch,errorTwitch,dataTwitch])

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
			  							<img src={warz} className="imgresp" alt=""/>
			  						</div>
			  					</div>
			  				</Link>
			  				<Link to="#">
			  					<div className="game-bg rl">
			  						<p>Rocket League</p>
			  						<div className="seek">
			  							<img src={championship} className="imgresp" alt=""/>
			  						</div>
			  					</div>
		  					</Link>
		  					<Link to ="#">
			  					<div className="game-bg ft">
			  						<p>Fortnite</p>
			  						<div className="seek">
			  							<img src={fortnite1} className="imgresp" alt="" />
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
	  				<Friend />
	  			</div>
	  		</div>
	  		<Tchat/>
			<Footer/>
	  	</div>
	</div>
  )
}

export default Communaute
