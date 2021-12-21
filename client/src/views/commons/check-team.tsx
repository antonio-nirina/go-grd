import React,{useEffect,useState} from "react"
import Popup from "reactjs-popup"
import {Link } from "react-router-dom"
import "reactjs-popup/dist/index.css"

import { NameRoutes } from "../commons/route-list"
import "./css/popup.css"
import {TeamModel} from "../models/team"


export interface TeamPopup {
	handleOpen:Function,
	content:string|TeamModel[]
	isShow:boolean
	checkTeam:number
}

const PopupTeam = function({handleOpen,isShow,content,checkTeam}:TeamPopup) {
	const [isOpen,setIsOpen] = useState<boolean>(true)
	useEffect(()=> {
		setIsOpen(isShow)
	},[isShow])
	const handleClose = function() {
		setIsOpen(false)
		handleOpen(false)
	}
	return (
		<Popup
			open={isOpen}
			modal
			nested
			onClose={handleClose}
			closeOnDocumentClick>
			{(close:any) => (
				<div className="modal">
					<button className="close-popup" onClick={()=> handleClose()}>
						&times;
					</button>
					<div className="bar-title">
						<h2>Inscription par équipe</h2>
					</div>
					<div className="actions">
						<div className="body">
							<div className="content">
								<p>{content}</p>
							</div>
							<div className="handle-team">
								{checkTeam === 1 ? <Link to={NameRoutes.team}>Gérér votre équipe</Link>  : <></> }
							</div>
						</div>
					</div>
				</div>
			)}
		</Popup>
	)
}

export default PopupTeam
