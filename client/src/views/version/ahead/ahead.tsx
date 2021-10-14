import React from "react"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { useSelector } from "react-redux"

import {Translation} from "../../../lang/translation"
import {RootState} from "../../../reducer"

import home from "../../../assets/image/gogrind-bg.jpg"
import Lead from "../../../assets/image/icons/king.png"
import TournamentInc from "./tournamentInc"

import "../../../assets/css/style.css"
import "../ahead/ahead.css"


const Ahead: React.FC = function() {
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)

  return(
    <div className="ahead">
    	<img src={home} alt="Grid" className="Imgresp"/>
    	<div className="full">
	    	<div className="Left">
	      		<div className="slogan">
	      			<p className="title">{
						Object.keys(userConnectedRedux.user).length > 0 ?
						Translation(userConnectedRedux.user.language).participHome.plateform
						:
						Translation("fr").participHome.plateform
					}</p>
	      			<button className="btn bg-red">
					  {
						Object.keys(userConnectedRedux.user).length > 0 ?
						Translation(userConnectedRedux.user.language).participHome.run
						:
						Translation("fr").participHome.run
						}
					</button>
	      		</div>
      		</div>
      		<div className={Object.keys(userConnectedRedux.user).length > 0 ? "Right" : "d-none"} >
				{Object.keys(userConnectedRedux.user).length > 0 ? <TournamentInc /> : <></>}
				{
					Object.keys(userConnectedRedux.user).length > 0
					?
						<>
							<div className="annonce undertitle">
							<h2>Les meilleurs joueurs de la saison</h2>
							<p>Saison 1</p>
							</div>
							<div className="best-gamer">
								<div className="global">
									<p>Classement mondial (Général)</p>
									<div className="best_content">
										<div>
											<span className="first">1</span>
											<span className="self"><img src={Lead} alt="#" width="15"/></span>
											<span className="middle">Gotaga</span>
											<span>7845 pts</span>
										</div>
										<div>
											<span>2</span>
											<span className="middle">Killser1548</span>
											<span>6928 pts</span>
										</div>
										<div>
											<span>3</span>
											<span className="middle">Squinar</span>
											<span>6751 pts</span>
										</div>
										<div>
											<span>4</span>
											<span className="middle">Shad_BD</span>
											<span>5942 pts</span>
										</div>
										<div>
											<span>5</span>
											<span className="middle">TonioPlancha</span>
											<span>4986 pts</span>
										</div>
										<div>
											<span>6</span>
											<span className="middle">Kat</span>
											<span>4265 pts</span>
										</div>
										<div>
											<span>7</span>
											<span className="middle">Aizalolz</span>
											<span>4265 pts</span>
										</div>
										<div>
											<span>8</span>
											<span className="middle">Hugoteh</span>
											<span>4265 pts</span>
										</div>
									</div>
								</div>
								<div className="global">
									<p>Classement de la semaine</p>
									<div className="best_content">
										<div>
											<span className="first">1</span>
											<span className="self"><img src={Lead} alt="#" width="15"/></span>
											<span className="middle">Gotaga</span>
											<span>7845 pts</span>
										</div>
										<div>
											<span>2</span>
											<span className="middle">Killser1548</span>
											<span>6928 pts</span>
										</div>
										<div>
											<span>3</span>
											<span className="middle">Squinar</span>
											<span>6751 pts</span>
										</div>
										<div>
											<span>4</span>
											<span className="middle">Shad_BD</span>
											<span>5942 pts</span>
										</div>
										<div>
											<span>5</span>
											<span className="middle">TonioPlancha</span>
											<span>4986 pts</span>
										</div>
										<div>
											<span>6</span>
											<span className="middle">Kat</span>
											<span>4265 pts</span>
										</div>
										<div>
											<span>7</span>
											<span className="middle">Aizalolz</span>
											<span>4265 pts</span>
										</div>
										<div>
											<span>8</span>
											<span className="middle">Hugoteh</span>
											<span>4265 pts</span>
										</div>
									</div>
								</div>
							</div>
						</>
					:
					<></>
				}
      		</div>
      	</div>
    </div>
  );
}

export default Ahead
