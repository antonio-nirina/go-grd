import React,{useState,useEffect} from "react"
import {useQuery} from "@apollo/client"

import Header from "../header/header"
import Footer from "../footer/footer"
import Aside from "../assistance/aside"

import "../../assets/css/style.css"
import "../assistance/assistance.css"
import {GET_ALL_ASSIST} from "../../gql/assist/query"
import {Assist} from "../models/assist"

interface SubjectTitle {
	title:string
	content:string
	tag:string
}

const NextAssistance: React.FC = function() {
	const [assists, setAssists] = useState<Assist[]>([])
	const [item, setItem] = useState<number>(0)
	const {loading,error,data} 	= useQuery(GET_ALL_ASSIST)

	useEffect(() => {
		if(!loading && !error && data) {
			setAssists(data.FindAllAsist)
		}

	},[loading,error,data])

	const handleActive = function(item:number) {
		setItem(item)
	}

  return(
  	<div className="assistance">
	    <div className="container">
	  		<Header/>
	  		<div className="main">
	  			<div className="block-center">
			  		<div className="search-container">
			  			<h2>Assistance</h2>
			  		</div>
		  			<div className="aside-menu accueil">
		  				<Aside
							handleList={handleActive}
						   	assists={assists}
						/>
		  			</div>
		  			<div className="support">
						<div>
							{assists && assists.length > 0 ? assists[item].underTitle.map(function(subject:SubjectTitle,i:number){
								return (<div style={{"color":"#dd0000","marginBottom":"20px"}} key={i}>{subject.title}</div>)
							}): <></>}
						</div>

		  			</div>
	  			</div>
	  		</div>
			<Footer/>
	  	</div>
	</div>
  );
}

export default NextAssistance

