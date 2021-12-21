import React,{useEffect,useState} from "react"
import {Link,useHistory } from "react-router-dom"

import "../../assets/css/style.css"
import "../assistance/assistance.css"
import {Assist} from "../models/assist"

export interface AsideInterface {
	assists:Assist[]
	handleList:Function
}


const Aside = function({assists,handleList}:AsideInterface) {
	const [item, setItem] = useState<number>(0)
	const [isContact,setIsContact] = useState<boolean>(false)
	const params = useHistory<any>()
	useEffect(()=> {
		if(!/contact/.test(params.location.pathname))setIsContact(true)
	},[])

	const handleMenu = function(index:number) {
		setItem(index)
		handleList(index)
	}
	return(
	  	<div className="support-link">
			{
				assists ? assists?.map(function(el:Assist,index:number){
					return (
						<div className={!isContact && index === item ? "list-link link" : "link"}
							style={{"cursor":"pointer"}}
							onClick={() => handleMenu(index)} key={index}>
							<div className="parent-link title-list">
								<h3>{el.title}</h3>
							</div>
						</div>
					)
				})
			: <></>}
			<div className={isContact ? "list-link link" : "link"}>
				<h3><Link to ="/contact">Contact</Link></h3>
			</div>
		</div>
	)
}

export default Aside;

