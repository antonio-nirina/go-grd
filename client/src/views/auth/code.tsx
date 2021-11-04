import React,{useState} from "react"
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import {useMutation} from "@apollo/client"
import {useHistory } from "react-router-dom"
import Header0 from "../header/header0"
import {checkValidEmail} from "./utils"
import {Translation} from "../../lang/translation"
import {FORGOT_PASSWORD} from "../../gql/user/mutation"
import Footer from "../footer/footer"
import "../auth/initpass.css"
import "../../assets/css/style.css"
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Inputs = {
	email:string
}

const Code: React.FC = function() {
	const history = useHistory()
	const { register, handleSubmit } = useForm<Inputs>()
	const [errorForm,setErrorForm] = useState<boolean>(false)
	const [forgotPassword]  = useMutation(FORGOT_PASSWORD)
	const onSubmit = async function(data:Inputs){
		const email: string = data.email

		if(checkValidEmail(email)) {
			const result = await forgotPassword({ variables: { email: email} })
			if (result.data.forgotPassword) history.push("/")
		} else {
			setErrorForm(true)
		}
	}

  return(
	<div className="login initpass">
		<div className="container">
			<Header0/>
			<div className="main">
				<div className="containt">
					<div className="group">
					<h2>
						Mot de passe oublié
					</h2>
						<div>
							<span style={{"color":"red"}}>{errorForm ? Translation("fr").login.errorForm : ""}</span>
						</div>
						<div className="register-field">
							<div className="alert alert-success text-center">{!errorForm ? "" : "Le code saisie est erroné"}</div>
							<div className="center-width">
								<span className="major">Un email à été envoyé au jhon3@gmail.com, veuillez recopier le code à 6 chiffres</span>
							</div>
							<form onSubmit={handleSubmit(onSubmit)} className="fieldset">
								<div className="field-container">
									<div className="input-field code-field">
										<label htmlFor="code">Code</label>
										<input id="code" className="mgt10" type = "text" required/>
									</div>
									<div className="input-field code-btn">
										<i><FontAwesomeIcon icon={faArrowLeft} /></i>
										<button className="btn bg-transparent mg15">
											Verifier
										</button>
									</div>
								</div>
							</form>							
						</div>						
					</div>
				</div>
			</div>
			<Footer/>
		</div>
	</div>
	)
}

export default Code;
