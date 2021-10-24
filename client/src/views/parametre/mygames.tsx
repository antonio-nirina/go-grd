import React,{useState,useEffect} from "react"

import { useSelector } from "react-redux"
import {useQuery} from "@apollo/client"
import Header from "../header/header"
import Footer from "../footer/footer"
import "../parametre/parametre.css"

import Fortnite from "../../assets/image/game/fortnite.jpg"
import RocketLeague from "../../assets/image/game/rocketleague.jpg"
import {RootState} from "../../reducer"
import {GET_GAME_USER} from "../../gql/user/query"
import {GameUserModel} from "../models/user"
import Sidebar from "./sidebar"

const Mygames: React.FC = function() {
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const [choixGames,setChoixGames] = useState<GameUserModel[]>([])
	const {loading:ldgGame,error:errGame,data:dataGame} 	= useQuery(GET_GAME_USER, {
		variables: {
			uid:userConnectedRedux?.user.Uid,
		},
	})

	useEffect(() => {
		console.log("dataGame", dataGame)
		if(!ldgGame && !errGame && dataGame) {
			setChoixGames(dataGame.GetGameOneUserQuery)
		}
	},[ldgGame,errGame,dataGame])

  return(
	<div className="leaderboard settings jackpot mygames">
		<div className="container">
			<Header/>
			<div className="main">
				<div className="containt mes_jeux">
					<h2>Paramètres</h2>
					<div className="title-lead">
						<Sidebar />
						<div className="personal-infos">
							<div className="personal">
								<h3>Mes jeux</h3>
								<div className="personal-account">
									<div className="historical">
										<span>EPIC GAMES</span>
									</div>
									<div className="account-games">
										<div className="data-perso">
											<p>Compte<span>Twitch_Skouinar</span></p>
											<p>E-mail<span>Skouinar@gmail.com</span></p>
										</div>
										<div className="mygame-list">
											<img src={Fortnite} alt=""/>
											<img src={RocketLeague} alt=""/>
										</div>
									</div>
								</div>
								<div className="personal-account">
									<div className="historical">
										<span>EPIC GAMES</span>
									</div>
									<div className="account-games">
										<div className="data-perso">
											<p>Compte<span>Twitch_Skouinar</span></p>
											<p>E-mail<span>Skouinar@gmail.com</span></p>
											<button className="btn bg-red">connect with uplay</button>
										</div>
										<div className="mygame-list">
											<img src={Fortnite} alt=""/>
											<img src={RocketLeague} alt=""/>
											<img src={RocketLeague} alt=""/>
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
	</div>
	);
}

export default Mygames;
