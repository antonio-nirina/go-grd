import React from "react"

import Header from "../header/header"
import Footer from "../footer/footer"

const Communaute: React.FC = function() {
  return(
  	<div>
  		<Header/>
  		<div className="content">
  			<div className="side">
  				<div className="games"></div>
  				<div className="stream"></div>
  			</div>
  			<div className="actuality"></div>
  			<div>
  				<div className="friend-inline">

  				</div>
  				<div className="store">

  				</div>
  				<div className="tchat">

  				</div>
  			</div>
  		</div>
  		<Footer/>
  	</div>
  )
}

export default Communaute
