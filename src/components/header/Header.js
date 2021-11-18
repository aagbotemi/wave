import React, { useState } from 'react';
import './header.css';

const Header = ({ openAboutModal }) => {
    return (
        <nav className={'d-flex justify-center'}>
            <div className={'navbar-container d-flex justify-between items-center'}>
                <div className="navbar-brand">
                    <span>Wave</span> 👋
                </div>
                <div className={'d-flex items-center'}>
                    <div style={{fontSize: '20px'}} onClick={openAboutModal}
                        className={'cursor-pointer'}
                    >✨</div>
                </div>
            </div>
        </nav>
    )
}

export default Header
