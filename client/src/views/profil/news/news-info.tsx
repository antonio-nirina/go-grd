import React,{useCallback,useState} from "react"
import { useSelector } from "react-redux"
import {  faStar, faHeart} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import {RootState} from "../../../reducer"
import AvatarDefault from "../../../assets/image/game-tag.png"
import Ts from "../../../assets/image/icons/ts.png"
import Ws from "../../../assets/image/icons/ws.png"

const NewsInfo = function() {
	const [showAct, setShowAct] = useState<boolean>(false)
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	useCallback(() => {
		setShowAct(false)
	},
	[],)
	return (
		<div className="part mur">
			{showAct
				?
				<div className="undertitle">
					<h2>Mur</h2>
					<p>Toutes les dernières actualités de {userConnectedRedux.user.username}</p>
					<div className="content waggers-link">
						<div className="fixed">
							<span>Succès</span>
							<span className="center">Commentaires</span>
							<span className="aright">1-4 &gt;</span>
						</div>
							<div className="row-container">
								<div className="row">
									<div className="note">
										<img src={AvatarDefault} alt="" width="45"/>
										<p>
											<span>Défi</span>
											TonioPlancha a réussi l0 top 1 sur Apex...
										</p>
										<div className="icon">
											<span><i><FontAwesomeIcon icon={faStar} /></i></span>
										</div>
									</div>
									<div className="note">
										<img src={AvatarDefault} alt="" width="45"/>
										<p>
											<span>Défi</span>
											TonioPlancha a réussi l0 top 1 sur Apex...
										</p>
										<div className="icon">
											<span><i><FontAwesomeIcon icon={faStar} /></i></span>
										</div>
									</div>
									<div className="note">
										<img src={AvatarDefault} alt="" width="45"/>
										<p>
											<span>Tournoi</span>
											TonioPlancha a réussi l0 top 1 sur Apex...
										</p>
										<div className="icon">
											<span><img src={Ts} alt="" width="27"/></span>
										</div>
									</div>
									<div className="note">
										<img src={AvatarDefault} alt="" width="45"/>
										<p>
											<span>Wagers</span>
											TonioPlancha a réussi l0 top 1 sur Apex...
										</p>
										<div className="icon">
											<span><img src={Ws} alt="" width="27"/></span>
										</div>
									</div>
									<div className="note">
										<img src={AvatarDefault} alt="" width="45"/>
										<p>
											<span>Défi</span>
											TonioPlancha a réussi l0 top 1 sur Apex...
										</p>
										<div className="icon">
											<span><i><FontAwesomeIcon icon={faHeart} /></i></span>
										</div>
									</div>
								</div>

								<div className="comment-container">
									<div className="comments">
										<img src={AvatarDefault} alt="" width="50"/>
										<p>
											<span>{userConnectedRedux.user.username}</span>
											<input type="text" placeholder="Ajouter un commentaire..." />
										</p>
									</div>
									<div className="comments">
										<img src={AvatarDefault} alt="" width="50"/>
										<p>
											<span>CAPELAJR <i>21 Juillet à 3:54 PM</i></span>
											+ rep Funny Booooooy
										</p>
									</div>
									<div className="comments">
										<img src={AvatarDefault} alt="" width="50"/>
										<p>
											<span>CAPELAJR <i>21 Juillet à 3:54 PM</i></span>
											+ rep Funny Booooooy
										</p>
									</div>
									<div className="comments">
										<img src={AvatarDefault} alt="" width="50"/>
										<p>
											<span>CAPELAJR <i>21 Juillet à 3:54 PM</i></span>
											+ rep Funny Booooooy
										</p>
									</div>
									<div className="comments">
										<img src={AvatarDefault} alt="" width="50"/>
										<p>
											<span>CAPELAJR <i>21 Juillet à 3:54 PM</i></span>
											+ rep Funny Booooooy
										</p>
									</div>
								</div>
							</div>
					</div>
				</div>
				:
				<div></div>
			}


		</div>
	)
}

export default NewsInfo
