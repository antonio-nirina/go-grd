import React,{useState} from "react"

import SideBar from "../header/sidebar"
import Nav from "../header/nav"
import AvatarDefault from "../assets/image/game-tag.png"


const DetailUser : React.FC = function(props:any) {	
	const [showModal, setShowModal] = useState(false)	

	const onShowModal = function(){    	
        setShowModal(true)        
    }    
	return (
		<div className="layout-container">
			<SideBar />
			<div className="content-wrapper">
				<nav className="navbar">
          			<div></div>
                    <Nav />
        		</nav>
				<div className="main-content detailUser">
					<h1>Bannir le joueur : </h1>
					<div className="body-content detailUser">
						<div className="avatarDefault">
							<div className="avatar-image">
								<img src={AvatarDefault} className="avatar" alt=""/>								
							</div>
							<div className="infos-user">
								<h2>Pseudo</h2>
								<p>mail@gmail.com</p>
							</div>							
							<div className="btn-container">
								<button className="btn bg-red" onClick={onShowModal}>Bannir</button>
							</div>
						</div>
						<div className={!showModal ? "popup-modal" :"popup-modal show"} >
							<div className="popup-container">
								<div className="popup-title">Voulez vous bannir <span>Pseudo</span> ?</div>
								<div className="btn-container confirm">
									<button className="btn bg-red">Oui</button>
									<button className="btn bg-white" onClick={onShowModal}>Non</button>
								</div>
							</div>
						</div>					
					</div>
				</div>
			</div>
		</div>
	)
}

export default DetailUser
