import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios"
import { NavLink } from 'react-router-dom';


const LastEquipement = () => {
    const [lastEquipement, setLastEquipement] = useState([])
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API}/last-equipement`)
        .then((res)=>{
            console.log(res.data)
            setLastEquipement(res.data)
        })
    },[])


    return (
        <>
        <section className="section">
            
                <h2 className="article-heading" aria-label="dernier article">Nouveautés</h2>
        
            {lastEquipement.map((oneA, i) => (
                <article key={i} className="article">
                    
                    <div className="image-container">
                        
                        <img className="article-image image-news" src={`${process.env.REACT_APP_API}/img/${oneA.images[0].src}`} alt={oneA.title} />
                        <div class="overlay">
                        <h3 className="article-title">{oneA.title}</h3>
                    
                    {/* <p className="article-description">{oneA.description}</p> */}
                    <NavLink to={`/product/${oneA._id}`} className="nav-button" activeClassName="nav-button-active" aria-label={`Lire l'article ${oneA.title}`}>&#x279C;</NavLink>
             </div>  </div> </article>
            ))}
        </section>
    </>
    );
};

export default LastEquipement;