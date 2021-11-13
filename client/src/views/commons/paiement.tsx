import React,{useState} from "react"
import ContentPaiement from "./contentPaiement"
import {Tournament} from "../models/tournament"
import ConfirmPart from "./confirmPart"

type TypePaiement = {
	isShow:boolean
	tournament:Tournament|undefined
	handleClose:Function
}

const Paiement = function({isShow,tournament,handleClose}:TypePaiement) {
	const [showClose, setShowClose] = useState(false)
	const closePagePayementOrConf = function(isclose:boolean) {
		setShowClose(!isclose)
	}
	handleClose(showClose)
	return (
		<>
			{tournament && parseInt(tournament?.priceParticipate)  && isShow ?
				<ContentPaiement handleClosePayement={closePagePayementOrConf}  />
			:
				isShow ?
				<ConfirmPart
					tournament={tournament}
					handleClosePayement={closePagePayementOrConf}
				/> : <></>
			}

		</>
	)
}

export default Paiement
