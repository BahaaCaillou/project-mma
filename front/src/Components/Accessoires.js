import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios"
import { NavLink } from 'react-router-dom';



const Accessoires = () => {
    const [accessoires, setAccessoires] = useState([])
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API}/accessoires`)
        .then((res)=>{
            console.log(res.data)
            setAccessoires(res.data)
        })
    },[])


    return (
        <>
            
            {accessoires.map((oneA, i) => (
        <section className="section">
        <article key={i} className="article">
            
            <div className="image-container">
                <img className="article-image" src={`${process.env.REACT_APP_API}/img/${oneA.images[0].src}`} alt={oneA.title} />
                <div class="overlay">
                <h3 aria-label={oneA.title} className="article-title">{oneA.title}</h3>
            </div>
            </div>
            <p>{`${oneA.description.slice(0, oneA.description.indexOf(" ", 100))}...`}</p>
            <NavLink to={`/product/${oneA._id}`} className="news-button" activeClassName="nav-button-active">En savoir plus</NavLink>
        </article>
</section>
            ))}
    </>
    );
};

export default Accessoires;