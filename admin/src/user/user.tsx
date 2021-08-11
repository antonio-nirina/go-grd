import React,{useState,useEffect} from "react"
import Loader from "react-loader-spinner"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {useQuery} from "@apollo/client"
import {faSort, faSearch} from "@fortawesome/free-solid-svg-icons"
import { useSelector } from "react-redux"

import {GET_ALL_USER} from "../gql/user/query"
import Pagination from "../common/pagination"
import SideBar from "../header/sidebar"
import Nav from "../header/nav"
import AvatarDefault from "../assets/image/game-tag.png"
import {RootState} from "../reducer"
import {NUMBER_PER_PAGE} from "../common/constante"

interface Item {
	item:number
}

const User : React.FC = function(props:any) {
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const [users, setUsers] = useState<any>([])
	const [showModal, setShowModal] = useState(false)
	const [showConfirm, setShowConfirm] = useState(false)
	const [showName, setShowName] = useState<string>("")
	const [isClosed, setIsClosed] = useState<Boolean>(false)
	const [isLoader, setIsLoader] = useState<Boolean>(true)
	const [item, setItem] = useState<Item>({item:1})

	const {loading,error,data} 	= useQuery(GET_ALL_USER, {
		variables: {
			idUserConnected:userConnectedRedux.user.uid,
			limit:NUMBER_PER_PAGE,
			pageNumber:(item.item)*NUMBER_PER_PAGE - NUMBER_PER_PAGE
		},
	})

	useEffect(() => {
		if(!loading && !error && data) {
			setIsLoader(false)
			setUsers(data.GetUsers)
		}

	},[loading,error,data,props,item,isLoader])

    const onShowModal = function(event:any,isBan=false,username = ""){
    	console.log("username",username)
		setShowModal(!isClosed)
    	setShowName(username)
    }

    const onShowConfirm = function(){
    	// verif
    	setIsClosed(true)
        setShowConfirm(!showConfirm)
    }

    const handleNotAccepted = function() {
    	setShowName("")
    	setShowModal(false)
    }
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
								<div className={isLoader ? "loader-spinner":"d-none"}>
									<Loader
								        type="Oval"							       
								        color="#dd0000"							        
								    />
								</div>
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
															<input
																type="checkbox"
																u-tag={el.username}
																checked={!el.isBanned? false : true}
																onChange={(e) => onShowModal(e,el.isBanned,el.username)}
																id="ban"/>
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
									<div className="popup-title">{!showConfirm ? "Voulez vous bannir " :"Voulez vous annuler le bannissement de "}<span>{showName}</span>?</div>
									<div className="btn-container confirm">
										<button className="btn bg-red" onClick={() => handleNotAccepted()}>Oui</button>
										<button className="btn bg-white" onClick={onShowConfirm}>Non</button>
									</div>
								</div>
							</div>
						</div>
						<Pagination
							handlePage={handleItemsPage}
							records={users.length > 0 ? users[0].records : 0}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default User
