import React, {useState} from "react"

// import { useSelector } from "react-redux"
import Header from "../header/header"
import Footer from "../footer/footer"
import "../parametre/parametre.css"
// import {RootState} from "../../reducer"
import Sidebar from "./sidebar"
import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Visa from "../../assets/image/card/visa.png"
import Discover from "../../assets/image/card/discover.png"
import Mastercard from "../../assets/image/card/mastercard.png"
import Jcb from "../../assets/image/card/jcb.png"
import Express from "../../assets/image/card/a-express.png"


const Jackpot: React.FC = function() {
	const [showPopup, setShowPopup] = useState<Boolean>(false)
	const [step2, setStep2] = useState<Boolean>(false)
	const onPopup = function(){
		setShowPopup(!showPopup)
	}
	const onStep2 = function(){
		setStep2(!step2)
	}
	// const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
  return(
	<div className="leaderboard settings jackpot">
		<div className="container">
			<Header/>
			<div className="main">
				<div className="containt cagnotte">
					<div className="title-lead">
						<Sidebar />
						<div className="personal">
							<div className="historical">
								<h3>Historique de transactions</h3>
								<div className="total">
									<span>Total</span>
									<span>Date</span>
								</div>
								<p>Pas de transaction</p>
							</div>
							<div className="pay">
								<h3>Solde actuel</h3>
								<div className="credit">
									<span>Vous n'avez pas encore de G-coin</span>
								</div>
								<div className="btn-container">
									<button className="btn bg-red" onClick={onPopup}><i><FontAwesomeIcon icon={faPlus} /></i>Acheter des G-coins</button>
								</div>
								<div className={!showPopup ? "d-none" : "entry popup"}>
									<h3>Ajouter des G-Coin au portemonnaie</h3>
									<div className="step-container">
										<div className="coin-info">
											<span>1G-Coin = 1€</span>
											<div className="add-coin">
												<p>Ajouter des G-Coin au portefeuille de Testostaz</p>
												<p>Les fonds de votre portemonnaie GOGRIND peuvent être utilisés pour les transactions GOGRIND.</p>
											</div>
										</div>
										<div className="step-1">
											<div className="middle">
												<div className="entry-step">
													<span>1</span>
													<span className="separator"></span>
													<span>2</span>
												</div>
												<div className="step-name">
													<span>Information</span>
													<span>Payment</span>
												</div>
											</div>
											<div className="buy-coin">
												<div className="block-coin">
													<p>
														<span>Ajouter 5 G-Coin</span>
														<span>Niveau minimal de fonds</span>
													</p>
													<div className="bg-0">
														<strong>
															5 G-Coin
														</strong>
														<button className="btn bg-red" onClick={onStep2}>Ajouter des G-coin</button>
													</div>
												</div>
												<div className="block-coin">
													<p>
														<span>Ajouter 10 G-Coin</span>
														<span>Niveau minimal de fonds</span>
													</p>
													<div className="bg-0">
														<strong>
															10 G-Coin
														</strong>
														<button className="btn bg-red">Ajouter des G-coin</button>
													</div>
												</div>
											</div>
										</div>
										<div className="step-2 d-none">
											<div className="middle">
												<div className="entry-step">
													<span><FontAwesomeIcon icon={faCheck}/></span>
													<span className="separator"></span>
													<span>2</span>
												</div>
												<div className="step-name">
													<span>Information</span>
													<span>Payment</span>
												</div>
											</div>
											<div className="payment-method">
												<p>Nous acceptons les moyens de paiement sécurisé suivants :</p>
												<div className="card-container">
													<img src={Visa} alt="paiement-visa"/>
													<img src={Mastercard} alt="paiement-mastercard"/>
													<img src={Discover} alt="paiement-discorver"/>
													<img src={Jcb} alt="paiement-jcb"/>
													<img src={Express} alt="paiement-express"/>
												</div>
												<div className="payment-container">
													<form className="payment">
														<div className="select-method">
															<label>Methode de payment</label>
															<select id="card">
															<option>visa</option>
															<option>Mastercard</option>
															<option>Discover</option>
															<option>Jcb</option>
															<option>Express</option>
															</select>
															<div className="input-group">
															<input type="text" placeholder="Nom *"/>
															<input type="e-mail" placeholder="E-mail *"/>
															</div>
															<div className="input-group">
															<input type="text" placeholder="Télephone *"/>
															</div>
															<div className="input-group card-number">
															<input type="text" placeholder="Numéro de carte*"/>
															<label>MM / AA CVC</label>
															</div>
														</div>
														<div className="entry-total">
															<p><span>Entrée</span><span>27$</span></p>
															<p><span>Total</span><span>27$</span></p>
														</div>
													</form>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer/>
		</div>
	</div>
	);
}

export default Jackpot;
