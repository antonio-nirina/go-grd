import React,{useState} from "react"
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import {useMutation} from "@apollo/client"

import Header0 from "../header/header0"
import {checkValidEmail,Siging} from "./utils"
import {FR} from "../../lang/lang-fr"
import {LOGIN} from "../../gql/user/auth"

import Footer from "../footer/footer"
import joystick from "../../assets/image/joystick.png"
import IconXbox from "../../assets/image/icon-xbox.png"
import IconPs from "../../assets/image/playstation.png"
import "../auth/login.css"
import "../../assets/css/style.css"

type Inputs = {
	password: string,
	email:string
}

const Login: React.FC = function(props:any) {
	const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()
	const [errorForm,setErrorForm] = useState<boolean>(false)
	const [login]  = useMutation(LOGIN)
	const onSubmit = async function(data:any){
		const email: string = data.email
		const password: string = data.password

		if(checkValidEmail(email)) {
			const result = await login({ variables: { email: email,password:password } })
			console.log(result)
		} else {
			setErrorForm(true)
		}
	}

  return(
	<div className="login">
		<div className="container">
			<Header0/>
			<div className="main">
				<div className="containt">
					<div className="group">
					<h1>
						Connexion
						<img src={joystick} alt=""/>
					</h1>
						<div>
							<span style={{"color":"red"}}>{errorForm ? FR.login.errorForm : ""}</span>
						</div>
						<form onSubmit={handleSubmit(onSubmit)}>
							<input className="mgt10" type = "email" placeholder = "Ton email" {...register("email", { required: true })} name="email" />
							<input type ="password" placeholder ={FR.login.password}  {...register("password", { required: true })} name="password" />
							<button className="btn bg-yellow mg15">
								Se connecter
							</button>
						</form>
						<div className="infos">
							<p className="mb15">Vous n'avez pas encore de compte ? <Link to = "/inscription" title="Inscrivez-vous" className="italic cl-yellow">Inscrivez-vous !</Link></p>
							<p className="mb15"><a href="#" title="Mot de passe oublié ?" className="italic cl-yellow">Mot de passe oublié ?</a></p>
							<div className="other-account">
								<p>Connectez-vous avec votre compte : </p>
								<div><img src={IconXbox} alt="xbox" onClick={Siging} /></div>
								<a href="#" title="Playstation"><img src={IconPs} alt="ps"/></a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer/>
		</div>
	</div>
	)
}

export default Login;
