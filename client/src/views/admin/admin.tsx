import React from "react"
import {useState} from "react"
import { Link } from "react-router-dom"


import { faUsers, faPowerOff, faPlus, faSort, faChevronDown, faChevronRight, faChevronLeft, faSearch, faDesktop, faTrophy, faStar} from "@fortawesome/free-solid-svg-icons"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import avatar from "../../assets/image/game-tag.png"

import "../admin/admin.css"
import logo from "../../assets/image/gogrind-joystick.png"
const Admin: React.FC = function() {
	const [showList, setShowList] = useState<Boolean>(false)
	const onShow = function(){
		setShowList(!showList)
	}
	return(
    <div className="admin">    	
		<div className="layout-container">
			<aside className="main-sidebar ps">
				<Link to ="/" className="logo">
					<img src={logo} alt="logo" />
				</Link>
				<ul>
					<li>
						<Link to="#">
							<i><FontAwesomeIcon icon={faDesktop} size="lg"/></i>
							<span>Dashboard</span>
						</Link>
					</li>
					<li>
						<Link to="#">
							<i><FontAwesomeIcon icon={faTrophy} size="lg"/></i>
							<span>Tournois</span>
						</Link>
					</li>
					<li>
						<Link to="#">
							<i><FontAwesomeIcon icon={faUsers} size="lg"/></i>
							<span>Ligues</span>
						</Link>
					</li>
					<li>
						<Link to="#">
							<i><FontAwesomeIcon icon={faStar} size="lg"/></i>
							<span>Waggers</span>
						</Link>
					</li>					
				</ul>
			</aside>
			<div className="content-wrapper">
				<nav className="navbar">
          			<div></div>
      				<div id="profile-name" className="profil-name">
      					<Link to = "#">
      						<img src={avatar} alt="" /> 
  							<span className="d-md-inline-block">
  								Administrateur
  							</span>
  							<i className="power"><FontAwesomeIcon icon={faPowerOff} size="lg"/></i>
      					</Link>
      				</div>
        		</nav>
        		<div className="main-content">
        			<div className="body-content">
        				<div className="column">
        					<div className="response-filter">
        						<div className="response-filter-search">
        							<span className="ant-input-affix-wrapper">
        								<span className="ant-input-prefix">
        									<i><FontAwesomeIcon icon={faSearch} size="lg"/></i>
        								</span>
        								<input placeholder="Rechercher ..." type="text" className="ant-input" />
        							</span>
        						</div>
        						<div className="response-filter-flag">
        							<div className="response-status">
        								<span>
        									<strong>Statut :</strong>
        									<input placeholder="" type="text" className="ant-input" onClick={onShow}/>
        									<i onClick={onShow}><FontAwesomeIcon icon={faChevronDown} size="lg"/></i>
        								</span>
        								
        								<div className={!showList ? "hide-status" :"show-status"}>
        									<p>Tous les status</p>
        									<p>Actif</p>
        									<p>Inactif</p>
        								</div>
        							</div>
        						</div>
        						<div className="response-filter-avis">
        							<p><span>13</span> tournois dont <span>7 </span>actifs</p>
        						</div>        						
        					</div>
        					<div className="create-game">
        						<button className="btn bg-red"><FontAwesomeIcon icon={faPlus} /> Créer tournois</button>
        					</div>
        				</div>
        				<div className="body-card">
        					<div className="card-title">
        						<p>Compagnie <i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
        					</div>
        					<div className="card-title">
        						<div className="card-title">
        						<p>Compagnie <i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
        					</div>
        					</div>
        					<div className="card-title">
        						<div className="card-title">
        						<p>Compagnie <i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
        					</div>
        					</div>
        					<div className="card-title">
        						<div className="card-title">
        						<p>Compagnie <i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
        					</div>
        					</div>
        					<div className="card-title">
        						<div className="card-title">
        						<p>Compagnie <i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
        					</div>
        					</div>
        				</div>
        				<div className="body-card">
        					<div className="card-result">
        						<p>Apex Legends</p>
        					</div>
        					<div className="card-result">
        						<p>Rocket League</p>
        					</div>
        					<div className="card-result">
        						<p>Call of Duty</p>
        					</div>
        					<div className="card-result">
        						<p>Fifa 2021</p>
        					</div>
        					<div className="card-result">
        						<p>RainbowSix</p>
        					</div>
        				</div>
        				<div className="filter-game-result">
        					<div className="result-game-page">
        						<i><FontAwesomeIcon icon={faChevronLeft} size="lg"/></i>
        						<span>1</span>
        						<i><FontAwesomeIcon icon={faChevronRight} size="lg"/></i>
        					</div>        					
        				</div>
        			</div>
        		</div>
			</div>
		</div>
  	</div>
  )
}

export default Admin
