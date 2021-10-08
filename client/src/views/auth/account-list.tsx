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

import Origin from "../../assets/image/icons/origin.png"
import Uplay from "../../assets/image/icons/uplay.png"
import Battlenet from "../../assets/image/icons/battlenet.png"
import Epicgame from "../../assets/image/icons/epicgame.png"

import {CREATED_USER} from "../../gql/user/mutation"
import {checkValidEmail} from "../auth/utils"

import Header0 from "../header/header0"
import Infos from "./infos"
import Footer from "../footer/footer"

import "../auth/account.css"
import "../../assets/css/style.css"

type Inputs = {
	password: string,
	email:string
	username: string
}

const StepOne: React.FC = function() {
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
	<div className="account-container">
		<div className="register-field account">			
			<p>Lies tes comptes pour une expérience optimale :</p>
			<div className="account_type">
				<Link to="#" className="discord"><img src={Discord} alt="Discord" width="20" /><span>Discord</span></Link>
				<Link to="#" className="origin"><img src={Origin} alt="Origin" width="20" height="20"/><span>Origin</span></Link>
				<Link to="#" className="uplay"><img src={Uplay} alt="Uplay" width="20" /><span>Uplay</span></Link>
				<Link to="#" className="battlenet"><img src={Battlenet} alt="Battle.net" width="20" /><span>Battle.net</span></Link>
				<Link to="#" className="epicgame"><img src={Epicgame} alt="Epicgame" width="20" /><span>Epic games</span></Link>
			</div>			
		</div>
		<div className="center-width">
			<div className="infos">
				<p className="member"><Link to="/communaute">Je me connecte plus tard</Link></p>							
			</div>
		</div>
		<div className="center-width">										
			<button className="btn bg-red" type="submit">
				Je termine
			</button>
		</div>		
	</div>
	);
}

export default StepOne;
