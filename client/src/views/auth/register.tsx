import React,{useState} from "react"
import { useForm } from "react-hook-form"
import {useMutation} from "@apollo/client"
import {useHistory } from "react-router-dom"

import {CREATED_USER} from "../../gql/user/mutation"
import {checkValidEmail} from "../auth/utils"

import Header0 from "../header/header0"
import Footer from "../footer/footer"
import joystick from "../../assets/image/joystick.png"
import IconXbox from "../../assets/image/icon-xbox.png"
import IconPs from "../../assets/image/playstation.png"
import "../auth/inscription.css"
import "../../assets/css/style.css"

type Inputs = {
	password: string,
	email:string
	username: string
}

const Register: React.FC = function() {
	const history = useHistory()
	const [createdUser]  = useMutation(CREATED_USER)
	const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()
	const [errorForm,setErrorForm] = useState<boolean>(false)

	const onSubmit = async function(data:Inputs){
		const email: string = data.email
		const password: string = data.password
		const username: string = data.username

		if(checkValidEmail(email)) {
			const userInput = {
				username:username,
				email:email,
				password:password,
			}
			console.log("e", userInput)
			const result = await createdUser({ variables: { userInput: userInput } })
			if (result && result.data) history.push("/login")
		} else {
			setErrorForm(true)
		}
	}
  return(
	<div className="inscription">
		<div className="container">
			<Header0/>
			<div className="main">
				<div className="containt">
					<div className="group">
					<h1>Inscription <img src={joystick} alt=""/></h1>
						<div style={{"color":"red"}} >{ errorForm ? "Email not valid" : ""}</div>
						<form onSubmit={handleSubmit(onSubmit)}>
							<input className="mgt10" type="text" placeholder = "Username" {...register("username")} name="username"/>
							<input className="mgt10" type="email" placeholder = "Email" {...register("email", { required: true })} name="email"/>
							<input className="mgt10" type="password" placeholder = "Mot de passe" {...register("password", { required: true })} name="password"/>
							<button className="btn bg-yellow mg15" type="submit">
								Inscription
							</button>
						</form>
						<div className="infos">
							<p className="mb15">Vous avez déjà un compte ? <a href="#" title="Connectez-vous" className="italic cl-yellow">Connectez-vous !</a></p>
							<div className="other-account">
								<p>Connectez-vous avec votre compte : </p>
								<a href="#" title="Xbox"><img src={IconXbox} alt=""/></a>
								<a href="#" title="Playstation"><img src={IconPs} alt=""/></a>
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

export default Register;
