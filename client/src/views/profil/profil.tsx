import React,{useEffect} from "react"
// import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'

import fr from "../../assets/image/fr.png"
import ps from "../../assets/image/playstation.png"
import AvatarDefault from "../../assets/image/game-tag.png"
// import Popup from "reactjs-popup"
import { faXbox, faPlaystation, faTwitch, faYoutube, faFacebook, faTwitter, faDiscord } from "@fortawesome/free-brands-svg-icons"
import { faChartBar, faGamepad, faStar, faUsers} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Header from "../header/header"
import Join from "../join/join"
import Footer from "../footer/footer"
import "./profil.css"
import Avatar from "./avatar"
import "../../assets/css/style.css"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import 'reactjs-popup/dist/index.css'
// import {Translation} from "../../lang/translation"

// import {RootState} from "../../reducer"


const Profile: React.FC = function() {
	//const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	useEffect(() => {
		const params = window.location.search

		if (window.opener) {
			window.opener.postMessage(params,"")
		   	window.close()
		}
	},[])


  return(
	<div className="profil connected">
      <div className="container">
	      <Header/>
	      <div className="main-content">
	      	<div className="main-pro">
	      		<div className="gamer-stats">
		      		<div className="wall-bloc" id="wall">
			      		<div className="wall" id="wall">
			      			<Avatar />
			      		</div>
			      	</div>
			      	<div className="statistique">
			      		<div className="stat-content">
				      		<div className="start-game">
				      			<div className="start">
				      				<img src="https://i.ibb.co/TKD3yZT/apex-legends.webp" alt="apex-legends" />
				      				<span><FontAwesomeIcon icon={faChartBar} />Statistiques</span>
				      			</div>
				      		</div>
				      		<div className="flexbox">
				      			<div className="flex-items">
				      				<p>92 <span>Parties</span></p>
				      				<p>32 <span>Top 1</span></p>
				      				<p>35% <span>Taux de victoires</span></p>
				      			</div>
				      			<div className="flex-items">
				      				<p>L L W L<span>Score recents</span></p>
				      				<p>2.75<span>K/D</span></p>
				      				<p>923<span>Placement FR</span></p>
				      			</div>
				      			<div className="flex-items">
				      				<p>Ligue<span>-</span></p>
				      				<p>Placement<span>-</span></p>
				      				<p>Score<span>-</span></p>
				      			</div>
				      		</div>
				      		<div className="with-stat">			      			
			      				<p>Fifa 21 <span><i><FontAwesomeIcon icon={faChartBar} /></i> statistiques</span></p>
			      				<p>Fifa 21 <span><i><FontAwesomeIcon icon={faChartBar} /></i> statistiques</span></p>
			      				<p>Fifa 21 <span><i><FontAwesomeIcon icon={faChartBar} /></i> statistiques</span></p>
			      				<p>Fifa 21 <span><i><FontAwesomeIcon icon={faChartBar} /></i> statistiques</span></p>			      			
			      			</div>
				      	</div>			      		
			      	</div>
			      	<div className="media">
				      	<div className="teamname">
				      		<div className="bloc-team-mate">
				      			<div className="avatar-name">
				      				<div>
				      					<img src={AvatarDefault} alt="" className="avatar-lead"/>
				      				</div>
				      				<div>
				      					<span>nomdeteam</span>
				      				</div>
				      			</div>
				      			<div className="setting-accounts">
					      			<div>
					      				<img src={ps} alt=""/>
					      			</div>
					      			<div>
					      				<img src={fr} alt=""/>
					      			</div>
					      		</div>
				      			<div className="team-number">
				      				<span>25 <i><FontAwesomeIcon icon={faUsers} /></i></span>
				      			</div>
				      		</div>				      		
				      	</div>
				      	<div className="social">
		      				<i><FontAwesomeIcon icon={faTwitch} /></i>
		      				<i><FontAwesomeIcon icon={faYoutube} /></i> 				
		      				<i><FontAwesomeIcon icon={faFacebook} /></i>
		      				<i><FontAwesomeIcon icon={faTwitter} /></i>
		      				<i><FontAwesomeIcon icon={faDiscord} /></i>		      				
				      	</div>
				    </div>
			      	<div className="part">
						<div className="undertitle">
							<h2>Tournois</h2>
							<p>Derniers résultats en Wagers</p>
						</div>
						<div className="content waggers-link">
							<div className="clear"></div>
							<Link to ="waggers-game">
								<div className="apex block dark-red">
									<div>
										<p className="legend">Apex Legends Daily Cup</p><i className="iconGame"><FontAwesomeIcon icon={faXbox}/></i>
									</div>
									<div className="info">
										<p className="price inblock"><i className="sprite cup"></i><span>100€ Cash Prize</span></p>
										<p className="date inblock"><i className="sprite calendar"></i><span>02/04/2021 - 5:00 PM</span></p>
									</div>
								</div>
							</Link>
							<Link to ="#">
								<div className="apex block dark-red">
									<div><p className="legend">Fortnite Weekly Cup</p><i className="iconGame"><FontAwesomeIcon icon={faGamepad}/></i></div>
									<div className="info">
										<p className="price inblock"><i className="sprite cup"></i><span>50€ Cash Prize</span></p>
										<p className="date inblock"><i className="sprite calendar"></i><span>03/04/2021 - 5:00 PM</span></p>
									</div>
								</div>
							</Link>
							<Link to ="#">
								<div className="apex block light-green">
									<div><p className="legend">Rocket League Champions</p><i className="iconGame"><FontAwesomeIcon icon={faPlaystation}/></i></div>
									<div className="info">
										<p className="price inblock"><i className="sprite ticket"></i><span>5€ Cash Prize</span></p>
										<p className="price inblock"><i className="sprite cup"></i><span>500€ Cash Prize</span></p>
										<p className="date inblock"><i className="sprite calendar"></i><span>04/04/2021 - 7:30 PM</span></p>
									</div>
								</div>
							</Link>
							<Link to ="#">
								<div className="apex block dark-red">
									<div>
										<p className="legend">Warzone Xbox Daily</p><i className="iconGame"><FontAwesomeIcon icon={faXbox}/></i>
									</div>
									<div className="info">
										<p className="price inblock"><i className="sprite cup"></i><span>100€ Cash Prize</span></p>
										<p className="date inblock"><i className="sprite calendar"></i><span>02/04/2021 - 5:00 PM</span></p>
									</div>
								</div>
							</Link>
						</div>								
					</div>
					<div className="part">
						<div className="undertitle">
							<h2>Wagers</h2>
							<p>Derniers résultats de GAMETAG</p>
						</div>
						<div className="content waggers-link">
							<div className="clear"></div>
							<Link to ="waggers-game">
								<div className="apex block dark-red">
									<div>
										<p className="legend">Apex Legends Daily Cup</p><i className="iconGame"><FontAwesomeIcon icon={faXbox}/></i>
									</div>
									<div className="info">
										<p className="price inblock"><i className="sprite cup"></i><span>100€ Cash Prize</span></p>
										<p className="date inblock"><i className="sprite calendar"></i><span>02/04/2021 - 5:00 PM</span></p>
									</div>
								</div>
							</Link>
							<Link to ="#">
								<div className="apex block dark-red">
									<div><p className="legend">Fortnite Weekly Cup</p><i className="iconGame"><FontAwesomeIcon icon={faGamepad}/></i></div>
									<div className="info">
										<p className="price inblock"><i className="sprite cup"></i><span>50€ Cash Prize</span></p>
										<p className="date inblock"><i className="sprite calendar"></i><span>03/04/2021 - 5:00 PM</span></p>
									</div>
								</div>
							</Link>
							<Link to ="#">
								<div className="apex block light-green">
									<div><p className="legend">Rocket League Champions</p><i className="iconGame"><FontAwesomeIcon icon={faPlaystation}/></i></div>
									<div className="info">
										<p className="price inblock"><i className="sprite ticket"></i><span>5€ Cash Prize</span></p>
										<p className="price inblock"><i className="sprite cup"></i><span>500€ Cash Prize</span></p>
										<p className="date inblock"><i className="sprite calendar"></i><span>04/04/2021 - 7:30 PM</span></p>
									</div>
								</div>
							</Link>
							<Link to ="#">
								<div className="apex block dark-red">
									<div>
										<p className="legend">Warzone Xbox Daily</p><i className="iconGame"><FontAwesomeIcon icon={faXbox}/></i>
									</div>
									<div className="info">
										<p className="price inblock"><i className="sprite cup"></i><span>100€ Cash Prize</span></p>
										<p className="date inblock"><i className="sprite calendar"></i><span>02/04/2021 - 5:00 PM</span></p>
									</div>
								</div>
							</Link>
						</div>								
					</div>		      					
			    </div>
			    <div className="mon-mur">
			    	<div className="wall-title">
			    		<div className="wall-bar-title">
			    			<p>Mon Mur</p>
			    			<button className="btn bg-red">Filter</button>
			    		</div>
			    		<div className="wall-info">
			    			<div className="flexbox-items">
			    				<img src={AvatarDefault} alt=""/>
			    				<div className="tag-info">
			    					<div>
			    						<p className="upper">Défi</p>
			    						<span><strong>GameTag</strong> a réussi le défi Survivre au Goulag...</span>			    						
			    					</div>
			    					<div className="filter-right">
			    						<span><i><FontAwesomeIcon icon={faStar} /></i></span>
			    					</div>
			    				</div>
			    			</div>			    			
			    		</div>
			    		<div className="wall-info">
			    			<div className="flexbox-items">
			    				<img src={AvatarDefault} alt=""/>
			    				<div className="tag-info">
			    					<div>
			    						<p className="upper">Défi</p>
			    						<span><strong>GameTag</strong> a réussi le défi Survivre au Goulag...</span>			    						
			    					</div>
			    					<div className="filter-right">
			    						<span><i><FontAwesomeIcon icon={faStar} /></i></span>
			    					</div>
			    				</div>
			    			</div>			    			
			    		</div>
			    		<div className="wall-info">
			    			<div className="flexbox-items">
			    				<img src={AvatarDefault} alt=""/>
			    				<div className="tag-info">
			    					<div>
			    						<p className="upper">Défi</p>
			    						<span><strong>GameTag</strong> a réussi le défi Survivre au Goulag...</span>			    						
			    					</div>
			    					<div className="filter-right">
			    						<span><i><FontAwesomeIcon icon={faStar} /></i></span>
			    					</div>
			    				</div>
			    			</div>			    			
			    		</div>
			    		<div className="wall-info">
			    			<div className="flexbox-items">
			    				<img src={AvatarDefault} alt=""/>
			    				<div className="tag-info">
			    					<div>
			    						<p className="upper">Défi</p>
			    						<span><strong>GameTag</strong> a réussi le défi Survivre au Goulag...</span>			    						
			    					</div>
			    					<div className="filter-right">
			    						<span><i><FontAwesomeIcon icon={faStar} /></i></span>
			    					</div>
			    				</div>
			    			</div>			    			
			    		</div>
			    		<div className="wall-info">
			    			<div className="flexbox-items">
			    				<img src={AvatarDefault} alt=""/>
			    				<div className="tag-info">
			    					<div>
			    						<p className="upper">Défi</p>
			    						<span><strong>GameTag</strong> a réussi le défi Survivre au Goulag...</span>			    						
			    					</div>
			    					<div className="filter-right">
			    						<span><i><FontAwesomeIcon icon={faStar} /></i></span>
			    					</div>
			    				</div>
			    			</div>			    			
			    		</div>
			    		<div className="wall-info">
			    			<div className="flexbox-items">
			    				<img src={AvatarDefault} alt=""/>
			    				<div className="tag-info">
			    					<div>
			    						<p className="upper">Défi</p>
			    						<span><strong>GameTag</strong> a réussi le défi Survivre au Goulag...</span>			    						
			    					</div>
			    					<div className="filter-right">
			    						<span><i><FontAwesomeIcon icon={faStar} /></i></span>
			    					</div>
			    				</div>
			    			</div>			    			
			    		</div>
			    		<div className="wall-info">
			    			<div className="flexbox-items">
			    				<img src={AvatarDefault} alt=""/>
			    				<div className="tag-info">
			    					<div>
			    						<p className="upper">Défi</p>
			    						<span><strong>GameTag</strong> a réussi le défi Survivre au Goulag...</span>			    						
			    					</div>
			    					<div className="filter-right">
			    						<span><i><FontAwesomeIcon icon={faStar} /></i></span>
			    					</div>
			    				</div>
			    			</div>			    			
			    		</div>
			    		<div className="wall-info">
			    			<div className="flexbox-items">
			    				<img src={AvatarDefault} alt=""/>
			    				<div className="tag-info">
			    					<div>
			    						<p className="upper">Défi</p>
			    						<span><strong>GameTag</strong> a réussi le défi Survivre au Goulag...</span>			    						
			    					</div>
			    					<div className="filter-right">
			    						<span><i><FontAwesomeIcon icon={faStar} /></i></span>
			    					</div>
			    				</div>
			    			</div>			    			
			    		</div>
			    		<div className="wall-info">
			    			<div className="flexbox-items">
			    				<img src={AvatarDefault} alt=""/>
			    				<div className="tag-info">
			    					<div>
			    						<p className="upper">Défi</p>
			    						<span><strong>GameTag</strong> a réussi le défi Survivre au Goulag...</span>			    						
			    					</div>
			    					<div className="filter-right">
			    						<span><i><FontAwesomeIcon icon={faStar} /></i></span>
			    					</div>
			    				</div>
			    			</div>			    			
			    		</div>
			    		<div className="wall-info">
			    			<div className="flexbox-items">
			    				<img src={AvatarDefault} alt=""/>
			    				<div className="tag-info">
			    					<div>
			    						<p className="upper">Défi</p>
			    						<span><strong>GameTag</strong> a réussi le défi Survivre au Goulag...</span>			    						
			    					</div>
			    					<div className="filter-right">
			    						<span><i><FontAwesomeIcon icon={faStar} /></i></span>
			    					</div>
			    				</div>
			    			</div>			    			
			    		</div>
			    		<div className="wall-info">
			    			<div className="flexbox-items">
			    				<img src={AvatarDefault} alt=""/>
			    				<div className="tag-info">
			    					<div>
			    						<p className="upper">Défi</p>
			    						<span><strong>GameTag</strong> a réussi le défi Survivre au Goulag...</span>			    						
			    					</div>
			    					<div className="filter-right">
			    						<span><i><FontAwesomeIcon icon={faStar} /></i></span>
			    					</div>
			    				</div>
			    			</div>			    			
			    		</div>
			    		<div className="wall-info">
			    			<div className="flexbox-items">
			    				<img src={AvatarDefault} alt=""/>
			    				<div className="tag-info">
			    					<div>
			    						<p className="upper">Défi</p>
			    						<span><strong>GameTag</strong> a réussi le défi Survivre au Goulag...</span>			    						
			    					</div>
			    					<div className="filter-right">
			    						<span><i><FontAwesomeIcon icon={faStar} /></i></span>
			    					</div>
			    				</div>
			    			</div>			    			
			    		</div>
			    		<div className="wall-info">
			    			<div className="flexbox-items">
			    				<img src={AvatarDefault} alt=""/>
			    				<div className="tag-info">
			    					<div>
			    						<p className="upper">Défi</p>
			    						<span><strong>GameTag</strong> a réussi le défi Survivre au Goulag...</span>			    						
			    					</div>
			    					<div className="filter-right">
			    						<span><i><FontAwesomeIcon icon={faStar} /></i></span>
			    					</div>
			    				</div>
			    			</div>			    			
			    		</div>
			    		<div className="wall-info">
			    			<div className="flexbox-items">
			    				<img src={AvatarDefault} alt=""/>
			    				<div className="tag-info">
			    					<div>
			    						<p className="upper">Défi</p>
			    						<span><strong>GameTag</strong> a réussi le défi Survivre au Goulag...</span>			    						
			    					</div>
			    					<div className="filter-right">
			    						<span><i><FontAwesomeIcon icon={faStar} /></i></span>
			    					</div>
			    				</div>
			    			</div>			    			
			    		</div>
			    		<div className="wall-info">
			    			<div className="flexbox-items">
			    				<img src={AvatarDefault} alt=""/>
			    				<div className="tag-info">
			    					<div>
			    						<p className="upper">Défi</p>
			    						<span><strong>GameTag</strong> a réussi le défi Survivre au Goulag...</span>			    						
			    					</div>
			    					<div className="filter-right">
			    						<span><i><FontAwesomeIcon icon={faStar} /></i></span>
			    					</div>
			    				</div>
			    			</div>			    			
			    		</div>
			    		<div className="wall-info">
			    			<div className="flexbox-items">
			    				<img src={AvatarDefault} alt=""/>
			    				<div className="tag-info">
			    					<div>
			    						<p className="upper">Défi</p>
			    						<span><strong>GameTag</strong> a réussi le défi Survivre au Goulag...</span>			    						
			    					</div>
			    					<div className="filter-right">
			    						<span><i><FontAwesomeIcon icon={faStar} /></i></span>
			    					</div>
			    				</div>
			    			</div>			    			
			    		</div>
			    		<div className="wall-info">
			    			<div className="flexbox-items">
			    				<img src={AvatarDefault} alt=""/>
			    				<div className="tag-info">
			    					<div>
			    						<p className="upper">Défi</p>
			    						<span><strong>GameTag</strong> a réussi le défi Survivre au Goulag...</span>			    						
			    					</div>
			    					<div className="filter-right">
			    						<span><i><FontAwesomeIcon icon={faStar} /></i></span>
			    					</div>
			    				</div>
			    			</div>			    			
			    		</div>
			    		<div className="wall-info">
			    			<div className="flexbox-items">
			    				<img src={AvatarDefault} alt=""/>
			    				<div className="tag-info">
			    					<div>
			    						<p className="upper">Défi</p>
			    						<span><strong>GameTag</strong> a réussi le défi Survivre au Goulag...</span>			    						
			    					</div>
			    					<div className="filter-right">
			    						<span><i><FontAwesomeIcon icon={faStar} /></i></span>
			    					</div>
			    				</div>
			    			</div>			    			
			    		</div>
			    	</div>
			    </div>
	      	</div>
	      </div>
	      <Join/>
	      <Footer/>
	  </div>
    </div>
  )
}

export default Profile;
