import React,{useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useQuery} from "@apollo/client"
import {faSort, faSearch} from "@fortawesome/free-solid-svg-icons"
import { useSelector } from "react-redux"

import {GET_ALL_USER} from "../gql/user/query"
import Pagination from "../common/pagination"
import SideBar from "../header/sidebar"
import Nav from "../header/nav"
import AvatarDefault from "../assets/image/game-tag.png"
import {RootState} from "../reducer"

const User : React.FC = function(props:any) {
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const [users, setUsers] = useState<any>([])

	const {loading,error,data} 	= useQuery(GET_ALL_USER, {
		variables: {
			idUserConnected:userConnectedRedux.user.uid,
			limit:5,
			pageNumber:1
		},
	})

	useEffect(() => {
		if(!loading && !error && data) {
			console.log(data)
			setUsers(data.GetUsers)
		}

	},[loading,error,data,props])
	const [showModal, setShowModal] = useState(false)
	const [showConfirm, setShowConfirm] = useState(false)	
    const onShowModal = function(){
        setShowModal(!showModal)
    }  
    const onShowConfirm = function(){
        setShowConfirm(!showConfirm)
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
						<div className="column user">
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
									<div className="card-title">
										<div className="card-title">
											<p>Ban <i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
										</div>
									</div>
								</div>																						
								{
									users?.map(function(el:any,index:number){
										return (
											<div className="body-card padt0" key={index}>
												<div className="card-result">
													<img className="avatar-found" src={el.avatar ? (el.avatar) : AvatarDefault} alt="" />
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
												<div className="card-result check">
													<p>
														<label htmlFor="ban" className="switch">
															<input type="checkbox" onChange={onShowModal} id="ban"/>
															<span className="slider">Oui</span>
														</label>
													</p>
												</div>
											</div>
										)
									})
								}
							</div>
							<div className={!showModal ? "popup-modal" :"popup-modal show"} >
								<div className="popup-container">
									<div className="popup-title">{!showConfirm ? "Voulez vous bannir " :"Voulez vous annuler le bannissement de "}<span>Antonio</span>?</div>
									<div className="btn-container confirm">
										<button className="btn bg-red">Oui</button>
										<button className="btn bg-white" onClick={onShowModal}>Non</button>
									</div>
								</div>
							</div>
						</div>
						<Pagination records={users.length > 0 ? users[0].records : 0} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default User
