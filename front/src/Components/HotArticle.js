import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios"
import { NavLink } from 'react-router-dom';


const HotArticle = () => {
    const [hotArticle, setHotArticle] = useState([])
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API}/votes-article`)
        .then((res)=>{
            console.log(res.data)
            setHotArticle(res.data)
        })
    },[])


    return (
        <>
           
                <section className="section">
                    <h2 className="article-heading" aria-label="article le plus populaire">Le plus populaire</h2>
                    
                    
                    {hotArticle.images && 
                    <article className="article">
                    <div className="image-container">
                        
                        <img className="article-image image-news" src={`${process.env.REACT_APP_API}/img/${hotArticle.images[0].src}`} alt={hotArticle.title} />
                        <div class="overlay">
                        <h3 className="article-title">{hotArticle.title}</h3>
                    
                    {/* <p>{trendEquipement.description}</p> */}
                    <NavLink to={`/detail/${hotArticle._id}`} className="nav-button" activeClassName="nav-button-active" aria-label={`Lire l'article ${hotArticle.title}`}>&#x279C;</NavLink>
                   </div> </div></article>
                    
}
                </section>
                
        
        </>
    );
};

export default HotArticle;