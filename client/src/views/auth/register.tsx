import React,{useState} from "react"
import { useForm } from "react-hook-form"
import {useMutation} from "@apollo/client"
import {useHistory } from "react-router-dom"
import { Link } from 'react-router-dom'

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
							{errors.username && <span style={{"color":"red"}}>Username ne peut être vide</span>}
							<input className="mgt10" type="text" placeholder = "Username" {...register("username",{ required: true })} name="username"/>
							{errors.email && <span style={{"color":"red"}}>Email ne peut être vide</span>}
							<input className="mgt10" type="email" placeholder = "Email" {...register("email", { required: true })} name="email"/>
							{errors.password && <span style={{"color":"red"}}>Password ne peut être vide</span>}
							<input className="mgt10" type="password" placeholder = "Mot de passe" {...register("password", { required: true })} name="password"/>
							<button className="btn bg-red mg15" type="submit">
								Inscription
							</button>
						</form>
						<div className="infos">
							<p className="mb15">Vous avez déjà un compte ? <Link className="italic cl-red" to="/communaute">Connectez-vous !</Link></p>
							<div className="other-account">
								<p>Connectez-vous avec votre compte : </p>
								<span><img src={IconXbox} alt=""/></span>
								<span><img src={IconPs} alt=""/></span>
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
