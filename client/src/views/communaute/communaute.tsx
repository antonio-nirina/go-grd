import React,{useMemo} from "react"
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux"
import {useQuery} from "@apollo/client"
import { faEye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import warz from "../../assets/image/warz.jpg"
import championship from "../../assets/image/championship.jpeg"
import fortnite1 from "../../assets/image/fortnite.jpg"
import  gogrind from "../../assets/image/gogrind-joystick.png"
import  updateInfo from "../../assets/image/info-update.png"
import  gotaga from "../../assets/image/gotaga.png"
import  gotagatv from "../../assets/image/video-gotaga.png"
import  skouinar from "../../assets/image/skouinar.png"
import  play from "../../assets/image/play-your-game.png"

import Header from "../header/header"
import {RootState} from "../../reducer"

import Footer from "../footer/footer"
import Streamer1 from "../../assets/image/streamer1.jpg"
import "./communaute.css"
// import {COUNT_SUBSCRIBE} from "../../gql/user/subscription"
import {GET_ALL_STREAMING} from "../../gql/user/query"
import {GET_ALL_CMTY} from "../../gql/cmty/query"
import Friend from "./friends"


const Communaute: React.FC = function() {
	const userConnectedRedux 	= useSelector((state:RootState) => state.userConnected)
	// const {loading,error,data}  = useSubscription(COUNT_SUBSCRIBE)
	const {loading,error,data} 		= useQuery(GET_ALL_CMTY, {
		variables: {
			email: userConnectedRedux.user.email
		},
	})

	const {loading:loadingTwitch,error:errorTwitch,data:dataTwitch} = useQuery(GET_ALL_STREAMING, {
		variables: {
			idUser: userConnectedRedux.user.uid
		},
	})

	useMemo(() => {
		if(!loadingTwitch && !errorTwitch && dataTwitch) console.log("dataTwitch", dataTwitch)
		if(!loading && !error && data) console.log("data", data)
	},[loadingTwitch,errorTwitch,dataTwitch,loading,error,data])

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
	  					<div className="bloc-actus">
	  						<div className="actus-name">
	  							<img src={gogrind} alt=""/>
	  							<p>GoGrind <span>@GoGrindOff</span></p>
	  								  						
	  						</div>
	  						<div className="actus-content">
	  							<p>
		  							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dapibus odio et lorem
									pretium ullamcorper. Interdum et malesuada fames ac ante ipsum primis in faucibus.
									Suspendisse eleifend eros sed sem laoreet, eu aliquet arcu malesuada.
								</p>
	  						</div>
	  						<div className="img-actus">
	  							<img src={updateInfo} alt="" />
	  						</div>
	  					</div>
	  					<div className="bloc-actus">
	  						<div className="actus-name">
	  							<img src={gotaga} alt=""/>
	  							<p>GotagaTV <span>@GotagaTV</span></p>
	  								  						
	  						</div>
	  						<div className="actus-content">
	  							<p>
		  							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dapibus odio et lorem
									pretium ullamcorper. Interdum et malesuada fames ac ante ipsum primis in faucibus.
									Suspendisse eleifend eros sed sem laoreet, eu aliquet arcu malesuada.
								</p>
	  						</div>
	  						<div className="img-actus">
	  							<img src={gotagatv} alt="" />
	  						</div>
	  					</div>
	  					<div className="bloc-actus">
	  						<div className="actus-name">
	  							<img src={skouinar} alt=""/>
	  							<p>Skouinar <span>@Skouinar</span></p>
	  								  						
	  						</div>
	  						<div className="actus-content">
	  							<p>Il nous manque un last pour Warzone en Quad !</p>
	  							<p>Des gens dispo ?</p>
								<p>DM open</p>
	  						</div>	  						
	  					</div>
	  					<div className="bloc-actus">
	  						<div className="actus-name">
	  							<img src={gogrind} alt=""/>
	  							<p>GoGrind <span>@GoGrindOff</span></p>
	  								  						
	  						</div>
	  						<div className="actus-content">
	  							<p>
		  							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dapibus odio et lorem
									pretium ullamcorper. Interdum et malesuada fames ac ante ipsum primis in faucibus.
									Suspendisse eleifend eros sed sem laoreet, eu aliquet arcu malesuada.
								</p>
	  						</div>
	  						<div className="img-actus">
	  							<img src={play} alt="" />
	  						</div>
	  					</div>
	  				</div>
	  				<Friend />
	  			</div>
	  		</div>	  		
			<Footer/>
	  	</div>
	</div>
  )
}

export default Communaute
