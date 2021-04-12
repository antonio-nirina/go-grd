import React from "react"
import ReactDOM from 'react-dom'
import Header from "../header/header" 
import "../home/home.css"
import "../../assets/css/style.css"



const Home: React.FC = function() {
  return(
    <div>
      <div className="container">
	      <Header/>
	      <div className="main">
	        <div className="background">
	        	Home
	        </div>
	      </div>
	  </div>
    </div>
  );
}

export default Home;
