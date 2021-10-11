import React,{useState} from "react"
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

type Inputs = {
	email:string
}

const InitPass: React.FC = function() {
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
						Réinitialisation mot de passe
					</h2>
						<div>
							<span style={{"color":"red"}}>{errorForm ? Translation("fr").login.errorForm : ""}</span>
						</div>
						<div className="register-field">
							<div className="alert alert-success text-center invisible">{!errorForm ? "" : "Un mail de changement de mot de passe vous a été envoyé"}</div>
							<div className="center-width">
								<span className="major">Entre ton email afin de réinitialiser ton mot de passe</span>
							</div>
							<form onSubmit={handleSubmit(onSubmit)} className="fieldset">
								<div className="field-container">
									<div className="input-field">
										<input className="mgt10" type = "email" placeholder = "Ton email" {...register("email", { required: true })} name="email" required/>
									</div>
									<div className="input-field">
										<button className="btn bg-red mg15">
											Réinitialiser mon mot de passe
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

export default InitPass;
