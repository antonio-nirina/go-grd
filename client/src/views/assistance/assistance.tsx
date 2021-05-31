import React from "react"
import { useSelector } from "react-redux"

import Header from "../header/header"
import Footer from "../footer/footer"
import {Translation} from "../../lang/translation"
import {RootState} from "../../reducer"
import "../../assets/css/style.css"
import "../assistance/assistance.css"


const Assistance: React.FC = function() {
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
  return(
    <div className="container">
  		<Header/>
		
		<Footer/>
  	</div>
  );
}

export default Assistance;
