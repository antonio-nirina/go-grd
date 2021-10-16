import React,{useEffect,useState} from "react"
import { Link } from 'react-router-dom'
import {useMutation,useQuery} from "@apollo/client"

import Playstation from "../../assets/image/jeux/playstation.jpg"
import Xbox from "../../assets/image/jeux/xbox.jpg"
import Switch from "../../assets/image/jeux/switch.jpg"
import { GET_ALL_GAMES } from "../../gql/games/query"

import "../auth/inscription.css"
import "../../assets/css/style.css"

type GameType = {
	uid:string,
	image:string,
	name:string,
	slug:string,
	logo:string
}

const GameList: React.FC = function() {
	const [games,setGames] = useState<GameType[]>([])

	const {loading,error,data} 	= useQuery(GET_ALL_GAMES)

	useEffect(() => {
		console.log(data)
		if(!loading && !error && data) {
			setGames(data.FindAllGame)
		}
	},[loading,error,data])

  return(
	<div>
		<div className="favorite">
			<div className="game-list-container">
				<p>1. Choisis tes jeux favoris</p>
				<div className="favorite-game" >
					{games.map(function(e:GameType,index:number){
						return(
							<Link to ="#" key={index}><img src={e.image} alt={e.slug} width="200"/></Link>
						)
					})}
				</div>
			</div>
			<div className="platform">
				<p>2. Choisis la plateforme sur laquelle tu veux jouer</p>
				<div className="platform-content">
					<Link to ="#"><img src={Playstation} alt="playstation" width="200"/></Link>
					<Link to ="#"><img src={Xbox} alt="xbox" width="200"/></Link>
					<Link to ="#"><img src={Switch} alt="switch" width="200"/></Link>
				</div>
			</div>
		</div>
		<div className="infos-text">
			<p>Ne t'inquiète pas, tu pourras mettre à jour cette liste après ton inscription</p>
			<p className="submit-btn"><Link to="#">Valider mes choix</Link></p>
		</div>
	</div>
	);
}

export default GameList;
