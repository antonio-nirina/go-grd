import React,{useState} from 'react'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSort, faChevronUp, faChevronDown, faChevronRight, faChevronLeft, faSearch} from "@fortawesome/free-solid-svg-icons"

// import SideBar from "./sidebar"


const ListTournament : React.FC = function() {
	const [showList, setShowList] = useState<Boolean>(false)

    const onShow = function(){
		setShowList(!showList)
	}

	return (
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
									<label htmlFor="status">Statut :</label>
									<input placeholder="" type="text" className="ant-input" onClick={onShow} id="status"/>
									<i onClick={onShow}><FontAwesomeIcon icon={!showList ? faChevronUp : faChevronDown} size="lg"/></i>
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
						<Link to="/create-tournament"><button className="btn bg-red"><FontAwesomeIcon icon={faPlus} /> Créer tournois</button></Link>
					</div>
				</div>
				<div className="body-card">
					<div className="card-title">
						<p>Tournois <i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
					</div>
					<div className="card-title">
						<div className="card-title">
						<p>Prix <i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
					</div>
					</div>
					<div className="card-title">
						<div className="card-title">
						<p>Rank <i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
					</div>
					</div>
					<div className="card-title">
						<div className="card-title">
						<p>Statut <i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
					</div>
					</div>
					<div className="card-title">
						<div className="card-title">
						<p>Date de création <i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
					</div>
					</div>
				</div>
				<div className="body-card">
					<div className="card-result">
						<p>Apex Legends</p>
					</div>
					<div className="card-result">
						<p>200</p>
					</div>
					<div className="card-result">
						<p>Platinium</p>
					</div>
					<div className="card-result">
						<p>Actif</p>
					</div>
					<div className="card-result">
						<p>2020-11-22 10:42:12</p>
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
	)
}

export default ListTournament
