import React,{useState} from "react"
import { useForm } from "react-hook-form"
import {useMutation} from "@apollo/client"
import {useHistory } from "react-router-dom"
import Header0 from "../header/header0"
import {UPDATE_PASSWORD} from "../../gql/user/mutation"
import Footer from "../footer/footer"
import "../auth/initpass.css"
import "../../assets/css/style.css"
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Inputs = {
	newPassword: string,
	cNewPaswd:string,
}

const NewPassword: React.FC = function() {
	const history = useHistory()
	const [passwordValid,setPasswordValid] = useState<boolean>(false)
	const [updatedPasswordUser]  = useMutation(UPDATE_PASSWORD)
	const { register, handleSubmit } = useForm<Inputs>()

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

  return(
	<div className="login initpass">
		<div className="container">
			<Header0/>
			<div className="main">
				<div className="containt">
					<div className="group">
					<h2>
						Mot de passe oublié
					</h2>
						<div>
							<span style={{"color":"red"}}>{passwordValid ? <span style={{"color":"red"}}>Mot de passe invalid</span> : <></>}</span>
						</div>
						<div className="register-field">
							<div className="center-width">
								<span className="major">Changement de mot de passe</span>
							</div>
							<form onSubmit={handleSubmit(onSubmit)} className="fieldset">
								<div className="field-container">
									<div className="input-field code-field">
										<input id="newpass" className="mgt10" type = "text" {...register("newPassword", { required: true })} name="newPassword" />
									</div>
									<div className="input-field code-field">
										<input id="repass" className="mgt10" type = "text" {...register("cNewPaswd", { required: true })} name="cNewPaswd"/>
									</div>
									<div className="input-field code-btn">
										<i><FontAwesomeIcon icon={faArrowLeft} /></i>
										<button className="btn bg-transparent mg15">
											Modifier
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<Footer/>
		</div>
	</div>
	)
}

export default NewPassword;
