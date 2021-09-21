import React from "react"

import "../../../assets/css/style.css"
import "../service/service.css"
import waggers from "../../../assets/image/wagers.png"
import tournament from "../../../assets/image/classement.png"
import commu from "../../../assets/image/tchat.png"

const Service: React.FC = function() {
	// const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
  return(
    <div className="service">
    	<div className="service-container">
    		<div className="bloc-items light-gray">
    			<div className="service-img light-gray">
    				<img src={waggers} alt="" width="100%"/>
    			</div>
    			<div className="service-modal dark-gray">
    				<div className="undertitle">
    					<h2>Waggers</h2>
    					<span>Affronte des joueurs du monde entier</span>
    					<p>
    						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus euismod ante
							ipsum, id finibus lacus facilisis eget. Curabitur ac fermentum magna. Suspendisse
							dui turpis, suscipit vel odio ut, tincidunt tempus sem. Curabitur pretium sapien a
							enim fringilla elementum. Vestibulum ante ipsum primis in faucibus orci luctus et
							ultrices posuere cubilia curae; Donec metus arcu, sodales sit amet diam id, rutrum
							facilisis orci. Nullam in augue eget odio ultricies bibendum. Proin rutrum libero
							tellus, et pulvinar turpis commodo vel.
    					</p>
    				</div>
    			</div>
    		</div>
    		<div className="bloc-items light-gray">
    			<div className="service-modal dark-gray">
    				<div className="undertitle">
    					<h2>Participer à des tournois / ligues</h2>
    					<span>Joue en ligne contre dʼautres joueurs du monde entier et gagne des prix</span>
    					<p>
    						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus euismod ante
							ipsum, id finibus lacus facilisis eget. Curabitur ac fermentum magna. Suspendisse
							dui turpis, suscipit vel odio ut, tincidunt tempus sem. Curabitur pretium sapien a
							enim fringilla elementum. Vestibulum ante ipsum primis in faucibus orci luctus et
							ultrices posuere cubilia curae; Donec metus arcu, sodales sit amet diam id, rutrum
							facilisis orci. Nullam in augue eget odio ultricies bibendum. Proin rutrum libero
							tellus, et pulvinar turpis commodo vel.
    					</p>
    				</div>
    			</div>
    			<div className="service-img light-gray">
    				<img src={tournament} alt="" width="325"/>
    			</div>
    		</div>
    		<div className="bloc-items light-gray">
    			<div className="service-img light-gray">
    				<img src={commu} alt="" width="325"/>
    			</div>
    			<div className="service-modal dark-gray">
    				<div className="undertitle">
    					<h2>Joue avec la communautés</h2>
    					<span>Des centaines de joueurs en ligne pour trouver</span>
    					<p>
    						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    					</p>
    				</div>
    			</div>
    		</div>
    	</div>
    	<div className="service-container mobile">
    		<div className="bloc-items light-gray">
    			<div className="service-img light-gray">
    				<img src={waggers} alt="" width="100%" />
    			</div>
    			<div className="service-modal dark-gray">
    				<div className="undertitle">
    					<h2>Waggers</h2>
    					<span>Affronte des joueurs du monde entier</span>
    					<p>
    						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus euismod ante
							ipsum, id finibus lacus facilisis eget. Curabitur ac fermentum magna. Suspendisse
							dui turpis, suscipit vel odio ut, tincidunt tempus sem. Curabitur pretium sapien a
							enim fringilla elementum. Vestibulum ante ipsum primis in faucibus orci luctus et
							ultrices posuere cubilia curae; Donec metus arcu, sodales sit amet diam id, rutrum
							facilisis orci. Nullam in augue eget odio ultricies bibendum. Proin rutrum libero
							tellus, et pulvinar turpis commodo vel.
    					</p>
    				</div>
    			</div>
    		</div>
    		<div className="bloc-items light-gray">
    			<div className="service-img light-gray">
    				<img src={tournament} alt="" width="325"/>
    			</div>
    			<div className="service-modal dark-gray">
    				<div className="undertitle">
    					<h2>Participer à des tournois / ligues</h2>
    					<span>Joue en ligne contre dʼautres joueurs du monde entier et gagne des prix</span>
    					<p>
    						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus euismod ante
							ipsum, id finibus lacus facilisis eget. Curabitur ac fermentum magna. Suspendisse
							dui turpis, suscipit vel odio ut, tincidunt tempus sem. Curabitur pretium sapien a
							enim fringilla elementum. Vestibulum ante ipsum primis in faucibus orci luctus et
							ultrices posuere cubilia curae; Donec metus arcu, sodales sit amet diam id, rutrum
							facilisis orci. Nullam in augue eget odio ultricies bibendum. Proin rutrum libero
							tellus, et pulvinar turpis commodo vel.
    					</p>
    				</div>
    			</div>

    		</div>
    		<div className="bloc-items light-gray">
    			<div className="service-img light-gray">
    				<img src={commu} alt="" width="325"/>
    			</div>
    			<div className="service-modal dark-gray">
    				<div className="undertitle">
    					<h2>Joue avec la communautés</h2>
    					<span>Des centaines de joueurs en ligne pour trouver</span>
    					<p>
    						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    					</p>
    				</div>
    			</div>
    		</div>
    	</div>
    </div>
  );
}

export default Service;
