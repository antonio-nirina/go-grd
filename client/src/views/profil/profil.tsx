import React from "react"

import Header from "../header/header"
import Footer from "../footer/footer"
import "../../assets/css/style.css"


const Profil: React.FC = function() {
  return(
    <div className="profil">
      <div className="container">
	      <Header/>	      
	      <Footer/>
	  </div>
    </div>
  );
}

export default Profil;
