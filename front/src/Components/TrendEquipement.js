import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios"
import { NavLink } from 'react-router-dom';


const TrendEquipement = () => {
    const [trendEquipement, setTrendEquipement] = useState([])
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API}/trend-equipement`)
        .then((res)=>{
            console.log(res.data)
            setTrendEquipement(res.data)
        })
    },[])


    return (
        <>
           
                <section className="section">
                    <h2 className="article-heading" aria-label="équipement du moment">Équipement du moment</h2>
                    
                    
                    {trendEquipement.images && 
                    <article className="article">
                    <div className="image-container">
                        <img className="article-image image-news" src={`${process.env.REACT_APP_API}/img/${trendEquipement.images[0].src}`} alt={trendEquipement.title} />
                        <div class="overlay">
                        <h3 className="article-title">{trendEquipement.title}</h3>
                    
                    {/* <p>{trendEquipement.description}</p> */}
                    <NavLink to={`/product/${trendEquipement._id}`} className="nav-button" activeClassName="nav-button-active" aria-label={`Lire l'article ${trendEquipement.title}`}>&#x279C;</NavLink>
                    </div>
                    </div>
                    </article>
                    
}
                </section>
                
        
        </>
    );
};

export default TrendEquipement;