import React from 'react'
import { Link } from "react-router-dom"

import SideBar from "../header/sidebar"
import Nav from "../header/nav"
import Rocketleague from "../assets/image/rocketleague.png"
import ApexLegends from "../assets/image/apex-legends.png"


const ListGame : React.FC = function() {
	//const [showList, setShowList] = useState<Boolean>(false)

    //const onShow = function(){
	//	setShowList(!showList)
	//}

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
		    				<button className="btn bg-white">Supprimer jeux</button>
		    				<button className="btn bg-red">Créer jeux</button>
		    			</div>	    		
			    		<div className="dashboard list-game">
			    			<Link to ="#" className="grid league-board">	    				
			    				<img src="https://i.ibb.co/Vw39G5b/championship-rl.jpg" alt="#" />
			    				<span className="logo-game"><img src={Rocketleague} alt="" /></span>
			    				<span className="grid-title">Rocket League :</span>
			    				<span className="grid-desc">Genre : course</span>
			    			</Link>
			    			<Link to ="#" className="grid tournament-board">
			    				<img src="https://i.ibb.co/TKD3yZT/apex-legends.webp" alt="#" />
			    				<span className="logo-game"><img src={ApexLegends} alt="" /></span>
			    				<span className="grid-title">Apex legends</span>
			    				<span className="grid-desc">Genre : FPS</span>
			    			</Link>
			    			<Link to="#" className="grid wagger-board">
			    				<img src="https://i.ibb.co/YQgvJpM/championship.jpg" alt="#" />
			    				<span className="logo-game"><img src={Rocketleague} alt="" /></span>
			    				<span className="grid-title" >Call of Duty</span>
			    				<span className="grid-desc">Genre : FPS</span>
			    			</Link>
			    			<Link to="#" className="grid community-board">
			    				<img src="https://i.ibb.co/YQgvJpM/championship.jpg" alt="#" />
			    				<span className="logo-game"><img src={Rocketleague} alt="" /></span>
			    				<span className="grid-title">Fifa 2021</span>
			    				<span className="grid-desc">Genre : Sport</span>
			    			</Link>
			    		</div>
			    	</div>
		    	</div>
			</div>
		</div>
	</div>
	)
}

export default ListGame
