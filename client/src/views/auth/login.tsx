import React,{useState,useEffect} from "react"
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import {useMutation} from "@apollo/client"
import {useHistory } from "react-router-dom"
import Loader from "react-loader-spinner"
import { useDispatch } from "react-redux"


import { faXbox } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Google from "../../assets/image/rss/google.png"
import Discord from "../../assets/image/discord-logo.png"
import Ps from "../../assets/image/playstation.png"
import {TokenType,SendToken} from "./utils"
import {sendUserConectedAction} from "./action/userAction"
import Header0 from "../header/header0"
import {checkValidEmail} from "./utils"
import {AuthDiscord} from "./discord"
import {Translation} from "../../lang/translation"
import {LOGIN} from "../../gql/user/auth"
import Footer from "../footer/footer"
import { NameRoutes } from "../commons/route-list"


import "../auth/login.css"
import "../../assets/css/style.css"

const style = {
	"color":"red"
}

interface Inputs{
	password: string
	email:string
}

const Login: React.FC = function() {
	const history = useHistory()
	const dispatch = useDispatch()
	const { register, handleSubmit } = useForm<Inputs>()
	const [errorForm,setErrorForm] = useState<boolean>(false)

	const [passwd,setPasswd] = useState<boolean>(false)
	const [isLoader, setIsLoader] = useState<boolean>(false)
	const [login]  = useMutation(LOGIN)


	const onSubmit = async function(data:Inputs){
		const email: string 	= data.email
		const password: string 	= data.password

		if(checkValidEmail(email)) {
			setIsLoader(true)
			try {
				const result = await login({ variables: { email: email,password:password } })

				if (result.data.login) {
					setIsLoader(false)
					const token:TokenType = {
						access_token:result.data.login,
						refresh_token:"",
						type:""
					}
					SendToken(token)
					dispatch(sendUserConectedAction(result.data.login))
				}
				history.push(NameRoutes.profil)

			} catch(e) {
				console.log(e)
				setIsLoader(false)
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
						Login
					</h1>
						<div>
							<span style={style}>{errorForm ? Translation("fr").login.errorForm : ""}</span>
						</div>
						<div>
							{passwd ? <span style={style}>Password or username invalid </span> : ""}
						</div>
						<div className="register-field">
							<div className="account_type">
								<Link to="#" className="gg">
									<img src={Google} alt="Google" width="20" height="20"/><span>Sign in with Google</span>
								</Link>
								<Link onClick={AuthDiscord} to="#" className="discord">
									<img src={Discord} alt="Discord" width="20"  /><span>Discord</span>
								</Link>
								<Link to="#" className="xbox">
									<i><FontAwesomeIcon icon={faXbox} /></i><span>Sign in with Xbox</span>
								</Link>
								<Link to="#" className="ps"><img src={Ps} alt="Twitter" width="20" />
									<span>Sign in with Playstation</span>
								</Link>
							</div>
							<div className="choice">
								OR
							</div>
							<form onSubmit={handleSubmit(onSubmit)} className="fieldset">
								<div className={isLoader ? "loader-spinner":"d-none"} style={{"textAlign":"center"}}>
									<Loader
										type="Oval"
										color="#dd0000"
									/>
								</div>
								<div className="field-container">
									<div className="input-field">
										<input className="mgt10" type = "email" placeholder = "Email" {...register("email", { required: true })} name="email" />
									</div>
									<div className="input-field">
										<input type ="password" placeholder ={Translation("fr").login.password}  {...register("password", { required: true })} name="password" />
									</div>
									<div className="input-field">
										<button className="btn">
											Se connecter
										</button>
										<p className="ft-size"><Link to ="/forgot-password" title="Mot de passe oublié ?">Mot de passe oublié ?</Link></p>
									</div>
								</div>
							</form>
						</div>
						<div className="center-width field-container">
							<div className="infos">
								<p className="member"><Link to = "/register" title="Pas encore membre ?">Pas encore membre ?</Link></p>
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
