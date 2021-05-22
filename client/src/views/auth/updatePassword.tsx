import React,{useState} from "react"
import { useForm } from "react-hook-form"
import {useMutation} from "@apollo/client"
import {useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"

import {TokenType,SendToken} from "./utils"
import {sendUserConectedAction} from "./action/userAction"

import Header0 from "../header/header0"
import {checkValidEmail,Siging} from "./utils"
import {Translation} from "../../lang/translation"
import {FORGOT_PASSWORD} from "../../gql/user/mutation"
import Footer from "../footer/footer"
import joystick from "../../assets/image/joystick.png"
import "../auth/initpass.css"
import "../../assets/css/style.css"

const UpdatePassword: React.FC = function() {
	return (
	<div className="login initpass">
		<div className="container">
			<Header0/>
			<div className="main">
				<div className="containt">
					<div className="group">
					<h1>
						Entrer le nouveau mot de passe
						<img src={joystick} alt=""/>
					</h1>
						<div>
							
						</div>
						<div className="alert alert-success text-center invisible">Nouveau mot de passe enregistré</div>
						<form>
							<input className="mgt10" type = "password" placeholder = "Nouveau mot de passe" name="email" required/>
							<input className="mgt10" type = "password" placeholder = "Confirmer le nouveau mot de passe" name="email" required/>
							<button className="btn bg-yellow mg15">
								Enregistrer le nouveau mot de passe
							</button>
						</form>
					</div>
				</div>
			</div>
			<Footer/>
		</div>
	</div>
	)
}

export default UpdatePassword
