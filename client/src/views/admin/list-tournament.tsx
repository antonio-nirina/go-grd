import React,{useState,useEffect} from 'react'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useQuery} from "@apollo/client"
import { faPlus, faSort, faChevronUp, faChevronDown, faSearch} from "@fortawesome/free-solid-svg-icons"

import {GET_ALL_TOURNAMENT} from "../../gql/tournament/query"
import Pagination from "./pagination"


const ListTournament : React.FC = function() {
	const [showList, setShowList] = useState<Boolean>(false)
	const [tournament, setTournament] = useState<any>([])
	const [limit, setLimit] = useState<Number>(0)
	const [pageNumber, setPageNumber] = useState<Number>(0)
	const {loading,error,data} 		= useQuery(GET_ALL_TOURNAMENT, {
		variables: {
			limit:limit,
			pageNumber:pageNumber
		},
	})

	useEffect(()=> {
		if(!loading && !error && data) {
			setTournament(data.FindAllTournament)
		}

	},[loading,error,data])

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
						<div className="card-title">
							<p>Heure <i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
						</div>
					</div>
					<div className="card-title">
						<p>Titre <i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
					</div>
					<div className="card-title">
						<div className="card-title">
							<p>Game <i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
						</div>
					</div>
					<div className="card-title">
						<p>Plateforme <i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
					</div>
					<div className="card-title">
						<div className="card-title">
							<p>Gains <i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
						</div>
					</div>
					<div className="card-title">
						<div className="card-title">
							<p>Participants <i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
						</div>
					</div>
					<div className="card-title">
						<div className="card-title">
							<p>Statut <i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
						</div>
					</div>
				</div>
				{
					tournament?.map(function(el:any,index:number){
						return (
							<div className="body-card" key={index}>
								<div className="card-result">
									<p>{el.date}</p>
								</div>
								<div className="card-result">
									<p>{el.title}</p>
								</div>
								<div className="card-result">
									<p>{el.game.name}</p>
								</div>
								<div className="card-result">
									<p>{el.plateform.name}</p>
								</div>
								<div className="card-result">
									<p>{el.numberParticipate}</p>
								</div>
								<div className="card-result">
									<p>{el.price}</p>
								</div>
								<div className="card-result">
									<p>{el.statut?"Actif":"Inactif"}</p>
								</div>
							</div>
						)
					})
				}

				<Pagination />
			</div>
		</div>
	)
}

export default ListTournament
