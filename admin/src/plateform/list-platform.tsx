import React,{useState,useEffect} from 'react'
import { Link } from "react-router-dom"
import {useHistory } from "react-router-dom"
import {useQuery} from "@apollo/client"

import SideBar from "../header/sidebar"
import Nav from "../header/nav"
import {GET_ALL_PLATEFORM} from "../gql/games/query"

type PLType = {
	uid:string,
	name:string,
	logo:string,
	description:string
}


const ListPlateform = function () {
	const history = useHistory()
	const [plateform, setPlateform] = useState<PLType[]>([])

	const {loading,error,data} 	= useQuery(GET_ALL_PLATEFORM)

	useEffect(() => {
		console.log("data", data)
		if(!loading && !error && data) {
			setPlateform(data.FindAllPlateform)
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
		    				<button className="btn bg-red" onClick={()=> {history.push("/admin/create-plateform")}}>
		    					Créer plateform
	    					</button>
		    			</div>
			    		<div className="dashboard list-game">
			    			{plateform?.map(function(el:PLType,index:number){
                            	return (
                            		<Link key={index} to ="#" className="grid league-board" >
					    				<span className="img-games" style={{ background: `url(${el.logo})`}}></span>
					    				<strong className="game-name">
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

export default ListPlateform
