import React,{useMemo,useState} from "react"
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux"
import {useQuery} from "@apollo/client"
import parse from 'html-react-parser'
import { faEye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import warz from "../../assets/image/warz.jpg"
import championship from "../../assets/image/championship.jpeg"
import fortnite1 from "../../assets/image/fortnite.jpg"

import Header from "../header/header"
import {RootState} from "../../reducer"

import Footer from "../footer/footer"
import Streamer1 from "../../assets/image/streamer1.jpg"
import "./communaute.css"
// import {COUNT_SUBSCRIBE} from "../../gql/user/subscription"
import {GET_ALL_STREAMING} from "../../gql/user/query"
import {GET_ALL_CMTY} from "../../gql/cmty/query"
import Friend from "./friends"
import {LIMIT,PAGE_NUMBER} from "../commons/constante"


const Communaute: React.FC = function() {
	const userConnectedRedux 	= useSelector((state:RootState) => state.userConnected)
	// const {loading,error,data}  = useSubscription(COUNT_SUBSCRIBE)
	const [cmty,setCmty] 			= useState<Array<any>>([])
	const {loading,error,data} 		= useQuery(GET_ALL_CMTY, {
		variables: {
			limit: LIMIT,
			pageNumber:PAGE_NUMBER
		},
	})

	const {loading:loadingTwitch,error:errorTwitch,data:dataTwitch} = useQuery(GET_ALL_STREAMING, {
		variables: {
			limit: userConnectedRedux.user.uid
		},
	})

	useMemo(() => {
		if(!loadingTwitch && !errorTwitch && dataTwitch) console.log("dataTwitch", dataTwitch)
		if(!loading && !error && data) setCmty(data.FindAllCmty)
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
	  				{
	  					cmty.length > 0 ? cmty.map(function(e:any,index:number) {
	  						return (
	  							<div className="center-block" key={index}>
				  					<div className="bloc-actus">
				  						<div className="actus-name">
				  							<img src={e.user.avatar} alt=""/>
				  							<p>{e.user.username} <span>{`@${e.user.username}`}</span></p>

				  						</div>
				  						<div className="actus-content">
				  							{parse(e.content)}
				  						</div>
				  					</div>
				  				</div>
  							)
	  					})
	  					:
	  					<></>
	  				}

	  				<Friend />
	  			</div>
	  		</div>	  		
			<Footer/>
	  	</div>
	</div>
  )
}

export default Communaute
