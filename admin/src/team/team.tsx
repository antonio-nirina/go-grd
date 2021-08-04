import React,{useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useQuery} from "@apollo/client"
import { faSort, faSearch} from "@fortawesome/free-solid-svg-icons"

import {GET_ALL_TEAMS} from "../gql/team/query"
import Pagination from "../common/pagination"
import SideBar from "../header/sidebar"
import Nav from "../header/nav"

const Team : React.FC = function(props:any) {
	const [team, setTeam] = useState<any>([])

	const {loading,error,data} 	= useQuery(GET_ALL_TEAMS, {
		variables: {
			limit:0,
			pageNumber:0
		},
	})

	useEffect(() => {
		if(!loading && !error && data) {
			setTeam(data.FindAllTeam)
		}

	},[loading,error,data,props])

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
							</div>
						</div>
						<div className="auto-scroll">
							<div className="sm-width">
								<div className="body-card">
									<div className="card-title">
										<div className="card-title">
											<p></p>
										</div>
										<div className="card-title">
											<p>Creation <i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
										</div>
									</div>
									<div className="card-title">
										<p>Nom <i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
									</div>
									<div className="card-title">
										<p>Createur</p>
									</div>
									<div className="card-title">
										<div className="card-title">
											<p>Statut <i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
										</div>
									</div>
								</div>
								{
									team?.map(function(el:any,index:number){
										return (

											<div className="body-card" key={index}>
												<div className="card-result">
													<p>{
														new Date(el.date).toLocaleTimeString('fr-Fr', {
															day : 'numeric',
															month : 'long',
															year : 'numeric',
														})
													}</p>
												</div>
												<div className="card-result">
													<p>{el.name}</p>
												</div>
												<div className="card-result">
													<p>{el.creator}</p>
												</div>
												<div className="card-result">
													<p>{el.plateform.name}</p>
												</div>
												<div className="card-result">
													<p>{el.IsBlocked}</p>
												</div>
											</div>
										)
									})
								}
							</div>
						</div>
						<Pagination />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Team
