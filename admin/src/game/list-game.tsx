import React,{useState,useEffect} from 'react'
import { Link } from "react-router-dom"
import {useHistory } from "react-router-dom"
import {useQuery} from "@apollo/client"

import SideBar from "../header/sidebar"
import Nav from "../header/nav"
import {GET_ALL_GAMES} from "../gql/games/query"

const ListGame : React.FC = function() {
	const history = useHistory()
	const [games, setGames] = useState<any>([])
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
			    		<div className="dashboard list-game">
			    			{games?.map(function(el:any,index:number){
                            	return (
                            		<Link key={index} to ="#" className="grid league-board" >
					    				<span className="img-games" style={{ background: `url(${el.image})`}}></span>
					    				<strong className="game-name">
					    					<span className="logo-game"><img src={el.logo} alt="" /></span>					    					
					    					<span className="grid-title">{el.name}</span>					    					
					    				</strong>
					    			</Link>
                        		)
                            })}


			    		</div>
			    	</div>
		    	</div>
			</div>
		</div>
	</div>
	)
}

export default ListGame
