import React from "react"
import { useSelector,useDispatch } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCogs  } from "@fortawesome/free-solid-svg-icons"

import {changeLanguageUserConnected} from "../auth/action/userAction"
import {Translation} from "../../lang/translation"
import {RootState} from "../../reducer"

const Me : React.FC = function() {
	const dispatch = useDispatch()
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const onChangeLanguage = function(e:any) {
		if(parseInt(e.target.value) === 1) {
			dispatch(changeLanguageUserConnected(userConnectedRedux.user,"en"))
		} else {
			dispatch(changeLanguageUserConnected(userConnectedRedux.user,"fr"))
		}
		//
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
				<input type="text" placeholder={
						Object.keys(userConnectedRedux.user).length > 0 ?
						Translation(userConnectedRedux.user.language).profil.pseudonym
						:
						Translation("fr").profil.pseudonym
					}/>
				<input type="text" placeholder={
						Object.keys(userConnectedRedux.user).length > 0 ?
						Translation(userConnectedRedux.user.language).profil.firstname
						:
						Translation("fr").profil.firstname
					}/>
				<input type="text" placeholder={
					Object.keys(userConnectedRedux.user).length > 0 ?
					Translation(userConnectedRedux.user.language).profil.lastname
					:
					Translation("fr").profil.lastname
				}/>
				<input type="text" placeholder={Object.keys(userConnectedRedux.user).length > 0 ?
						Translation(userConnectedRedux.user.language).profil.adhesion
						:
						Translation("fr").profil.adhesion}/>
						<div className="btn-container">
							<a href="#" className="btn bg-yellow mg15">{Object.keys(userConnectedRedux.user).length > 0 ?
						Translation(userConnectedRedux.user.language).profil.validate
						:
						Translation("fr").profil.validate}</a>
						</div>
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
				</div>
			</div>
		</div>
	</div>
	)
}

export default  Me
