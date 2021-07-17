import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft} from "@fortawesome/free-solid-svg-icons"

const Pagination = function() {
	return (
		<div className="filter-game-result">
			<div className="result-game-page">
				<i><FontAwesomeIcon icon={faChevronLeft} size="lg"/></i>
				<span>1</span>
				<i><FontAwesomeIcon icon={faChevronRight} size="lg"/></i>
			</div>
		</div>
	)
}

export default Pagination
