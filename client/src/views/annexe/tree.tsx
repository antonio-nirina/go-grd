import React from "react"
import { Link } from "react-router-dom"
import "../annexe/tree.css"
import AvatarDefault from "../../assets/image/game-tag.png"

const Tree: React.FC = function(props:any) {
return(
  	<div className="tree">
      <ul>      
        <li>
        	<ul className="part-one">
	            <li>
	              <Link to="#">Team ?</Link>
	              <ul>
	                <li>
	                  <Link to="#">Team 1</Link>          
	                </li>
	                <li>
	                  <Link to="#">Team 2</Link>          
	                </li>
	              </ul>
	            </li>
	            <li>
	              <Link to="#">Team ?</Link>
	              <ul>
	                <li>
	                  <Link to="#">Team 3</Link>          
	                </li>
	                <li>
	                  <Link to="#">Team 4</Link>          
	                </li>
	              </ul>
	            </li>          
          	</ul>
          	<Link to="#">WINNER</Link>
          	<ul className="part-two">
	            <li>
	              <Link to ="#">Team ?</Link>
	              <ul>
	                <li>
	                  <Link to="#">Team 5</Link>          
	                </li>
	                <li>
	                  <Link to="#">Team 6</Link>          
	                </li>
	              </ul>
	            </li>
	            <li>
	              <Link to="#">Team ?</Link>
	              <ul>
	                <li>
	                  <Link to="#">Team 7</Link>          
	                </li>
	                <li>
	                  <Link to="#">Team 8</Link>          
	                </li>
	              </ul>
	            </li>          
          	</ul>
        </li>
      </ul>
    </div>
  )
}

export default Tree
