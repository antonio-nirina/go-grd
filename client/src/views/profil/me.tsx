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
					<h2>
					{
					Object.keys(userConnectedRedux.user).length > 0 ?
					Translation(userConnectedRedux.user.language).profil.set
					:
					Translation("fr").profil.set
					}
					</h2>
					<div className="col">
						<input type="text" placeholder={
							Object.keys(userConnectedRedux.user).length > 0 ?
							Translation(userConnectedRedux.user.language).profil.pseudonym
							:
							Translation("fr").profil.pseudonym
						}/>
					</div>
					<div className="col">
						<input type="text" placeholder={
							Object.keys(userConnectedRedux.user).length > 0 ?
							Translation(userConnectedRedux.user.language).profil.firstname
							:
							Translation("fr").profil.firstname
						}/>
					</div>
					<div className="col">
						<input type="text" placeholder={
							Object.keys(userConnectedRedux.user).length > 0 ?
							Translation(userConnectedRedux.user.language).profil.lastname
							:
							Translation("fr").profil.lastname
						}/>
					</div>
					<div className="col">
						<input type="text" placeholder={Object.keys(userConnectedRedux.user).length > 0 ?
							Translation(userConnectedRedux.user.language).profil.adhesion
							:
							Translation("fr").profil.adhesion}
						/>						
					</div>
					<div className="lang-container col">
						<div className="lang-setting">							
							<div className="lgdrpdwn">																
								<select onChange={onChangeLanguage}>
									<option>FR</option>
									<option>EN</option>
								</select>
							</div>
						</div>
					</div>
					<div className="btn-container">
							<a href="#" className="btn bg-yellow mg15">{Object.keys(userConnectedRedux.user).length > 0 ?
								Translation(userConnectedRedux.user.language).profil.validate
								:
								Translation("fr").profil.validate}
							</a>
						</div>
				</div>
			</div>		
		</div>
	)
}

export default  Me
