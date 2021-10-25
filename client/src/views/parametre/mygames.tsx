import React,{useState,useEffect} from "react"

import { useSelector } from "react-redux"
import {useQuery} from "@apollo/client"
import Header from "../header/header"
import Footer from "../footer/footer"
import "../parametre/parametre.css"

import {RootState} from "../../reducer"
import {GET_GAME_USER} from "../../gql/user/query"
import Sidebar from "./sidebar"

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
		console.log("dataGame", dataGame)
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
					<h2>Paramètres</h2>
					<div className="title-lead">
						<Sidebar />
						<div className="personal-infos">
							<div className="personal">
								<h3>Mes jeux</h3>
								{choixGames.length > 0 ? choixGames.map(function(element:MayGame,index:number) {
									return(
										<div className="personal-account">
											<div className="historical">
												<span>{element.name}</span>
											</div>
											<div className="account-games">
												<div className="data-perso">
													<p>Compte<span></span></p>
													<p>E-mail<span>{userConnectedRedux?.user.email}</span></p>
												</div>
												<div className="mygame-list">
													<img src={element.image} alt=""/>
												</div>
											</div>
										</div>
									)
								}) : <></>}

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
