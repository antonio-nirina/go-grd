import React from "react"
import ContentPaiement from "./contentPaiement"
import {Tournament} from "../models/tournament"
import ConfirmPart from "./confirmPart"

type TypePaiement = {
	isShow:boolean
	tournament:Tournament|undefined
}

const Paiement = function({isShow,tournament}:TypePaiement) {

	return (
		<>
			{tournament && parseInt(tournament?.priceParticipate) > 0 && isShow ?
				<ContentPaiement  />
			:
				isShow ? <ConfirmPart tournament={tournament} /> : <></>
			}

		</>
	)
}

export default Paiement
