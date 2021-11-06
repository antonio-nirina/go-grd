import React,{useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft} from "@fortawesome/free-solid-svg-icons"

import {NUMBER_PER_PAGE} from "./constante"

const style = {
	"cursor":"pointer"
}

type TypeRecords = {
	records:number|undefined,
	handlePage:Function
}


const Pagination = function({records,handlePage}:TypeRecords) {
	const [pages, setPage] = useState<Array<number>>([])
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [isActivedNext, setIsActivedNext] = useState<Boolean>(false)

	const [isActiv, setIsActive] = useState<number>(1)

	useEffect(()=>{
		if(records) {
			let array:Array<number> = []
			const numberPage:number = Math.ceil(records/NUMBER_PER_PAGE)

			for(let i = 1; i <= numberPage;i++) {
				array.push(i)
			}
			setPage(array)
		}
	},[records])

	const handleClick = function(item:number) {
		if(records && item === Math.ceil(records/NUMBER_PER_PAGE)) {
			setIsActivedNext(true)
		} else {
			setIsActivedNext(false)
		}

		handlePage(item)
		setIsActive(item)
	}

	const handlePrevious = function() {
		setIsActive(currentPage)
		if(currentPage > 1) {
			setCurrentPage(currentPage - 1)
			handlePage(currentPage - 1)
			setIsActivedNext(false)
		}
	}

	const handleNext = function() {
		setIsActive(currentPage)
		if(records && currentPage  < Math.ceil(records/NUMBER_PER_PAGE)) {
			setCurrentPage(currentPage + 1)
			handlePage(currentPage + 1)
			if(currentPage === Math.ceil(records/NUMBER_PER_PAGE) - 1) setIsActivedNext(true)
		} else{
			setIsActivedNext(false)
		}
	}

	return (
		<div className="filter-game-result">
			<div className="result-game-page">
				<i style={style}><FontAwesomeIcon icon={faChevronLeft}  onClick={handlePrevious} size="lg"/></i>
					{
						pages.map(function(el:number,index:number) {
							return (
								<span key={index} className={isActiv === el ? "active" : ""} style={style} onClick={()=> handleClick(el)}>{el}</span>
							)
						})
					}
				<i className={isActivedNext ? "d-none":""} style={style}><FontAwesomeIcon onClick={handleNext}  icon={faChevronRight} size="lg"/></i>
			</div>
		</div>
	)
}

export default Pagination
