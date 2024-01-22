import React from 'react';
import { NavLink } from 'react-router-dom';

const NavAccess = () => {
    return (
        <nav className="nav-access">
            <NavLink to="#top">Haut de page</NavLink>
            <NavLink to="#input">Recherche</NavLink>
            <NavLink to="/admin">Mon compte</NavLink>
            <NavLink to="#">Menu principal</NavLink>
            <NavLink to="#sommary">Sommaire</NavLink>
        </nav>
    );
};

export default NavAccess;