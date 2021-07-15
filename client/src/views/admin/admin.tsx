import React from "react"

import "../admin/admin.css"
import ListTournament from "./list-tournament"
import SideBar from "./sidebar"
import Nav from "./nav"

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
	        		<ListTournament />
				</div>
			</div>
	  	</div>
  	)
}

export default Admin
