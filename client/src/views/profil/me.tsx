import React,{useState} from "react"
import {useMutation} from "@apollo/client"
import { useSelector,useDispatch } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCogs  } from "@fortawesome/free-solid-svg-icons"
import { useForm } from "react-hook-form"

import {changeLanguageUserConnected,changeProfilUserConnected} from "../auth/action/userAction"
import {Translation} from "../../lang/translation"
import {RootState} from "../../reducer"
import {UPDATED_USER} from "../../gql/user/mutation"
import {dateStringToDHStringEN,dateStringToDHString} from "../tools/dateConvert"

type Inputs = {
	username: string,
	firstname:string,
	lastname:string
}

const Me : React.FC = function() {
	const dispatch = useDispatch()
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const [language,setLanguage] = useState<string>("")
	const [updatedUser]  = useMutation(UPDATED_USER)
	const { register, handleSubmit } = useForm<Inputs>()
	const onChangeLanguage = function(e:any) {
		if(parseInt(e.target.value) === 1) {
			dispatch(changeLanguageUserConnected(userConnectedRedux.user,"en"))
			setLanguage("en")
		} else {
			setLanguage("fr")
			dispatch(changeLanguageUserConnected(userConnectedRedux.user,"fr"))
		}
		//
	}
	const onSubmit = async function(data:Inputs){
		const username: string = data.username
		const firstname: string = data.firstname
		const lastname: string = data.lastname
		let lang:string = ""
		if (language) {
			lang = language
		}

		const userUpated = {
			username:username,
			firstname:firstname,
			lastname: lastname,
			language:lang,
			email:userConnectedRedux.user.email
		}

		const result = await updatedUser({ variables: { userUpated: userUpated } })
			if (result.data.updatedUser) {
				dispatch(changeProfilUserConnected(result.data.updatedUser))
			}
	}
	return (
		<div className="about-bloc">
			<div className="about-me">
				<div className="field">
					<h2>{
							Object.keys(userConnectedRedux.user).length > 0 ?
							Translation(userConnectedRedux.user.language).profil.set
							:
							Translation("fr").profil.set
						}</h2>
					<form onSubmit={handleSubmit(onSubmit)}>
						<input type="text" placeholder={
								Object.keys(userConnectedRedux.user).length > 0 ?
								Translation(userConnectedRedux.user.language).profil.pseudonym
								:
								Translation("fr").profil.pseudonym
							}
							{...register("username")} name="username"
							defaultValue={userConnectedRedux.user.username}
							/>
						<input type="text" placeholder={
								Object.keys(userConnectedRedux.user).length > 0 ?
								Translation(userConnectedRedux.user.language).profil.firstname
								:
								Translation("fr").profil.firstname
							}
							defaultValue={userConnectedRedux.user.firstname}
							{...register("firstname")} name="firstname"
							/>
						<input type="text" placeholder={
								Object.keys(userConnectedRedux.user).length > 0 ?
								Translation(userConnectedRedux.user.language).profil.lastname
								:
								Translation("fr").profil.lastname
							}
							{...register("lastname")} name="lastname"
							defaultValue={userConnectedRedux.user.lastname}
						/>
						<input type="text" placeholder={Object.keys(userConnectedRedux.user).length > 0 ?
							Translation(userConnectedRedux.user.language).profil.adhesion
							:
							Translation("fr").profil.adhesion}
							defaultValue={userConnectedRedux.user.language === "en" ? dateStringToDHStringEN(userConnectedRedux.user.created) : dateStringToDHString(userConnectedRedux.user.created)}
						/>
						<div className="btn-container">
							<button className="btn bg-yellow mg15">
								{Object.keys(userConnectedRedux.user).length > 0 ?
							Translation(userConnectedRedux.user.language).profil.validate
							:
							Translation("fr").profil.validate}
							</button>
						</div>
					</form>
					<div className="lang-container">
						<div className="lang-setting">
							<i><FontAwesomeIcon className="little-icon" icon={faCogs}/></i>
							<div className="lgdrpdwn">
								<p className="lg-opt">{Object.keys(userConnectedRedux.user).length > 0 ?
							Translation(userConnectedRedux.user.language).profil.lang
							:
							Translation("fr").profil.lang}</p>
								<p className="lg-desc">{Object.keys(userConnectedRedux.user).length > 0 ?
							Translation(userConnectedRedux.user.language).profil.choice
							:
							Translation("fr").profil.choice}</p>
								<select onChange={onChangeLanguage}>
									<option>FR</option>
									<option>EN</option>
								</select>
							</div>
						</div>
						<div className="btn-container">
								<span className="btn bg-yellow mg15">{Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.validate
									:
									Translation("fr").profil.validate}
								</span>
							</div>
						</div>
					</div>
				</div>
		</div>
	)
}

export default  Me
