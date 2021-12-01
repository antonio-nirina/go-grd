import React,{useState,useEffect} from 'react'
import { Link } from "react-router-dom"
import {useHistory } from "react-router-dom"
import {useQuery} from "@apollo/client"

import SideBar from "../header/sidebar"
import Nav from "../header/nav"
import {GET_ALL_GAMES} from "../gql/games/query"

type GameType = {
	uid:string,
	image:string,
	name:string,
	slug:string,
	logo:string,
	notes:string
}

const ListGame : React.FC = function() {
	const history = useHistory()
	const [games, setGames] = useState<GameType[]>([])
	//const [showList, setShowList] = useState<Boolean>(false)

    //const onShow = function(){
	//	setShowList(!showList)
	//}

	const {loading,error,data} 	= useQuery(GET_ALL_GAMES)

	useEffect(() => {
		if(!loading && !error && data) {
			setGames(data.FindAllGame)
		}

	},[loading,error,data])

	return (
	<div className="layout-container">
		<SideBar />
		<div className="content-wrapper">
			<nav className="navbar">
      			<div></div>
                <Nav />
    		</nav>
			<div className="main-content">
				<div className="body-content">
		    		<div className="column-game list-game">
		    			<div className="title">
		    				<h1>Liste de jeux</h1>
		    			</div>
		    			<div className="create-tournament-game">
		    				<button className="btn bg-red" onClick={()=> {history.push("/admin/create-game")}}>
		    					Créer jeux
	    					</button>
		    			</div>
			    		<div className="containt">
							<div className="favorite">
								<div className="game-list-container">
									<div className="favorite-game" >
										{games.map(function(e:GameType,index:number){
											return(
												<Link to ="#" key={index}>
													<img src={e.image} alt={e.slug} width="200"/>
												</Link>
											)
										})}
									</div>
								</div>
							</div>
						</div>
			    	</div>
		    	</div>
			</div>
		</div>
	</div>
	)
}

export default ListGame
