import React,{useState,useEffect} from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import {useQuery} from "@apollo/client"
import { faEye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from "react-loader-spinner"


import Header from "../header/header"
import {RootState} from "../../reducer"
import Footer from "../footer/footer"
import "./communaute.css"
import "./post.css"
// import {COUNT_SUBSCRIBE} from "../../gql/user/subscription"
import {GET_ALL_STREAMING} from "../../gql/cmty/query"
import Friend from "./friends"
import Post from "./post"
import Chat from "./chat"
import Warz from "../../assets/image/profil/warzone.png"
import Fortnite from "../../assets/image/profil/fortnite.png"
import TchatIcon from "../../assets/image/picto/tchat-icon.png"
import {NameRoutes} from "../commons/route-list"
import {GameType} from "../models/game"


type Stremings = {
    id:string
	userName:string
	thumbnailUrl:string
	title:string
	viewerCount:number
	StartedAt:string
	gameName:string
}

const Communaute: React.FC = function() {
	const userConnectedRedux 			= useSelector((state:RootState) => state.userConnected)
	const [cmty, setCmty] 				= useState<Stremings[]>([])
	const [isLoader, setIsLoader] 		= useState<boolean>(true)
	const [showClose, setShowClose] 	= useState(false)
	// const [gameTwitch,setGameTwitch] 	= useState<GameType>()
	// const {loading,error,data}  = useSubscription(COUNT_SUBSCRIBE)

	const {loading,error,data} = useQuery(GET_ALL_STREAMING, {
		variables: {
			gameName: userConnectedRedux.user.games && userConnectedRedux.user.games.length > 0 ? userConnectedRedux.user.games[0] : "Warzone",
			accessToken:"",
			refreshToken:""
		},
	})

	const onShowClose = function(){
		setShowClose(!showClose)
	}

	useEffect(() => {
		if(!loading && !error && data) {
			setIsLoader(false)
			let newData:Stremings[] = []
			data.FindAllStreaming.forEach((element:Stremings) => {
				let url = element.thumbnailUrl.replace(/{width}/,"500").replace(/{height}/,"500")
				newData.push({
					id:element.id,
					userName:element.userName,
					thumbnailUrl:url,
					title:element.title,
					viewerCount:element.viewerCount,
					StartedAt:element.StartedAt,
					gameName:element.gameName

				})
			})
			setCmty(newData)
		}
	},[loading,error,data,isLoader])

  return(
	<div className="communaute">
	    <div className="container">
	  		<Header />
	  		<div className="main">
	  			<div className="auto">
	  				<div className="aside-left">
	  					<div className="game-select">
							{userConnectedRedux.user.games && userConnectedRedux.user.games.length > 0
								?
									userConnectedRedux.user.games.map(function(game:GameType,index:number){
										return (
											<Link to={NameRoutes.mygames} key={index}>
												<div className="game-bg rl">
													<p>Rocket League</p>
													<div className="seek">
														<img src={game.image} className="imgresp" alt=""/>
													</div>
												</div>
											</Link>
										)
									})
								:
								<>
									<Link to={NameRoutes.mygames}>
										<div className="game-bg wz">
											<p>COD : Warzone</p>
											<div className="seek">
												<img src={Warz} className="imgresp" alt=""/>
											</div>
										</div>
			  						</Link>
									<Link to={NameRoutes.mygames}>
										<div className="game-bg ft">
											<p>Fortnite</p>
											<div className="seek">
												<img src={Fortnite} className="imgresp" alt="" />
											</div>
										</div>
									</Link>
								</>
							}

		  				</div>
		  				<div className="stream">
							  	<div className="tools-stream">
									<button  className="btn">Toutes</button>
								  	<div>
								  		<input type="text" placeholder="search" />
								  	</div>
							  	</div>
						  	{cmty.map(function(e:Stremings,index:number){
								return(
									<span key={index} style={{cursor:"pointer"}}>
										<div className="stream-container">
											<div className="streaming">
											<img src={e.thumbnailUrl} style={{"width":"100%"}} alt={e.gameName} />
											</div>
											<div className="stream-info">
												<p className="streamer">{e.title}</p>
												<p className="streamer">{e.userName}</p>
												<p className="streamgame">{e.gameName}</p>
												<p className="view">{e.viewerCount}<i><i><FontAwesomeIcon icon={faEye} size="xs"/></i></i></p>
											</div>
										</div>
									</span>
								)
							})}
		  				</div>
	  				</div>
	  				<div className="center-block">
	  					<Post />
						  <div className={isLoader ? "loader-spinner":"d-none"}>
							<Loader
								type="Oval"
								color="#dd0000"
							/>
						</div>
	  				</div>
	  				<Friend />
	  			</div>
	  			<div className="icon-msg" onClick={onShowClose}>
	  				<img src={TchatIcon} alt=""/>
	  				<span className="counter">2</span>
	  			</div>
				<div className={!showClose ? "d-none": "tchat"} >
              		<Chat />
            	</div>
	  		</div>
			<Footer/>
	  	</div>
	</div>
  )
}

export default Communaute
