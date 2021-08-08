import React,{useState,useEffect} from 'react'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useQuery} from "@apollo/client"
import { faPlus, faSort, faChevronUp, faChevronDown, faSearch} from "@fortawesome/free-solid-svg-icons"

import {GET_ALL_TOURNAMENT} from "../gql/tournament/query"
import Pagination from "../common/pagination"
import SideBar from "../header/sidebar"
import Nav from "../header/nav"
import {NUMBER_PER_PAGE} from "../common/constante"

interface Item {
	item:number
}

const ListTournament : React.FC = function(props:any) {
	const [showList, setShowList] = useState<Boolean>(false)
	const [tournament, setTournament] = useState<any>([])
	const [item, setItem] = useState<Item>({item:1})
	//const [limit, setLimit] = useState<Number>(0)
	//const [pageNumber, setPageNumber] = useState<Number>(0)
	const {loading,error,data} 	= useQuery(GET_ALL_TOURNAMENT, {
		variables: {
			limit:NUMBER_PER_PAGE,
			pageNumber:(item.item)*NUMBER_PER_PAGE - NUMBER_PER_PAGE
		},
	})

	useEffect(() => {
		//let init = true
		if(!loading && !error && data) {
			setTournament(data.FindAllTournament)
		}

		// return () => init = false

	},[loading,error,data,props])

    const onShow = function(){
		setShowList(!showList)
	}

	const handleItemsPage = function(item:number) {
    	setItem({item:item})
    }

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
								<Link to="/admin/create-tournament"><button className="btn bg-red"><FontAwesomeIcon icon={faPlus} /> Créer tournois</button></Link>
							</div>
						</div>
						<div className="auto-scroll">
							<div className="sm-width">
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
													<p>{
														new Date(el.date).toLocaleTimeString('fr-Fr', {
															day : 'numeric',
															month : 'long',
															year : 'numeric',
															hour:"numeric",
															minute:"numeric"
														})
													}</p>
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
													<p>{el.price}</p>
												</div>
												<div className="card-result">
													<p>{el.numberParticipate}</p>
												</div>
												<div className="card-result">
													<p>{el.statut?"Actif":"Inactif"}</p>
												</div>
											</div>
										)
									})
								}
							</div>
						</div>
						<Pagination
							handlePage={handleItemsPage}
							records={tournament.length > 0 ? tournament[0].records : 0}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ListTournament

