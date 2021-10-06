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
						<div className="step">
							<Link to="#" className="current">Mes infos <span></span></Link>
							<Link to="#">Mes jeux <span></span></Link>
							<Link to="#">Mes comptes <span></span></Link>
						</div>
						<Infos />						
					</div>
				</div>
			</div>
			<Footer/>
		</div>
	</div>
	);
}

export default Register;
