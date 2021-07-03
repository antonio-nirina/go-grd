import React,{useState} from "react"
import { useForm } from "react-hook-form"
import {useMutation} from "@apollo/client"
import {useHistory } from "react-router-dom"

import Header0 from "../header/header0"
import {UPDATE_PASSWORD} from "../../gql/user/mutation"
import Footer from "../footer/footer"
import joystick from "../../assets/image/joystick.png"
import "../auth/initpass.css"
import "../../assets/css/style.css"

type Inputs = {
	newPassword: string,
	cNewPaswd:string,
}

const UpdatePassword: React.FC = function() {
	const history = useHistory()
	const [passwordValid,setPasswordValid] = useState<boolean>(false)
	const [updatedPasswordUser]  = useMutation(UPDATE_PASSWORD)
	const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()

	const onSubmit = async function(data:Inputs){
		const password: string 	= data.newPassword
		const cPassword: string = data.cNewPaswd
		if (cPassword === password) {
			const params = history.location.search
			const token = params.split("=")[1]
			const result = await updatedPasswordUser({ variables: { token: token,newPassword:data.cNewPaswd } })
			if (result.data.updatedPasswordUser)  history.push("/login")
		}  else {
			setPasswordValid(true)
		}
	}
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
						{passwordValid ? <span style={{"color":"red"}}>Mot de passe invalid</span> : <></>}
						<form onSubmit={handleSubmit(onSubmit)}>
							<input className="mgt10" type = "password" placeholder = "Nouveau mot de passe" {...register("newPassword", { required: true })} name="newPassword" required/>
							<input className="mgt10" type = "password" placeholder = "Confirmer le nouveau mot de passe" {...register("cNewPaswd", { required: true })} name="cNewPaswd" required/>
							<button className="btn bg-red mg15">
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
