import React,{useState} from "react"
import { useForm } from "react-hook-form"
import {useMutation} from "@apollo/client"
import {useHistory } from "react-router-dom"
import { Link } from 'react-router-dom'
import { faTwitch, faXbox, faDiscord } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Apex from "../../assets/image/jeux/apex.jpg"
import Fortnite from "../../assets/image/jeux/fortnite.jpg"
import Rainbow from "../../assets/image/jeux/rainbow.jpg"
import Rocket from "../../assets/image/jeux/rocket.jpg"
import Vanguard from "../../assets/image/jeux/vanguard.jpg"
import Warzone from "../../assets/image/jeux/warzone.jpg"
import Coldwar from "../../assets/image/jeux/coldwar.jpg"
import Fifa22 from "../../assets/image/jeux/fifa22.jpg"

import Playstation from "../../assets/image/jeux/playstation.jpg"
import Xbox from "../../assets/image/jeux/xbox.jpg"
import Switch from "../../assets/image/jeux/switch.jpg"

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

const GameList: React.FC = function() {
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
	<div>
		<div className="favorite">
			<div className="game-list-container">
				<p>1. Choisis tes jeux favoris</p>			
				<div className="favorite-game">
					<Link to ="#"><img src={Apex} alt="" width="200"/></Link>
					<Link to ="#"><img src={Fortnite} alt="" width="200"/></Link>
					<Link to ="#"><img src={Rainbow} alt="" width="200"/></Link>
					<Link to ="#"><img src={Rocket} alt="" width="200"/></Link>
				</div>
				<div className="favorite-game">
					<Link to ="#"><img src={Vanguard} alt="" width="200"/></Link>
					<Link to ="#"><img src={Warzone} alt="" width="200"/></Link>
					<Link to ="#"><img src={Coldwar} alt="" width="200"/></Link>
					<Link to ="#"><img src={Fifa22} alt="" width="200"/></Link>
				</div>
			</div>
			<div className="platform">
				<p>2. Choisis la plateforme sur laquelle tu veux jouer</p>
				<div className="platform-content">
					<Link to ="#"><img src={Playstation} alt="" width="200"/></Link>
					<Link to ="#"><img src={Xbox} alt="" width="200"/></Link>
					<Link to ="#"><img src={Switch} alt="" width="200"/></Link>
				</div>
			</div>
		</div>
		<div className="infos-text">
			<p>Ne t'inquiète pas, tu pourras mettre à jour cette liste après ton inscription</p>
			<p className="submit-btn"><Link to="#">Valider mes choix</Link></p>							
		</div>		
	</div>
	);
}

export default GameList;
