import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import {useMutation} from "@apollo/client"
import { useSelector,useDispatch } from "react-redux"

import Header from "../header/header"
import Footer from "../footer/footer"
import "../parametre/parametre.css"
import {UPDATED_USER} from "../../gql/user/mutation"
import SocialNetwork from "./socialNetwork"
import {RootState} from "../../reducer"
import Sidebar from "./sidebar"
import {Translation} from "../../lang/translation"
import {changeProfilUserConnected} from "../auth/action/userAction"


type Inputs = {
	email:string,
	firstname:string,
	username:string,
	country:string,
	birtDate:string,
	lastname:string
}

const Settings: React.FC = function() {
	const dispatch = useDispatch()
	const { register, handleSubmit,setValue } 	= useForm<Inputs>()
	const [updatedUser]  = useMutation(UPDATED_USER)
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)

	const onSubmit = async function(data:Inputs){
		const username: string = data.username
		const firstname: string = data.firstname
		const lastname: string = data.lastname
		let lang:string = ""

		const userUpated = {
			username:username,
			firstname:firstname,
			lastname: lastname,
			language:lang,
			email:userConnectedRedux.user.email,
			country:data.country,
			birtDate:data.birtDate
		}
		const result = await updatedUser({ variables: { userUpated: userUpated } })
		if (result.data.updatedUser) {
			dispatch(changeProfilUserConnected(result.data.updatedUser))
		}
	}

	useEffect(() => {
		setValue("email",userConnectedRedux.user.email)
		setValue("firstname",userConnectedRedux.user.firstname)
		setValue("username",userConnectedRedux.user.username)
		setValue("country",userConnectedRedux.user.country)
		setValue("birtDate",userConnectedRedux.user.birtDate)
		setValue("lastname",userConnectedRedux.user.lastname)

	},[setValue,userConnectedRedux])

  return(
	<div className="leaderboard settings">
		<div className="container">
			<Header/>
			<div className="main">
				<div className="containt mes_infos">
					<h2>Paramètres</h2>
					<div className="title-lead">
						<Sidebar />
						<div className="personal">
							<h3>informations personnelles</h3>
							<form className="personal-field" onSubmit={handleSubmit(onSubmit)}>
								<div className="field-container">
									<label htmlFor="email">E-mail</label>
									<input id="email" type="email" {...register("email")} name="email" />
								</div>
								<div className="field-middle">
									<div className="field-container">
										<input type="text" {...register("firstname")} name="firstname" placeholder={Translation(userConnectedRedux.user.language).profil.firstname} />
									</div>
									<div className="field-container">
										<input type="text" {...register("lastname")} name="lastname" placeholder={Translation(userConnectedRedux.user.language).profil.lastname}  />
									</div>
								</div>
								<div className="field-middle">
									<div className="field-container">
										<label htmlFor="pseudo">Pseudo</label>
										<input id="pseudo" type="text" {...register("username")} name="username" />
									</div>
									<div className="field-container">
										<label htmlFor="pays">Pays</label>
										<input id="pays" type="text" {...register("country")} name="country" />
									</div>
								</div>
								<div className="field-container">
									<label htmlFor="date">Date de naissance</label>
									<input type="text" {...register("birtDate")} name="birtDate" />
								</div>
								<h3>Réseaux sociaux</h3>
								<SocialNetwork />
								<div className="btn-container">
									<button type="submit" className="btn bg-red">Enregistre les modifications</button>
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

export default Settings
