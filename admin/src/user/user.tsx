import React,{useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useQuery} from "@apollo/client"
import {faSort, faSearch} from "@fortawesome/free-solid-svg-icons"

import {GET_ALL_USER} from "../gql/user/query"
import Pagination from "../common/pagination"
import SideBar from "../header/sidebar"
import Nav from "../header/nav"
//import AvatarDefault from "../assets/image/game-tag.png"

const User : React.FC = function(props:any) {
	const [users, setUsers] = useState<any>([])

	const {loading,error,data} 	= useQuery(GET_ALL_USER, {
		variables: {
			idUserConnected:"",
			limit:0,
			pageNumber:0
		},
	})

	useEffect(() => {
		if(!loading && !error && data) {
			console.log(data)
			setUsers(data.GetUsers)
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
										<p></p>
									</div>
									<div className="card-title">
										<div className="card-title">
											<p>Username <i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
										</div>
									</div>
									<div className="card-title">
										<p>Derniers mise à jour</p>
									</div>
									<div className="card-title">
										<div className="card-title">
											<p>Statut <i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
										</div>
									</div>
								</div>
								{
									users?.map(function(el:any,index:number){
										return (
											<div className="body-card" key={index}>
												<div className="card-result">
													{/*<img className="avatar-found" src={el.avatar ? (el.avatar) : AvatarDefault} />*/}
												</div>
												<div className="card-result">
													<p>{el.username}</p>
												</div>
												<div className="card-result">
													<p>
														{
														new Date(el.created).toLocaleTimeString('fr-Fr', {
															day : 'numeric',
															month : 'long',
															year : 'numeric',
														}).replace("à","")
													}
													</p>
												</div>
												<div className="card-result">
													<p>{!el.isBanned?"Actif":"Bloquer"}</p>
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

export default User
