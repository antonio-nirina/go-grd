import React from "react"
import Popup from "reactjs-popup"
// import { Carousel } from 'react-responsive-carousel'
import { useSelector } from "react-redux"

import {Translation} from "../../lang/translation"
import {RootState} from "../../reducer"

const AccountGame : React.FC = function() {
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	return (
<div className="account-game" id="account">
			<h2>{Object.keys(userConnectedRedux.user).length > 0 ?
					Translation(userConnectedRedux.user.language).profil.account
					:
					Translation("fr").profil.account}</h2>
			<div className="itemGame">
				<p className="img-account"><img src="https://i.ibb.co/BB3Bjwq/discord.png" alt="discord" width="45" height="45"/></p>
				<p>Discord</p>
				<Popup
						trigger={<button className="btn bg-white">
							<span style={{"fontSize":"11px"}}>{Object.keys(userConnectedRedux.user).length > 0 ?
							Translation(userConnectedRedux.user.language).profil.accountGame
							:
							Translation("fr").profil.accountGame}</span>
							<i></i></button>}
						modal
						nested
					>
					<div className="modal">
						<button className="close">
							&times;
						</button>
						<div className="header"> <h3>{Object.keys(userConnectedRedux.user).length > 0 ?
							Translation(userConnectedRedux.user.language).profil.setAccount
							:
							Translation("fr").profil.setAccount}</h3></div>
							<div className="content set-team">
								{' '}
								<div className="set-account">
									<label>PSN id</label><input type="text" placeholder="Preuve-platree"/>
								</div>
							</div>
							<div className="actions">
								<Popup
									trigger={<button className="btn bg-yellow"> {Object.keys(userConnectedRedux.user).length > 0 ?
							Translation(userConnectedRedux.user.language).profil.validate
							:
							Translation("fr").profil.validate} </button>}
								>
								</Popup>
							</div>
						</div>
					</Popup>

			</div>
			<div className="itemGame">
				<p className="img-account"><img src="https://i.ibb.co/yXchgZ1/epic-game.png" alt="epic-game" width="45" height="45"/></p>
				<p>Epic Games</p>
				<Popup
						trigger={<button className="btn bg-white">
							<span style={{"fontSize":"11px"}}>{Object.keys(userConnectedRedux.user).length > 0 ?
							Translation(userConnectedRedux.user.language).profil.accountGame
							:
							Translation("fr").profil.accountGame}</span>
							<i></i>
							</button>}
						modal
						nested
					>
					<div className="modal">
						<button className="close">
							&times;
						</button>
						<div className="header"> <h3>{Object.keys(userConnectedRedux.user).length > 0 ?
							Translation(userConnectedRedux.user.language).profil.setAccount
							:
							Translation("fr").profil.setAccount}</h3></div>
							<div className="content set-team">
								{' '}
								<div className="set-account">
									<label>PSN id</label><input type="text" placeholder="XXXXXXXX"/>
								</div>
							</div>
							<div className="actions">
								<Popup
									trigger={<button className="btn bg-yellow"> {Object.keys(userConnectedRedux.user).length > 0 ?
							Translation(userConnectedRedux.user.language).profil.validate
							:
							Translation("fr").profil.validate} </button>}

								>

								</Popup>
							</div>
						</div>
					</Popup>
			</div>
		</div>
	)
}

export default AccountGame
