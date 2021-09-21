import React from "react"
import { Link } from "react-router-dom"

import "../../assets/css/style.css"
import "../assistance/assistance.css"

const ChildList = function({el}:any) {
	return (
		<>
			{el.assist.map(function(e:any,aIndex:number){
				return (
					<div className="link" key={aIndex}>
						<li><Link to ={`#${e.underTitle.toLowerCase()}`}>{e.underTitle}</Link></li>
					</div>
				)
			})}
		</>
	)
}


const Aside = function({assists}:any) {

	return(
	  	<div className="support-link">
			<div className="link">
				<h3><Link to ="/assistance">Accueil</Link></h3>
			</div>
			{
				assists?.map(function(el:any,index:number){
					return (
						<div className="link" key={index}>
							<div className="parent-link">
								<h3>{el.assist.length > 0 ? el.title : <></>}</h3>
								{el.assist.length > 0 ? <ChildList el={el} /> : <></>}
							</div>
						</div>
					)
				})
			}
			<div className="link">
				<h3><Link to ="/contact">Contact</Link></h3>
			</div>
		</div>
	)
}

export default Aside;

