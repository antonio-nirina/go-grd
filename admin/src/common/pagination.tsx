import React,{useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft} from "@fortawesome/free-solid-svg-icons"

const style = {
	"cursor":"pointer"
}

type TypeRecords = {
	records:number
}
export const NUMBER_PER_PAGE:number = 5

const Pagination = function({records}:TypeRecords) {
	const [pages, setPage] = useState<Array<number>>([])
	useEffect(()=>{
		if(records) {
			let array:Array<number> = []
			const numberPage:number = Math.floor(records/NUMBER_PER_PAGE)

			for(let i = 1; i <= numberPage;i++) {
				array.push(i)
			}
			setPage(array)
		}
	},[records])
	return (
		<div className="filter-game-result">
			<div className="result-game-page">
				<i style={style}><FontAwesomeIcon icon={faChevronLeft} size="lg"/></i>
				{
					pages.map(function(el:number,index:number) {
						return (
							<span key={index} style={style}>{el}</span>
						)
					})
				}
				<i style={style}><FontAwesomeIcon icon={faChevronRight} size="lg"/></i>
			</div>
		</div>
	)
}

export default Pagination
