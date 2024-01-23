import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios"
import { NavLink } from 'react-router-dom';


const TrendArticle = () => {
    const [trendArticle, setTrendArticle] = useState([])
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API}/trend-article`)
        .then((res)=>{
            console.log(res.data)
            setTrendArticle(res.data)
        })
    },[])


    return (
        <>
           
                <section className="section">
                    <h2 className="article-heading" aria-label="article du moment">Article du moment</h2>
                    
                    
                    {trendArticle.images && 
                    <article className="article">
                    <div className="image-container">
                        <img className="article-image" src={`${process.env.REACT_APP_API}/img/${trendArticle.images[0].src}`} alt={trendArticle.title} />
                        <div class="overlay">
                        <h3 className="article-title">{trendArticle.title}</h3>
                    
                    {/* <p>{trendArticle.description}</p> */}
                    <NavLink to={`/detail/${trendArticle._id}`} className="nav-button" activeClassName="nav-button-active" aria-label={`Lire l'article ${trendArticle.title}`}>
                    &#x279C;
                    </NavLink></div></div>
                    </article>
                    
}
                </section>
                
        
        </>
    );
};

export default TrendArticle;