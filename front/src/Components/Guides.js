import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios"
import { NavLink } from 'react-router-dom';


const Guides = () => {
    const [guides, setGuides] = useState([])
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API}/guides`)
        .then((res)=>{
            console.log(res.data)
            setGuides(res.data)
        })
    },[])


    return (
        <>
        <section className="section">
            <NavLink to="/derniers-articles">
                <h2 className="article-heading">Nos Guides et Tutoriels</h2>
            </NavLink>
            {guides.map((oneA, i) => (
                <article key={i} className="article">
                    
                    <div className="image-container">
                        <h3 aria-label={oneA.title} className="article-title">{oneA.title}</h3>
                        <img className="article-image" src={oneA.images[0].src} alt={oneA.title} />
                    </div>
                    <p className="article-description">{oneA.description}</p>
                    <NavLink to={`/product/${oneA._id}`} className="nav-button" activeClassName="nav-button-active">En savoir plus</NavLink>
                </article>
            ))}
        </section>
    </>
    );
};

export default Guides;