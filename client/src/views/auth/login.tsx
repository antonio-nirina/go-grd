import React,{useState} from "react"
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import {useMutation} from "@apollo/client"
import {useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { faTwitch,faDiscord } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import {TokenType,SendToken} from "./utils"
import {sendUserConectedAction} from "./action/userAction"

import Header0 from "../header/header0"
import {checkValidEmail} from "./utils"
import {SigingTwitch} from "./twitch"
import {Translation} from "../../lang/translation"
import {LOGIN} from "../../gql/user/auth"
import Footer from "../footer/footer"
import joystick from "../../assets/image/joystick.png"
import "../auth/login.css"
import "../../assets/css/style.css"

const style = {
	"color":"red"
}

type Inputs = {
	password: string,
	email:string
}

const Login: React.FC = function() {
	const history = useHistory()
	const dispatch = useDispatch()
	const { register, handleSubmit } = useForm<Inputs>()
	const [errorForm,setErrorForm] = useState<boolean>(false)
	const [passwd,setPasswd] = useState<boolean>(false)
	const [login]  = useMutation(LOGIN)
	const onSubmit = async function(data:Inputs){
		const email: string 	= data.email
		const password: string 	= data.password

		if(checkValidEmail(email)) {
			try {
				const result = await login({ variables: { email: email,password:password } })

				if (result.data.login) {
					const token:TokenType = {
						access_token:result.data.login,
						refresh_token:"",
						type:""
					}
					SendToken(token)
					dispatch(sendUserConectedAction(result.data.login))
				}

				// const data:Array<string|null> = getDataByToken() ? getDataByToken() : []
				history.push("/")

			} catch(e) {
				console.log(e)
				setPasswd(true)
			}
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
							<span style={style}>{errorForm ? Translation("fr").login.errorForm : ""}</span>
						</div>
						<div>
							{passwd ? <span style={style}>Passord or username invalid </span> : ""}
						</div>
						<form onSubmit={handleSubmit(onSubmit)}>
							<input className="mgt10" type = "email" placeholder = "Ton email" {...register("email", { required: true })} name="email" />
							<input type ="password" placeholder ={Translation("fr").login.password}  {...register("password", { required: true })} name="password" />
							<button className="btn bg-red mg15">
								Se connecter
							</button>
						</form>
						<div className="infos">
							<p className="mb15">Vous n'avez pas encore de compte ? <Link to = "/register" title="Inscrivez-vous" className="italic cl-red">Inscrivez-vous !</Link></p>
							<p className="mb15"><Link to ="/forgot-password" title="Mot de passe oublié ?" className="italic cl-red">Mot de passe oublié ?</Link></p>
							<div className="other-account">
								<p>Connectez-vous avec votre compte : </p>
								<span onClick={SigingTwitch}><i className="platform"><FontAwesomeIcon icon={faTwitch}/></i></span>
								<span onClick={SigingTwitch}><i className="discord"><FontAwesomeIcon icon={faDiscord}/></i></span>
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
