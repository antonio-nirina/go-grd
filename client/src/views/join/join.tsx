import React from "react"
import ReactDOM from 'react-dom'
import "../../assets/css/style.css"
import "../join/join.css"





const Join: React.FC = function() {
  return(
    <div className="join">
      <h2>Rejoins la communauté gratuitement</h2>
      <div className="email">
        <p><input type="text" placeholder="Ton email" /><a href="#">Creer ton compte gratuit</a></p>
      </div>
    </div>
  );
}

export default Join;
