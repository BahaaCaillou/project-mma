import React from 'react';
import { NavLink } from 'react-router-dom';

const NotAccess = () => {
    return (
        <>
            <div className='not-access-container'>
                <img className='gif not-access-gif' src="img/lord-of-the-rings-you-shall-not-pass.gif" alt="gandalf" />
                <NavLink className='not-access-link' to={"/"}>Fuyez pauvre fou</NavLink>
            </div>

        </>
    );
};

export default NotAccess;