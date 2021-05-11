import React from "react"

import Header from "../header/header"
import Footer from "../footer/footer"

import "../../assets/css/style.css"


const Tournament: React.FC = function(props:any) {
	
  return(
  	<div className="Tournament">
		<div className="container">
			<Header/>
			<Footer/>
		</div>		
    </div>    
  )
}

export default Tournament
