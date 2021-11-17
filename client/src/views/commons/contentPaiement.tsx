import React,{ useState} from "react"
import {useHistory } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from "@fortawesome/free-solid-svg-icons"

import Visa from "../../assets/image/card/visa.png"
import Mastercard from "../../assets/image/card/mastercard.png"
import Discover from "../../assets/image/card/discover.png"
import Jcb from "../../assets/image/card/jcb.png"
import Express from "../../assets/image/card/a-express.png"

type TypePayement = {
	handleClosePayement:Function
}

const ContentPaiement = function({handleClosePayement}:TypePayement) {
	const [showClose, setShowClose] = useState(true)
	const params = useHistory<any>()

	const onShowClose = function(){
    	setShowClose(false)
		handleClosePayement(false)
  	}
    const onNext = function(){
      params.push("/confirmed-join/tournament")
    }

	return (
		<div className={!showClose ? "d-none" : "entry popup"}>
			<h3>Rejoindre Fortnite Daily Cup</h3>
			<div className="step-container">
			<div className="step-1 d-none">
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
				<div className="entry-price">
				<span>Entrée</span>
				<span>€27</span>
				</div>
			</div>
			<div className="step-2">
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
			<div className="next-btn">
				<button className="btn bg-white" onClick={onShowClose}>Annuler</button>
				<button className="btn bg-red" onClick={onNext}>Suivant</button>
			</div>
		</div>
	)
}

export default ContentPaiement
