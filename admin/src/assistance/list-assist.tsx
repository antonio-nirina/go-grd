import React,{useState,useEffect} from 'react'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useQuery} from "@apollo/client"
import { faPlus, faSort,faEdit,faTrash } from "@fortawesome/free-solid-svg-icons"

import {GET_ALL_ASSIST} from "../gql/assist/query"
import SideBar from "../header/sidebar"
import Nav from "../header/nav"

const ListAssist : React.FC = function() {
	const [assists, setAssists] = useState<any>([])
	const {loading,error,data} 	= useQuery(GET_ALL_ASSIST)

	useEffect(() => {
		if(!loading && !error && data) {
			setAssists(data.FindAllAsist)
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
					<div className="body-content list-assist">
						<div className="column">
							<div className="create-game">
								<Link to="/admin/create/subject">
									<button className="btn bg-red" style={{"cursor":"pointer"}}>
										<FontAwesomeIcon icon={faPlus} />
											Créer titre des questions
									</button>
								</Link>
							</div>
						</div>
						<div className="auto-scroll">
							<div className="sm-width">
								<div className="body-card">
									<div className="card-title">
										<p>Titre<i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
									</div>
									<div className="card-title">
										<p>Sous-titre<i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
									</div>
									<div className="card-title">
										<p>Statut <i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
									</div>
									<div className="card-title"></div>
								</div>
								{
									assists?.map(function(el:any,index:number){
										return (
											<div className="body-card" key={index} style={{"cursor":"pointer"}}>
												<div className="card-result">
													<p>{el.title.title}</p>
												</div>
												<div className="card-result">
													<p>{el.underTitle}</p>
												</div>
												<div className="card-result">
													<p>{el.statut?"Actif":"Inactif"}</p>
												</div>
												<div className="card-result">
													<>
														<Link to={`/admin/detail/assist/${el.uid}`}><i><FontAwesomeIcon icon={faEdit} /></i></Link>
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

export default ListAssist
