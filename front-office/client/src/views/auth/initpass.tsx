import React,{useState} from "react"
import { useForm } from "react-hook-form"
import {useMutation} from "@apollo/client"
import {useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"

import {TokenType,SendToken} from "./utils"
import {sendUserConectedAction} from "./action/userAction"

import Header0 from "../header/header0"
import {checkValidEmail,Siging} from "./utils"
import {Translation} from "../../lang/translation"
import {FORGOT_PASSWORD} from "../../gql/user/mutation"
import Footer from "../footer/footer"
import joystick from "../../assets/image/joystick.png"
import "../auth/initpass.css"
import "../../assets/css/style.css"

type Inputs = {
	email:string
}

const InitPass: React.FC = function() {
	const history = useHistory()
	const dispatch = useDispatch()
	const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()
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
					<h1>
						Réinitialisation mot de passe
						<img src={joystick} alt=""/>
					</h1>
						<div>
							<span style={{"color":"red"}}>{errorForm ? Translation("fr").login.errorForm : ""}</span>
						</div>
						<div className="alert alert-success text-center invisible">Un mail de changement de mot de passe vous a été envoyé</div>
						<form onSubmit={handleSubmit(onSubmit)}>
							<input className="mgt10" type = "email" placeholder = "Ton email" {...register("email", { required: true })} name="email" required/>
							<button className="btn bg-yellow mg15">
								Réinitialiser mon mot de passe
							</button>
						</form>
					</div>
				</div>
			</div>
			<Footer/>
		</div>
	</div>
	)
}

export default InitPass;
