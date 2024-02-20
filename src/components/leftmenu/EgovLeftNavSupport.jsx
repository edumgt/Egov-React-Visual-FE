import React from 'react';

import { NavLink } from 'react-router-dom';
import URL from 'constants/url';

function EgovLeftNavSupport() {
    return (
        <div className="nav">
            <div className="inner">
            <h2 style={{backgroundColor:'#169bd5',color:'#fff'}}>-</h2>
                <ul className="menu4">
                    <li><NavLink to={URL.SUPPORT_QNA} className={({ isActive }) => (isActive ? "cur" : "")}>-</NavLink></li>
                </ul>
            </div>
        </div>
    );
}

export default EgovLeftNavSupport;