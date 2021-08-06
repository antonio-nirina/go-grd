import React,{useState,useEffect} from 'react'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useQuery} from "@apollo/client"
import { faPlus, faSort,faEdit,faTrash } from "@fortawesome/free-solid-svg-icons"

import {GET_ALL_HOME} from "../gql/home/query"
import SideBar from "../header/sidebar"
import Nav from "../header/nav"

const HomeList : React.FC = function(props:any) {
	const [home, setListHome] = useState<any>([])
	const {loading,error,data} 	= useQuery(GET_ALL_HOME)

	useEffect(() => {
		if(!loading && !error && data) {
			setListHome(data.FindAllHome)
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
							<div className="create-game">
								<Link to="/admin/set-home">
									<button className="btn bg-red" style={{"cursor":"pointer"}}>
										<FontAwesomeIcon icon={faPlus} />
											Créer contenu
									</button>
								</Link>
							</div>
						</div>
						<div className="auto-scroll">
							<div className="sm-width">
								<div className="body-card align-center">
									<div className="card-title">
										<p>Titre<i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
									</div>
									<div className="card-title">
										<p>Sous-titre<i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
									</div>
									<div className="card-title">
										<p>Location<i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
									</div>
									<div className="card-title">
										<p>
											Statut
											<i>
												<FontAwesomeIcon icon={faSort} size="lg"/>
											</i>
										</p>
									</div>
									<div className="card-title">

									</div>
								</div>
								{
									home?.map(function(el:any,index:number){
										return (
											<div className="body-card" key={index} style={{"cursor":"pointer"}}>
												<div className="card-result align-center">
													<p>{el.title}</p>
												</div>
												<div className="card-result align-center">
													<p>{el.underTitle}</p>
												</div>
												<div className="card-result align-center">
													<p>{el.location}</p>
												</div>
												<div className="card-result align-center">
													<p>{el.statut?"Active":"Inactif"}</p>
												</div>
												<div className="card-result align-right">
													<>
														<Link to={`/admin/detail/${el.uid}`}><i><FontAwesomeIcon icon={faEdit} /></i></Link>
														<i><FontAwesomeIcon icon={faTrash} /></i>
													</>
												</div>
											</div>
										)
									})
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HomeList
