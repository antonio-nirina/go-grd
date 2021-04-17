import React from "react"
import ReactDOM from 'react-dom'

import "../../assets/css/style.css"
import "../community/community.css"
import warzone from "../../assets/image/warzone-.png"
import rlchampionsip from "../../assets/image/rlchampionsip.png"
import thumbnail from "../../assets/image/video.png"
import promo from "../../assets/image/promo.png"




const Community: React.FC = function() {
  return(
    <div className="community">
      <h2>Communauté</h2>
      <div className="community-block">
        <div className="actuality">
          <h3>Actualités</h3>
          <div className="artContent">
            <div className="article">            
              <img src={warzone} alt="" />
              <div className="text">
                <p className="title">Warzone Patch 1.15.x</p>
                <p>Retrouvez toutes les informations sur la sortie du pach 1.15.x</p>
                <a href="#">Voir plus</a>
              </div>
            </div>
            <div className="article">            
              <img src={rlchampionsip} alt="" />
              <div className="text">
                <p className="title">Résultats RLCS</p>
                <p>Suivez l'actualité des RLCS. Toutes les infos, résumés de matchs, et bien plus</p>
                <a href="#">Voir plus</a>
              </div>
            </div>            
          </div>
        </div>
        <div className="clip">
          <h3>Clip du mois</h3>
          <div className="video">
            <video controls poster={thumbnail} width="477" height="268">
              <source src="../../assets/image/video.mp4" type="video/mp4"/>
            </video>
          </div>
        </div>
        <div className="shop">
          <h3>Boutique</h3>
          <div className="shop">
            <a href="#"><img src={promo} alt=""/></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Community;
