import React,{useState} from "react"
import { useForm } from "react-hook-form"
import {useMutation} from "@apollo/client"
import {useHistory } from "react-router-dom"
import { Link } from 'react-router-dom'
import { faTwitch, faXbox, faDiscord } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Google from "../../assets/image/rss/google.png"
import Discord from "../../assets/image/discord-logo.png"
import Ps from "../../assets/image/playstation.png"

import {CREATED_USER} from "../../gql/user/mutation"
import {checkValidEmail} from "../auth/utils"

import Header0 from "../header/header0"
import Infos from "./infos"
import Footer from "../footer/footer"
import "../auth/inscription.css"
import "../../assets/css/style.css"

type Inputs = {
	password: string,
	cpassword:string,
	email:string
	username: string
}

const StepOne: React.FC = function() {
	const history = useHistory()
	const [createdUser]  = useMutation(CREATED_USER)
	const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()
	const [errorForm,setErrorForm] = useState<boolean>(false)
	const [errorCpwd,setErrorCpwd] = useState<boolean>(false)
	const [errorMessage,setErrorMessage] = useState<string>("")

	const onSubmit = async function(data:Inputs){
		const email: string = data.email
		const password: string = data.password
		const username: string = data.username
		const cpassword:string = data.cpassword
		if(cpassword !== password && cpassword && password) setErrorCpwd(true)

		if(checkValidEmail(email) && (cpassword === password && cpassword && password)) {
			try {
				const userInput = {
					username:username,
					email:email,
					password:password,
				}

				const result = await createdUser({ variables: { userInput: userInput } })
				if (result && result.data) history.push("/login")
			} catch (e:any) {
				setErrorMessage(e.graphQLErrors[0].message)
			}

		} else {
			setErrorForm(true)
		}
	}
  return(
	<div>
		<div className="register-field">
			<div className="account_type">
				<Link to="#" className="gg"><img src={Google} alt="Google" width="20" height="20"/><span>Sign in with Google</span></Link>
				<Link to="#" className="discord"><img src={Discord} alt="Discord" width="20" /><span>Discord</span></Link>
				<Link to="#" className="xbox"><i><FontAwesomeIcon icon={faXbox} /></i><span>Sign in with Xbox</span></Link>
				<Link to="#" className="ps"><img src={Ps} alt="Twitter" width="20" /><span>Sign in with Playstation</span></Link>
			</div>
			<div className="choice">
				OR
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className="fieldset">
				<div className="field-container">
					<span className="bold">Remplis tes informations</span>
					<div className="input-field">																							
						{errors.email && <span style={{"color":"red","fontSize":"11px"}}>Email ne peut être vide</span>}
						<input type="email" placeholder = "Ton Email" {...register("email", { required: true })} name="email"/>
					</div>
					<div className="input-field">																							
						{errors.username && <span style={{"color":"red","fontSize":"11px"}}>Pseudo ne peut être vide</span>}
						<input type="text" placeholder = "Ton pseudo" {...register("username",{ required: true })} name="username"/>																																				
					</div>
					<div className="input-field">																							
						<input type="password" placeholder = "Ton mot de passe" {...register("password", { required: true })} name="password"/>
						{errors.password && <span style={{"color":"red","fontSize":"11px"}}>Password ne peut être vide</span>}	
						<input type="password" placeholder = "Confirme ton mot de passe" {...register("cpassword", { required: true })} name="cpassword"/>
						{errors.cpassword && <span style={{"color":"red","fontSize":"11px"}}>Ce champ ne peut être vide</span>}
						{errorCpwd ? <span style={{"color":"red","fontSize":"11px"}}>Password n'est pas compatible</span> : <></>}
					</div>
					<div className="center-width pad15">
						<input type="checkbox" className="check"/><span className="major">Je confirme avoir plus de 13 ans.*</span>
					</div>
					<div className="center-width">										
						<button className="btn bg-red" type="submit">
							Je valide
						</button>
					</div>
				</div>
			</form>
		</div>
		<div className="center-width field-container">
			<div className="infos">
				<p className="member"><Link to="/communaute">Tu as déjà un compte ?</Link></p>							
			</div>
		</div>
	</div>
	);
}

export default StepOne;
