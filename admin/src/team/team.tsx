import React,{useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from "react-loader-spinner"
import {useQuery} from "@apollo/client"
import { faSort, faSearch} from "@fortawesome/free-solid-svg-icons"

import {GET_ALL_TEAMS} from "../gql/team/query"
import Pagination from "../common/pagination"
import SideBar from "../header/sidebar"
import Nav from "../header/nav"
import {NUMBER_PER_PAGE} from "../common/constante"

interface Item {
	item:number
}

const Team : React.FC = function(props:any) {
	const [team, setTeam] = useState<any>([])
	const [item, setItem] = useState<Item>({item:1})
	const [isLoader, setIsLoader] = useState<Boolean>(true)

	const {loading,error,data} 	= useQuery(GET_ALL_TEAMS, {
		variables: {
			limit:NUMBER_PER_PAGE,
			pageNumber:(item.item)*NUMBER_PER_PAGE - NUMBER_PER_PAGE
		},
	})

	useEffect(() => {
		if(!loading && !error && data) {
			setIsLoader(false)
			setTeam(data.FindAllTeam)
		}

	},[loading,error,data,props,isLoader])

	const handleItemsPage = function(item:number) {
		setIsLoader(true)
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
							</div>
						</div>
						<div className="auto-scroll">
							<div className="sm-width">
							<div className={isLoader ? "loader-spinner":"d-none"}>
									<Loader
								        type="Oval"
								        color="#dd0000"
								    />
								</div>
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
						<Pagination
						handlePage={handleItemsPage}
						records={team.length > 0 ? team[0].records : 0} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Team
