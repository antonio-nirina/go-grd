import React,{useState} from "react"
import { useForm } from "react-hook-form"
import {useMutation} from "@apollo/client"
import {useHistory } from "react-router-dom"
import { Link } from 'react-router-dom'
import { faTwitch } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Google from "../../assets/image/rss/google.png"
import Facebook from "../../assets/image/rss/facebook.png"
import Twitter from "../../assets/image/rss/twitter.png"

import {CREATED_USER} from "../../gql/user/mutation"
import {checkValidEmail} from "../auth/utils"

import Header0 from "../header/header0"
import Footer from "../footer/footer"
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
	const [errorMessage,setErrorMessage] = useState<string>("")

	const onSubmit = async function(data:Inputs){
		const email: string = data.email
		const password: string = data.password
		const username: string = data.username

		if(checkValidEmail(email)) {
			try {
				const userInput = {
					username:username,
					email:email,
					password:password,
				}

				const result = await createdUser({ variables: { userInput: userInput } })
				if (result && result.data) history.push("/login")
			} catch (e) {
				setErrorMessage(e.graphQLErrors[0].message)
			}

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
					<h1>Inscription</h1>
						<div style={{"color":"red","fontSize":"16px"}} >{ errorForm ? "Email not valid" : ""}</div>
						<div style={{"color":"red","fontSize":"16px"}} >{errorMessage ? errorMessage : ""}</div>
						<div className="account_type">
							<Link to="#" className="gg"><img src={Google} alt="Google" width="20" height="20"/><span>Sign in with Google</span></Link>
							<Link to="#" className="fb"><img src={Facebook} alt="Facebook" /><span>Sign in with Facebook</span></Link>
							<Link to="#" className="tw"><img src={Twitter} alt="Twitter" width="20" height="20"/><span>Sign in with Twitter</span></Link>
						</div>
						<form onSubmit={handleSubmit(onSubmit)} className="fieldset">
							<div className="field-container">
								
								<div className="sideby mgt10">
									<input type="text" placeholder = "Ton pseudo" {...register("username",{ required: true })} name="username"/>								
									<input type="email" placeholder = "Ton Email" {...register("email", { required: true })} name="email"/>
								</div>
								<div className="sideby">
									{errors.username && <span style={{"color":"red"}}>Username ne peut être vide</span>}
									{errors.email && <span style={{"color":"red"}}>Email ne peut être vide</span>}
								</div>
								<div className="sideby">								
									<input type="password" placeholder = "Ton mot de passe" {...register("password", { required: true })} name="password"/>
									<input type="password" placeholder = "Confirme ton mot de passe" {...register("password", { required: true })} name="password"/>
								</div>
								<div className="sideby">
									{errors.password && <span style={{"color":"red"}}>Password ne peut être vide</span>}
								</div>
								<div className="center-width">
									<div className="sideby birth">
										<input type="password" placeholder = "Ta date de naissance"/>
									</div>
									<button className="btn bg-red" type="submit">
										Je valide
									</button>
								</div>
							</div>
						</form>
						<div className="center-width field-container">
							<div className="infos">
								<p className="member"><Link to="/communaute">Tu as déjà un compte ?</Link></p>							
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
