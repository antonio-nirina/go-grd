import React from "react"
import "./tree.css"
import AvatarDefault from "../../assets/image/game-tag.png"

const Tree: React.FC = function(props:any) {
return(
  	<div className="tree">
      <ul>      
        <li>
        	<ul className="part-one">
	            <li>
	              <span>Team ?</span>
	              <ul>
	                <li>
	                  <span>Team 1</span>          
	                </li>
	                <li>
	                  <span>Team 2</span>          
	                </li>
	              </ul>
	            </li>
	            <li>
	              <span>Team ?</span>
	              <ul>
	                <li>
	                  <span>Team 2</span>          
	                </li>
	                <li>
	                  <span>Skouinar - TonioPlancha - Shad_BD</span>          
	                </li>
	              </ul>
	            </li>          
          	</ul>
          	<ul className="no-border">
          		<strong>Vainqueur</strong>
          		<span>Gotaga - CapelarJr - Mickalow</span>
          	</ul>
          	
        </li>
      </ul>
    </div>
  )
}

export default Tree
