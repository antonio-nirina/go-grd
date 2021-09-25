import React from "react"
import "./tree.css"
import AvatarDefault from "../../assets/image/game-tag.png"

const Tree: React.FC = function(props:any) {
return(
  	<div className="tree">
      <ul>      
        <li className="border">
        	<ul className="part-one">
	            <li>
	              <span>Gotaga - CapelarJr - Mickalow</span>
	              <ul>
	                <li className="lose">
	                  <span>Team 4</span>          
	                </li>
	                <li>
	                  <span>Gotaga - CapelarJr - Mickalow</span>          
	                </li>
	              </ul>
	            </li>
	            <li>
	              <span className="lose">Skouinar - TonioPlancha - Shad_BD</span>
	              <ul>
	                <li className="lose">
	                  <span>Team 2</span>          
	                </li>
	                <li>
	                  <span>Skouinar - TonioPlancha - Shad_BD</span>          
	                </li>
	              </ul>
	            </li>	                     	            
          	</ul>
          	<ul className="no-border">
          		<li>          			
          			<span>Gotaga - CapelarJr - Mickalow</span>
          		</li>
          	</ul>
        </li>
        <li className="part-two">
        	<ul className="part-one">
	            <li>
	              <span>Team 6</span>
	              <ul>
	                <li className="lose">
	                  <span>Team 8</span>          
	                </li>
	                <li>
	                  <span>Team 6</span>        
	                </li>
	              </ul>
	            </li>
	            <li>
	              <span className="lose">Team 5</span>
	              <ul>
	                <li>
	                  <span>Team 5</span>          
	                </li>
	                <li className="lose">
	                  <span>Team 7</span>          
	                </li>
	              </ul>
	            </li>          
          	</ul>
          	<ul className="no-border">
          		<li className="lose">
          			<span>Team 6</span>
          		</li>
          	</ul>          	
        </li>

      </ul>
      <ul className="winner">
      	<strong>Vainqueur</strong>
  		<li className="win">  			
    		<span>Gotaga - CapelarJr - Mickalow</span>
    	</li>
      </ul>
    </div>
  )
}

export default Tree
