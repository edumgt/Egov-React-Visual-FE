import React from 'react';

import { NavLink } from 'react-router-dom';
import URL from 'constants/url';

function EgovLeftNavIntro() {
    
    return (
        <div className="nav">
            <div className="inner">
            <h2 style={{backgroundColor:'#0845A1',color:'#fff'}}>공지사항</h2>
                <ul className="menu4">
                    <li><NavLink to={URL.INTRO_WORKS} className={({ isActive }) => (isActive ? "cur" : "")}>-</NavLink></li>
                </ul>
            </div>
        </div>
    );
}

export default EgovLeftNavIntro;



