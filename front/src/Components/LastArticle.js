import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios"
import { NavLink } from 'react-router-dom';



const LastArticle = () => {
    const [lastArticle, setLastArticle] = useState([])
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API}/last-article`)
        .then((res)=>{
            console.log(res.data)
            setLastArticle(res.data)
        })
    },[])


    return (
        <>
        <section className="section">
            
                <h2 className="article-heading" aria-label="dernier article">Derniers articles</h2>
            
            {lastArticle.map((oneA, i) => (
                
                <article key={i} className="article">
                    
                    <div className="image-container ">
                        <img className="article-image" src={`${process.env.REACT_APP_API}/img/${oneA.images[0].src}`} alt={oneA.title} />
                        <div class="overlay">
                        <h3 className="article-title">{oneA.title}</h3>
                    <NavLink to={`/detail/${oneA._id}`} className="nav-button" activeClassName="nav-button-active" aria-label={`Lire l'article ${oneA.title}`}>&#x279C;</NavLink>
                        </div>
                    </div>
                    {/* <p className="article-description">{oneA.description}</p> */}
                </article>
            ))}
        </section>
    </>
    );
};

export default LastArticle;