import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';


const Header = () => {

    const [admin, setAdmin] = useState(false)

    const user = JSON.parse(localStorage.getItem("user"))
    useEffect(() => {
        if (!user) {
            return;
        }

        if (user.role === "Admin") {
            setAdmin(true)
        } else {
            setAdmin(false)
        }

    }, [])


    const handleClick = () => {

        localStorage.removeItem("user");
        setAdmin(false);
        window.location = '/';
    }



    return (
      
            <header>
                <div className="logo">
                <NavLink to={"/"} aria-label="accueil">
                    <img className="logo" src="img/logo4.png" alt="Logo de votre site" />
                </NavLink>
                </div>
            <nav className="navbar" aria-label="navigation" role="navigation">
                <NavLink to={"/"} aria-label="accueil">Accueil</NavLink>
                <NavLink to={"/news"} aria-label="actualités">Actualités</NavLink>

                <div className="dropdown">
                    <NavLink to="/equipements-et-guides" aria-label="équipements et guides">Équipements et Guides</NavLink>
                    <div className="dropdown-content">
                        <NavLink to="/gants-et-bandages" aria-label="gants et bandages">Gants et Bandages</NavLink>
                        <NavLink to="/casques-et-protections" aria-label="casques et protections">Casques et Protections</NavLink>
                        <NavLink to="/proteges-dents" aria-label="protège dents">Protège dents</NavLink>
                        <NavLink to="/jjb-grappling" aria-label="JJB et grappling">JJB et Grappling</NavLink>
                        <NavLink to="/accessoires" aria-label="accessoires">Accessoires</NavLink>
                        <NavLink to="/guides-et-tutoriels" aria-label="guides et tutoriels">Guides et Tutoriels</NavLink>
                    </div>
                </div>
                <NavLink to={"/equipe"}>Notre Équipe</NavLink>
                {admin && (
                   
                    <div className="dropdown">
                    <NavLink to={"/admin"}>Admin</NavLink>
                    <div className="dropdown-content">
                    <NavLink to={"/users"}>Users </NavLink>
                    </div></div>
                    
                )}

                {
                    user ? (
                        <>
                            <p>Bonjour à toi {user.login}</p>
                        {/* <NavLink to={"/user-settings"}>Paramètres</NavLink> */}
                            <NavLink to={"/login"} onClick={handleClick}> Se déconnecter </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to={"/register"}>Inscription</NavLink>
                            <NavLink to={"/login"}> Se connecter </NavLink>
                        </>
                    )
                }
            </nav>

                </header>
    
    );
};

export default Header;