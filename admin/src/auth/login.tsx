import React,{useState} from "react"
import { useForm } from "react-hook-form"
import {useMutation} from "@apollo/client"
import { useDispatch } from "react-redux"

import {sendUserConectedAction} from "./action/userAction"

import {checkValidEmail,TokenType,SendToken} from "./utils"
import joystick from "../assets/image/joystick.png"
import {LOGIN} from "../gql/user/auth"
import "../auth/login.css"

const style = {
	"color":"red"
}

type Inputs = {
	password: string,
	email:string
}

const Login: React.FC = function() {
	const dispatch = useDispatch()
	const { register, handleSubmit } = useForm<Inputs>()
	const [errorForm,setErrorForm] = useState<boolean>(false)
	const [passwd,setPasswd] = useState<boolean>(false)
	const [login]  = useMutation(LOGIN)
	const onSubmit = async function(data:Inputs){
		const email: string = data.email
		const password: string = data.password

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
			<div className="main">
				<div className="containt">
					<div className="group">
					<h1>
						Connexion
						<img src={joystick} alt=""/>
					</h1>
						<div>
							<span style={style}>{errorForm ? "Email n'est pas valide" : ""}</span>
						</div>
						<div>
							{passwd ? <span style={style}>Passord or username invalid </span> : ""}
						</div>
						<form onSubmit={handleSubmit(onSubmit)}>
							<input className="mgt10" type = "email" placeholder = "Ton email" {...register("email", { required: true })} name="email" />
							<input type ="password" placeholder ="Ton mot de passe"  {...register("password", { required: true })} name="password" />
							<button className="btn bg-red mg15">
								Se connecter
							</button>
						</form>

					</div>
				</div>
			</div>
		</div>
	</div>
	)
}

export default Login;
