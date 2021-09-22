import React,{useState} from "react"
import { useHistory } from 'react-router-dom'
import { useSelector } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useMutation} from "@apollo/client"
import { faPlus, faMinus, faCommentDots } from "@fortawesome/free-solid-svg-icons"
import AvatarDefault from "../../assets/image/game-tag.png"
import {Translation} from "../../lang/translation"


const Invitation = function(data:any) {
	const [showReduce, setShowReduce] = useState<Boolean>(true)
	const onShowReduce = function(){
		setShowReduce(!showReduce)
	}
	return(
		<div className="gamer-invite">
			<p>Invitez à rejoindre votre groupe</p>
			<div className="friends-online">
				<p className="bold" onClick={onShowReduce}>Mes amis en ligne <span>(2)</span><i className="right-icon"><FontAwesomeIcon icon={!showReduce ? faPlus : faMinus} /></i></p>
				<div className={!showReduce ? "list-online" : "list-online show"}>
					<p>
						<strong>
							<img src={AvatarDefault} alt=""/>
							<span>Shad_BD</span>
						</strong>
						<span className="i-right">
							<i><FontAwesomeIcon className="add-icon" icon={faPlus} /></i>
							<i><FontAwesomeIcon icon={faCommentDots} /></i>
						</span>
					</p>
					<p>
						<strong>
							<img src={AvatarDefault} alt=""/>
							<span>TonioPlancha</span>
						</strong>
						<span className="i-right">
							<i><FontAwesomeIcon  className="add-icon" icon={faPlus} /></i>
							<i><FontAwesomeIcon icon={faCommentDots} /></i>
						</span>
					</p>
				</div>
			</div>
			<div className="friends-online">
				<p className="bold">Skouinar & Co. <span>(15)</span><i className="right-icon"><FontAwesomeIcon icon={faPlus} /></i></p>
			</div>
		</div>	
	)
}

export default Invitation
