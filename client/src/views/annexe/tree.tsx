import React from "react"
import "../annexe/tree.css"
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
	                  <span><img src={AvatarDefault} alt="" className="avatar-team"/>Team 1</span>          
	                </li>
	                <li>
	                  <span><img src={AvatarDefault} alt="" className="avatar-team"/>Team 2</span>          
	                </li>
	              </ul>
	            </li>
	            <li>
	              <span>Team ?</span>
	              <ul>
	                <li>
	                  <span><img src={AvatarDefault} alt="" className="avatar-team"/>Team 3</span>          
	                </li>
	                <li>
	                  <span><img src={AvatarDefault} alt="" className="avatar-team"/>Team 4</span>          
	                </li>
	              </ul>
	            </li>          
          	</ul>
          	<span>WINNER</span>
          	<ul className="part-two">
	            <li>
	              <span>Team ?</span>
	              <ul>
	                <li>
	                  <span><img src={AvatarDefault} alt="" className="avatar-team"/>Team 5</span>          
	                </li>
	                <li>
	                  <span><img src={AvatarDefault} alt="" className="avatar-team"/>Team 6</span>          
	                </li>
	              </ul>
	            </li>
	            <li>
	              <span>Team ?</span>
	              <ul>
	                <li>
	                  <span><img src={AvatarDefault} alt="" className="avatar-team"/>Team 7</span>          
	                </li>
	                <li>
	                  <span><img src={AvatarDefault} alt="" className="avatar-team"/>Team 8</span>          
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
