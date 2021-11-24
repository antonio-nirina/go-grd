import React,{useState,useEffect} from "react"
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux"
import Header from "../header/header"
import Footer from "../footer/footer"
import "../parametre/parametre.css"

import {RootState} from "../../reducer"
import Sidebar from "./sidebar"
import Apex from "../../assets/image/game/apex.jpeg"
import Coldwar from "../../assets/image/game/cod-coldwar.jpeg"
import Fortnite from "../../assets/image/game/fortnite.jpg"
import Rainbowsix from "../../assets/image/game/rainbow-six.jpg"
import Fifa from "../../assets/image/game/fifa.jpg"
import Warzone from "../../assets/image/game/cod-warzone.jpg"
import Rocketleague from "../../assets/image/game/rocketleague.jpg"
import Vanguard from "../../assets/image/game/cod-vanguard.jpg"
import {GameType,PlateformType} from "../models/game"


const Mygames: React.FC = function() {
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const [choixGames,setChoixGames] = useState<GameType[]>([])
	const [plateforms,setPlateforms]  =useState<string>("")


	useEffect(() => {
		let arrayGame:GameType[] = []
		let arrayPlateforms:string[] = []

		if(userConnectedRedux.user.games && userConnectedRedux.user.games.length > 0) {
			userConnectedRedux.user.games.forEach((element:GameType) => {
				let imageGame:string = ""
				if(element.slug === "vanguard") {
					imageGame = Vanguard
				} else if(element.slug === "fortnite") {
					imageGame = Fortnite
				} else if(element.slug === "apexlegends") {
					imageGame = Apex
				} else if(element.slug === "rainbows") {
					imageGame = Rainbowsix
				} else if(element.slug === "ops") {
					imageGame = Coldwar
				} else if(element.slug === "fifa21") {
					imageGame = Fifa
				} else if(element.slug === "warzone") {
					imageGame = Warzone
				} else if(element.slug === "rocketleague") {
					imageGame = Rocketleague
				}

				arrayGame.push({
					image:imageGame,
					logo:element.logo,
					name: element.name,
					slug: element.slug,
					uid:element.uid,
				})
				setChoixGames(arrayGame)
			})

			userConnectedRedux.user.plateforms.forEach(function(plateform:PlateformType) {
				arrayPlateforms.push(plateform.name)
			})
			setPlateforms(arrayPlateforms.join("-"))
		}

	},[])

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
								{
									choixGames.length > 0
									?
									choixGames.map(function(game:GameType,index:number) {
										return (
											<div className="my_game_list" key={index}>
												<div className="game_update">
													<img src={game.image} alt={game.name} />
													<p>{plateforms}</p>
												</div>
											</div>
										)
									})
									:

									 <button className="btn bg-red">
										 <Link to="/add/game/favorit" >Créer votre game favoris</Link>
									 </button>
								}

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
