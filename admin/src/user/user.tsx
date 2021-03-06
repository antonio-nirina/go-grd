import React,{useState,useEffect} from "react"
import { Link } from "react-router-dom"
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
										<p>Derniers mise ?? jour</p>
									</div>
									<div className="card-title">
										<div className="card-title">
											<p>Statut <i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
										</div>
									</div>
									<div className="card-title">
										<div className="card-title">
											<p>D??tail <i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
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
														}).replace("??","")
													}
													</p>
												</div>
												<div className="card-result">
													<p>{!el.isBanned?"Actif":"Bloquer"}</p>
												</div>
												<div className="card-result check">
													<div className="btn-container nomarg">
														<Link to="/admin/detail-user" className="btn bg-red">D??tail user</Link>
													</div>
												</div>
											</div>
										)
									})
								}
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
