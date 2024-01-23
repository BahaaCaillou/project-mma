import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';



const Footer = () => {
    return (
        <footer className="footer">
        <nav className="navbar-footer" aria-label="navigation" role="navigation">
            <NavLink to={"/"} aria-label="accueil">Accueil</NavLink>
            <NavLink to={"/news"} aria-label="actualités">Actualités</NavLink>
            <NavLink to="/equipements-et-guides" aria-label="équipements et guides">Équipements et Guides</NavLink>
            <NavLink to={"/equipe"} aria-label="notre équipe">Notre Équipe</NavLink>
        </nav>
        <div className="logo">
        <NavLink to={"/"} aria-label="accueil">
            <img style={{ width: "10rem", height: "auto" }} src="http://bahaaedinetohamibakhit.ide.3wa.io:3000/img/logo4.png" alt="logo" />
            </NavLink>
        </div>
        <p>Suivez-nous sur les réseaux sociaux </p>
        <div className="social-links">
            <NavLink to="https://www.facebook.com/" className="facebook social" aria-label="notre facebook">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
            </NavLink>
            <NavLink to="https://www.twitter.com/" className="twitter social" aria-label="notre twitter">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
            </NavLink>
            <NavLink to="https://www.instagram.com/" className="instagram social" aria-label="notre instagram">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
            </NavLink>
        </div>
    </footer>
    );
};

export default Footer;