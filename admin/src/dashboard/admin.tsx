import React from "react"

import SideBar from "../header/sidebar"
import Nav from "../header/nav"

const Admin: React.FC = function() {
	return(
	    <div className="admin">
			<div className="layout-container">
				<SideBar />
				<div className="content-wrapper">
					<nav className="navbar">
	          			<div></div>
	                    <Nav />
	        		</nav>
				</div>
			</div>
	  	</div>
  	)
}

export default Admin
