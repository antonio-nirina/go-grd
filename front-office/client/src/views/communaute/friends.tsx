import React,{useMemo, useState, useEffect} from "react"
import { faPlus, faCommentDots, faQuestionCircle, faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Popup from "reactjs-popup"
import "reactjs-popup/dist/index.css"
import { Link } from 'react-router-dom'
import {useQuery} from "@apollo/client"
import {GET_ALL_FRIENDS} from "../../gql/user/query"
import { useSelector } from "react-redux"
import {RootState} from "../../reducer"
import {Translation} from "../../lang/translation"
import {Friends} from "../../gql/types/friend"
import AvatarDefault from "../../assets/image/game-tag.png"

const Friend: React.FC = function() {
	const userConnectedRedux 	= useSelector((state:RootState) => state.userConnected)
	const [nbFriends, setNbFriends] = useState<number>(0)
	const [friends, setFriends] = useState<Array<Friends>>([])
	const {loading,error,data} = useQuery(GET_ALL_FRIENDS, {
		variables: {
			email: userConnectedRedux.user.email
		},
	})
	useMemo(()=> {
		if(!loading && !error && data) {
			if(data.GetAllFriends[0].count > 0) {
				setNbFriends(data.GetAllFriends[0].count)
				setFriends(data.GetAllFriends)
			}
		}
	},[loading,error,data])
	return (
		<div className="aside-right">
			{nbFriends
				?
				friends.map(function(el:any,index:number) {
					let img = el.avatar ? el.avatar : AvatarDefault
					return(<p key={index}>
							<img src={img} className="friend-avatar"/>
							<span>{el.username}<i className="u-connected"></i></span>
							<i><FontAwesomeIcon icon={faCommentDots} size="xs"/></i>
							<i className="rect"><FontAwesomeIcon icon={faPlus} size="xs"/></i>
						</p>
					)
				})
			: (<div className="friend-list noborder">
					<p className="title">Amis</p>
					<p style={{"fontWeight":"bold"}}>					
						{ `${userConnectedRedux.user.username} `}
					{
						Object.keys(userConnectedRedux.user).length > 0 ?
						Translation(userConnectedRedux.user.language).communauty.friend
						:
						Translation("fr").communauty.friend
					}
					</p>					
					<div className="friends">
						<Popup
							trigger={
								<p className="search-friends"><Link to="#">
									<FontAwesomeIcon icon={faUserPlus} size="xs"/>
									<span>Trouver des amis</span></Link>
								</p>
							}
							modal
							nested
						>
							<div className="modal">
								<button className="close">
									&times;
								</button>
								<div className="bar-title">Ajouter des amis</div>
									<div className="actions">
										<div className="body">
											<div className="avatar-container">
												<div className="add-friends">
													<div className="found">
														<p>
															<img src={AvatarDefault} className="avatar-found"/>
															<span className="profil-name">Name</span>
															<button className="btn bg-yellow">
																<i className="rect"><FontAwesomeIcon icon={faUserPlus} size="xs"/></i>
																<span>Ajouter</span>
															</button>
														</p>
														<p>
															<img src={AvatarDefault} className="avatar-found"/>
															<span className="profil-name">Name</span>
															<button className="btn bg-yellow">
																<i className="rect"><FontAwesomeIcon icon={faUserPlus} size="xs"/></i>
																<span>Ajouter</span>
															</button>
														</p>
														<p>
															<img src={AvatarDefault} className="avatar-found"/>
															<span className="profil-name">Name</span>
															<button className="btn bg-yellow">
																<i className="rect"><FontAwesomeIcon icon={faUserPlus} size="xs"/></i>
																<span>Ajouter</span>
															</button>
														</p>
														<p>
															<img src={AvatarDefault} className="avatar-found"/>
															<span className="profil-name">Name</span>
															<button className="btn bg-yellow">
																<i className="rect"><FontAwesomeIcon icon={faUserPlus} size="xs"/></i>
																<span>Ajouter</span>
															</button>
														</p>
														<p>
															<img src={AvatarDefault} className="avatar-found"/>
															<span className="profil-name">Name</span>
															<button className="btn bg-yellow">
																<i className="rect"><FontAwesomeIcon icon={faUserPlus} size="xs"/></i>
																<span>Ajouter</span>
															</button>
														</p>
														<p>
															<img src={AvatarDefault} className="avatar-found"/>
															<span className="profil-name">Name</span>
															<button className="btn bg-yellow">
																<i className="rect"><FontAwesomeIcon icon={faUserPlus} size="xs"/></i>
																<span>Ajouter</span>
															</button>
														</p>
														<p>
															<img src={AvatarDefault} className="avatar-found"/>
															<span className="profil-name">Name</span>
															<button className="btn bg-yellow">
																<i className="rect"><FontAwesomeIcon icon={faUserPlus} size="xs"/></i>
																<span>Ajouter</span>
															</button>
														</p>
														<p>
															<img src={AvatarDefault} className="avatar-found"/>
															<span className="profil-name">Name</span>
															<button className="btn bg-yellow">
																<i className="rect"><FontAwesomeIcon icon={faUserPlus} size="xs"/></i>
																<span>Ajouter</span>
															</button>
														</p>
														<p>
															<img src={AvatarDefault} className="avatar-found"/>
															<span className="profil-name">Name</span>
															<button className="btn bg-yellow">
																<i className="rect"><FontAwesomeIcon icon={faUserPlus} size="xs"/></i>
																<span>Ajouter</span>
															</button>
														</p>
														<p>
															<img src={AvatarDefault} className="avatar-found"/>
															<span className="profil-name">Name</span>
															<button className="btn bg-yellow">
																<i className="rect"><FontAwesomeIcon icon={faUserPlus} size="xs"/></i>
																<span>Ajouter</span>
															</button>
														</p>
														

													</div>
													<div className="avatar-search-bar">
														<input type="text" placeholder="Rechercher une personne"/><button className="btn bg-white">Rechercher</button>
													</div>
												</div>										
											</div>
										</div>
									</div>
								</div>
						</Popup>
					</div>
				</div>)
			}
			<div className="forum-container">
				<div className="subjectforum">
					<p className="underlined">Go Grind <i><FontAwesomeIcon icon={faQuestionCircle} size="xs"/></i></p>
					<div className="seek">
						<Link to="#">Comment fonctionne GO Grind ?</Link>
						<Link to="#">Comment déposer une requête support ?</Link>
						<Link to="#">Où nous trouver ?</Link>
						<Link to="#">Comment nous contacter ?</Link>
					</div>
				</div>
				<div className="subjectforum">
					<p>Problème Social <i><FontAwesomeIcon icon={faQuestionCircle} size="xs"/></i></p>
				</div>
				<div className="subjectforum">
					<p>Problème de Connexion <i><FontAwesomeIcon icon={faQuestionCircle} size="xs"/></i></p>
				</div>
			</div>
		</div>
	)
}

export default Friend

