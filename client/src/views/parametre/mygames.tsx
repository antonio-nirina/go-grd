import React,{useState,useEffect} from "react"

import { useSelector } from "react-redux"
import {useQuery} from "@apollo/client"
import Header from "../header/header"
import Footer from "../footer/footer"
import "../parametre/parametre.css"

import {RootState} from "../../reducer"
import {GET_GAME_USER} from "../../gql/user/query"
import Sidebar from "./sidebar"

import Apex from "../../assets/image/game/apex.jpeg"
import Coldwar from "../../assets/image/game/cod-coldwar.jpeg"
import Fortnite from "../../assets/image/game/fortnite.jpg"
import Rainbowsix from "../../assets/image/game/rainbow-six.jpg"
import Fifa from "../../assets/image/game/fifa.jpg"
import Warzone from "../../assets/image/game/cod-warzone.jpg"
import Rocketleague from "../../assets/image/game/rocketleague.jpg"
import Vanguard from "../../assets/image/game/cod-vanguard.jpg"


interface MayGame {
	image:string
	logo:string
	name: string
	slug: string
	uid:string
}

const Mygames: React.FC = function() {
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const [choixGames,setChoixGames] = useState<MayGame[]>([])
	const {loading:ldgGame,error:errGame,data:dataGame} 	= useQuery(GET_GAME_USER, {
		variables: {
			uid:userConnectedRedux?.user.uid,
		},
	})

	useEffect(() => {
		if(!ldgGame && !errGame && dataGame) {
			setChoixGames(dataGame.GetGameOneUserQuery.game)
		}
	},[ldgGame,errGame,dataGame])

  return(
	<div className="leaderboard settings jackpot mygames">
		<div className="container">
			<Header/>
			<div className="main">
				<div className="containt mes_jeux">
					<div className="title-lead">
						<Sidebar />
						<div className="personal-infos">
							<div className="personal">
								<h2>Mes jeux</h2>
								<div className="my_game_list">
									<div className="game_update">
										<img src={Apex} alt="" />
										<p>PS4 - Xbox One</p>
									</div>
								</div>
								<div className="my_game_list">
									<div className="game_update">
										<img src={Coldwar} alt="" />
										<p>PS4 - Xbox One</p>
									</div>
								</div>
								<div className="my_game_list">
									<div className="game_update">
										<img src={Fortnite} alt="" />
										<p>PS4 - Xbox One</p>
									</div>
								</div>
								<div className="my_game_list">
									<div className="game_update">
										<img src={Rainbowsix} alt="" />
										<p>PS4 - Xbox One</p>
									</div>
								</div>
								<div className="my_game_list">
									<div className="game_update">
										<img src={Fifa} alt="" />
										<p>PS4 - Xbox One</p>
									</div>
								</div>
								<div className="my_game_list">
									<div className="game_update">
										<img src={Warzone} alt="" />
										<p>PS4 - Xbox One</p>
									</div>
								</div>
								<div className="my_game_list">
									<div className="game_update">
										<img src={Rocketleague} alt="" />
										<p>PS4 - Xbox One</p>
									</div>
								</div>
								<div className="my_game_list">
									<div className="game_update">
										<img src={Vanguard} alt="" />
										<p>PS4 - Xbox One</p>
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
	)
}

export default Mygames
