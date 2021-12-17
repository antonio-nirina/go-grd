import React,{useState,useEffect} from "react"
import {useQuery} from "@apollo/client"

import Header from "../header/header"
import Footer from "../footer/footer"
import Aside from "../assistance/aside"

import "../../assets/css/style.css"
import "../assistance/assistance.css"
import {GET_ALL_ASSIST} from "../../gql/assist/query"
import {Assist} from "../models/assist"

const NextAssistance: React.FC = function() {
	const [assists, setAssists] = useState<Assist[]>([])
	const {loading,error,data} 	= useQuery(GET_ALL_ASSIST)

	useEffect(() => {
		if(!loading && !error && data) {
			console.log(data.FindAllAsist)
			setAssists(data.FindAllAsist)
		}

	},[loading,error,data])

  return(
  	<div className="assistance">
	    <div className="container">
	  		<Header/>
	  		<div className="main">
	  			<div className="block-center">
			  		<div className="search-container">
			  			<h2>Assistance</h2>
			  			<div className="search-box">
			  				<input type = "text" placeholder ="Rechercher un sujet"/>
			  			</div>
			  		</div>
		  			<div className="aside-menu accueil">
		  				<Aside assists={assists} />
		  			</div>
		  			<div className="support">
		  				{assists ? assists.map(function(el:Assist,index:number){
							  return (
								  <div key={index}>
									  <div style={{"color":"#dd0000"}}>{el.underTitle[0].title}</div>
								  </div>
							  )
						  }): <></>}
		  			</div>
	  			</div>
	  		</div>
			<Footer/>
	  	</div>
	</div>
  );
}

export default NextAssistance

