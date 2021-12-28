import React,{useEffect,useState} from "react"
import {useQuery} from "@apollo/client"
import { Link } from 'react-router-dom'
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { GET_ALL_ASSIST } from "../../gql/assist/query"
import {Assist} from "../models/assist"

const FaqCmty: React.FC = function() {
	const [assists, setAssists] = useState<Assist[]>([])
	const {loading,error,data} 	= useQuery(GET_ALL_ASSIST)

	useEffect(() => {
		if(!loading && !error && data) {
			setAssists(data.FindAllAsist)
		}
	},[loading,error,data])

	return (
		<>
			{
				assists ? assists?.map(function(el:Assist,index:number){
					return (
						<div className="forum-container" key={index}>
							<div className="subjectforum">
								<p className="underlined">{el.title}<i>
									<FontAwesomeIcon icon={faQuestionCircle} size="xs"/></i>
								</p>
								{el.underTitle.map(function(e,i:number){
									return (
										<div className="seek" key={i}>
											<Link to="#">{e.title} ?</Link>
										</div>
									)
								})}

							</div>
						</div>
					)
				})
			: <></>}
		</>
	)
}

export default FaqCmty
