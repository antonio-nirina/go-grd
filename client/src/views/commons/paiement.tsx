import React,{useState} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import { faChevronCircleUp, faCheck } from "@fortawesome/free-solid-svg-icons"
import Visa from "../../assets/image/card/visa.png"
import Mastercard from "../../assets/image/card/mastercard.png"
import Discover from "../../assets/image/card/discover.png"
import Jcb from "../../assets/image/card/jcb.png"
import Express from "../../assets/image/card/a-express.png"

const Paiement = function() {
	const [showClose, setShowClose] = useState(false)
    const [next, setNext] = useState(false)
	const onShowClose = function(){
    	setShowClose(!showClose)
  	}
    const onNext = function(){
      setNext(!next)
    }
	return (
		<div className="entry popup">
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
					<img src={Visa} alt=""/>
					<img src={Mastercard} alt=""/>
					<img src={Discover} alt=""/>
					<img src={Jcb} alt=""/>
					<img src={Express} alt=""/>
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

export default Paiement
